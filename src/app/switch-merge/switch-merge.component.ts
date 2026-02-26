import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { from, fromEvent, Observable, of, throwError } from 'rxjs';
import { debounceTime, finalize, map, mergeAll, mergeMap, switchAll, switchMap, take, tap } from 'rxjs/operators';
import { Person } from './person.model';

@Component({
    selector: 'app-switch-merge',
    templateUrl: './switch-merge.component.html',
    styleUrls: ['./switch-merge.component.css'],
    standalone: false
})
export class SwitchMergeComponent implements OnInit {
  @ViewChild('serachby', { static: true }) el!: ElementRef;

  searchInput= '';
  people$!: Observable<any>;

  private readonly url: string = "https://reqres.in/api/users"; //// https://reqres.in/api/users/2

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
   //// this.firstOption();
   //// this.secondOption();
   this.thirdOption();
  }

  getHTTPHeaders(): HttpHeaders {
    const result = new HttpHeaders()
         .set('Content-Type', 'application/json')
         .set('Accept', 'application/json')
         .set('Accept-Language', `${"hr"}`)
         .set('x-api-key', 'API_KEY');
  
    return result;
  }

  filterPeople(searchInput: string): Observable<any> {
    if (searchInput.length === 0) {
      return of([]);
    }

    const httpHeaders = this.getHTTPHeaders();
    return this.http.get<any>(`${this.url}/${searchInput}`, { headers: httpHeaders });
  }

  public getError(): Observable<any> {
    const error = new HttpErrorResponse({ status: 404 });
    return throwError(error) as any;
  }

 
  firstOption() {
    fromEvent(this.el.nativeElement, 'keyup')
      .subscribe(e => {

        this.filterPeople(this.searchInput)
          .pipe(take(1),
            tap({
              subscribe: () => null,
              unsubscribe: () => null,
              finalize: () => null
            }),
            finalize(() => {
            }))
          .subscribe({
            // This will run when data is received,
            next: (value: any) => {
                //// document.write(value.join());
                document.write('<br>');
            },
            complete: () => {
            },
            error: (error: any) => {    
            },
        });

        // this.filterPeople(this.searchInput)
        //   .subscribe(r => {
        //     //// console.log(r)
        //     document.write(r.join());
        //     document.write('<br>');
        //   });
      });
  }

  secondOption(){
    const keyup = fromEvent(this.el.nativeElement, 'keyup');
    /*
    let fetch = keyup.pipe(map((e)=>this.filterPeople(this.searchInput)));
    this.people$ = fetch.pipe(mergeAll());
     */
    this.people$ = keyup.pipe(mergeMap((e) => {return this.filterPeople(this.searchInput)}));
  }

  thirdOption() {
    //If more than one comes in a row, switchAll cancels some(Best Shape)
    const keyup = fromEvent(this.el.nativeElement, 'keyup');
    //this.people$ = keyup.pipe(map((e)=>this.filterPeople(this.searchInput))).pipe(switchAll());
    this.people$ = keyup.pipe(
      debounceTime(400), // 400 milliseconds time between sending one request and another
      //// take(1), //// <- ukoliko postavimo operator event se poziva samo jednom!!!!!
      switchMap(() => {return this.filterPeople(this.searchInput)}));
  }
}
