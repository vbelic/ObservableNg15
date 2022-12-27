import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable, of } from 'rxjs';
import { debounceTime, map, mergeAll, mergeMap, switchAll, switchMap, take } from 'rxjs/operators';
import { Person } from './person.model';

@Component({
  selector: 'app-switch-merge',
  templateUrl: './switch-merge.component.html',
  styleUrls: ['./switch-merge.component.css']
})
export class SwitchMergeComponent implements OnInit {
  @ViewChild('serachby', { static: true }) el!: ElementRef;

  searchInput: string = "";
  peoople!: Observable<Person[]>;

  private readonly url: string = "https://reqres.in/api/users"; //// https://reqres.in/api/users/2

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
   // this.firstOption();
   //this.secondOption();
   this.thirdOption();
  }

  filterPeoople(searchInput: string): Observable<Person[]> {
    if (searchInput.length === 0)
      return of([]);
    return this.http.get<Person[]>(`${this.url}/${searchInput}`);
  }

 

  firstOption() {
    fromEvent(this.el.nativeElement, 'keyup')
      .subscribe(e => {
        this.filterPeoople(this.searchInput)
          .subscribe(r => {
            //// console.log(r)
            document.write(r.join());
            document.write('<br>');
          });
      });
  }

  secondOption(){
    let keyup = fromEvent(this.el.nativeElement, 'keyup');
    /*
    let fetch = keyup.pipe(map((e)=>this.filterPeoople(this.searchInput)));
    this.peoople = fetch.pipe(mergeAll());
     */
    this.peoople = keyup.pipe(mergeMap((e)=>this.filterPeoople(this.searchInput)));
  }

  thirdOption(){
    //If more than one comes in a row, switchAll cancels some(Best Shape)
    let keyup = fromEvent(this.el.nativeElement, 'keyup');
    //this.peoople = keyup.pipe(map((e)=>this.filterPeoople(this.searchInput))).pipe(switchAll());
    this.peoople = keyup.pipe(
      debounceTime(700), //700 milliseconds time between sending one request and another
      //// take(1), //// <- ukoliko postavimo operator event se poziva samo jednom!!!!!
      switchMap(()=>this.filterPeoople(this.searchInput)));
  }

}
