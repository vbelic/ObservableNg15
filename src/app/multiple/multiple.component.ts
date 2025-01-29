import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Observable, of, switchMap } from 'rxjs';
import { Person } from '../switch-merge/person.model';

@Component({
    selector: 'app-multiple',
    templateUrl: './multiple.component.html',
    styleUrls: ['./multiple.component.scss'],
    providers: [],
    standalone: false
})
export class MultipleComponent implements OnInit, OnDestroy {
  obs$: Observable<any> = new Observable();
  private readonly url: string = "https://reqres.in/api/users"; //// https://reqres.in/api/users/2

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.obs$ = this.getData1('1').pipe(
        switchMap((data) => forkJoin({
          data1: of(data),
          data2: this.getData2('2'),
          data3: this.getData3('3'),
        }))
      );
  }

  mergeAgain() {
    this.obs$ = this.getData1('4').pipe(
        switchMap((data) => forkJoin({
          data1: of(data),
          data2: this.getData2('5'),
          data3: this.getData3('6'),
        }))
      );
  }

  ngOnDestroy() { 
  }

  filterPerson(personId: string): Observable<Person[]> {
    if (personId.length === 0)
      return of([]);
    return this.http.get<Person[]>(`${this.url}/${personId}`);
  }

  private getData1(id: string): Observable<Person[]> {
    return this.filterPerson(id);
  }
  
  private getData2(id: string): Observable<Person[]> {
    return this.filterPerson(id);
  }
  
  private getData3(id: string): Observable<Person[]> {
    return this.filterPerson(id);
  }
}