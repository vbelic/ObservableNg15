import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, Subject, Subscriber } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { LookupModel, Person } from '../models/lookup.model';

@Injectable()
export class DataStorageService {
    private destroyed$: Subject<boolean> = new Subject();
    private _lookups: LookupModel = new LookupModel();
    public onLookupsLoaded: Observable<LookupModel>;
    private readonly urlUsers: string = "https://reqres.in/api/users";
    private readonly urlUnknowns: string = "https://reqres.in/api/unknown";
    private areLookupsInitialized = false;
    public areLookupsLoaded = false;

    constructor(private http: HttpClient) {

		this.onLookupsLoaded = new Observable(s => {
            if (!this.areLookupsInitialized) {
                this.loadLookups(s);
            } else {
                const wait = () => {
                    if (this.areLookupsLoaded) {
                        s.next(this.lookups);
                        s.complete();
                    } else {
                        setTimeout(wait, 25);
                    }
                };
                wait();
            }

            return {
                unsubscribe() {
                   console.log('unsubscribed!');
                } 
            };
        });

        this.onLookupsLoaded
            .pipe(takeUntil(this.destroyed$))
            .subscribe(() => {
                alert(`ObservableNg15 lookups are loaded.`);
                console.log("ObservableNg15 lookups are loaded.");
            });
	}

    LookupsReload() {
        this.areLookupsInitialized = false;
        this.areLookupsLoaded = false;
        this.onLookupsLoaded.subscribe(undefined);
    }

	public loadLookups(s: Subscriber<LookupModel>) {
        if (this.areLookupsInitialized) {
            console.log("Lookups already loaded.");
            return;
        }

        this.areLookupsInitialized = true;

        const firstServiceLookup = this.getFirstServiceLookups(['users', 'unknowns']);
        const secondServiceLookup = this.getSecondServiceLookups(['unknowns']);

        return forkJoin(firstServiceLookup, secondServiceLookup)
            .pipe(take(1))
            .subscribe((lookups: any) => {
                this.lookups.users = lookups[0].data.map((d: Person) => { d.name = `${d.first_name} ${d.last_name}`; return d;}); //// lookups[0]['users'];
                this.lookups.unknowns = lookups[1].data; //// lookups[0]['unknowns'];

                this.areLookupsLoaded = true;

                s.next(this._lookups);
                s.complete();
            });
    }

	public get lookups(): LookupModel {
        return this._lookups;
    }

    getFirstServiceLookups(filter: Array<string>): Observable<Array<any>> {
        alert(`call ${this.urlUsers} service`);
		return this.http.get<Array<any>>(`${this.urlUsers}?filter=${filter.join('&filter=')}`, { headers: {} });
	}

    getSecondServiceLookups(filter: Array<string>): Observable<Array<any>> {
        alert(`call ${this.urlUnknowns} service`);
		return this.http.get<Array<any>>(`${this.urlUnknowns}?filter=${filter.join('&filter=')}`, { headers: {} });
	}
}
