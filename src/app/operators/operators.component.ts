import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { from, fromEvent, interval, Observable, Subject, Subscription, timer } from 'rxjs';
import { debounceTime, delay, filter, first, groupBy, last, map, mergeMap, reduce, take, takeUntil, takeWhile, tap, toArray } from 'rxjs/operators';

@Component({
    selector: 'app-operators',
    templateUrl: './operators.component.html',
    styleUrls: ['./operators.component.css'],
    standalone: false
})
export class OperatorsComponent implements OnInit, OnDestroy {

  @ViewChild(MatRipple)
  ripple!: MatRipple;

  serachInput: string = "";
  radius: number = 40;

  mergeMapSubscription: Subscription = new Subscription();

  constructor() { }

  private logToContainer (message: string) {
    const container = document.getElementById('consolelog');
    const messageElement = document.createElement('pre');
    messageElement.innerHTML = message;
    container?.appendChild(messageElement);
  }

  clearContainer = () => {
    const el = document.getElementById('consolelog');
    while (el?.firstChild) el.removeChild(el.firstChild);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.mergeMapSubscription) {
      this.mergeMapSubscription.unsubscribe();
    }
  }

  mapClick() {
    this.clearContainer();

    from([1, 2, 3, 4, 5, 6, 7])
      .pipe(
        map(i => i * 10),
        map(i => "Number: " + i),
        //could place infinite maps
        delay(1000)
      )
      .subscribe((i) => /* console.log(i) */ this.logToContainer(i))

    fromEvent(document, 'click')
      .pipe(
        // map((e: MouseEvent)=>{
        //   console.log(e);
        // })
      )
      .subscribe((pos) => /* console.log(pos) */ this.logToContainer(JSON.stringify(pos)));
  }

  //Filter the information that being generated
  filterClick() {
    this.clearContainer();

    from([1, 2, 3, 4, 5, 6, 7])
      .pipe(
        filter(i => i % 2 == 1)
      )
      .subscribe((pos) => /* console.log(pos) */ this.logToContainer(JSON.stringify(pos)));

    interval(1000)
      .pipe(take(31)) //// <- call subscriber till value is less than 31
      .pipe(
        filter(i => i % 2 == 0),
        map(i => 'value: ' + i),
        delay(2000)
      ).subscribe((pos) => /* console.log(pos) */ this.logToContainer(pos));
  }

  //get the infos between the data, not to modify.
  tapClick() {
    this.clearContainer();

    interval(1000)
      .pipe(take(19)) //// <- calls subscriber only if value is less than 19
      .pipe(
        tap(i => /* console.log(i) */ this.logToContainer(JSON.stringify(i))),
        filter(i => i % 2 == 0),
        map(i => 'value: ' + i),
        delay(2000)
      ).subscribe((pos) => /* console.log(pos) */ this.logToContainer(pos));
  }

  mergeMapClick() {
    this.clearContainer();

    const groupedPayments$ = from([
      { empDept: 'Engineering', empLoc: 'Pune', empName: 'John' },
      { empDept: 'Engineering', empLoc: 'Mumbai', empName: 'Harry' },
      { empDept: 'HR', empLoc: 'Pune', empName: 'Denis' },
      { empDept: 'Finance', empLoc: 'Mumbai', empName: 'Elvis' }
    ]).pipe(
      groupBy(person => person.empDept),
      mergeMap(group => group
        .pipe(
          reduce((acc, cur) => {
              (acc.values as any).push(cur);
              return acc;
            },
            { key: group.key, values: [] }
          )
        )
      ),
      toArray()
    );
    this.mergeMapSubscription = groupedPayments$.subscribe(a => /* console.log */ this.logToContainer(JSON.stringify(a)));
  }

  //get exact amount of elements, after getting what was defined it closes the subscription, the others usually leave it open ex: filter
  takeClick() {
    this.clearContainer();

    const observable = new Observable((observer) => {
      let i;
      for (i = 0; i < 20; i++) {
        setTimeout(() => {
          observer.next(Math.floor(Math.random() * 100));
        }, i * 100);

      }
      setTimeout(() => {
        observer.complete()
      }, i * 100);
    });
    const s: Subscription = observable
    .pipe(
      tap(i=> /* console.log(i) */ this.logToContainer(JSON.stringify(i))),
      //get the amount of elements that was defined
      //take(10)
      //take the first element
      //first()
      //passes through all and returns the last element (needs complete otherwise it's looped)
      last()
    )
    .subscribe(v=> /* console.log('output',v) */ this.logToContainer('output ' + JSON.stringify(v)),
    (error)=> /* console.error(error) */ this.logToContainer(JSON.stringify(error)),
    ()=> /* console.log('Complete') */ this.logToContainer('Complete')   );
    const inter = setInterval(()=>{
      //// console.log('Checking...');
      this.logToContainer('Checking...');
      if(s.closed){
        //// console.warn('subsciption close');
        this.logToContainer('subscription close');
        clearInterval(inter);
      }
    },200)
  }

  debonceTimeClick() {
    this.clearContainer();

    fromEvent(document,'click')
    .pipe(
      tap((e)=> /* console.log('click') */  this.logToContainer('click')),
      debounceTime(1000)
    )
    .subscribe(
      (e)=>{
        //// console.log(e)
        this.logToContainer(JSON.stringify(e));
        this.lauchRipple();
      }
    )
  }

  lauchRipple() {
    this.clearContainer();

    const rippleRef = this.ripple.launch({
      persistent:true,
      centered:true
    });
    rippleRef.fadeOut;
  }
  
  //capture what the guy wrote and drop it in subject
  serachEntry$: Subject<string> = new Subject<string>();
  search(event: any){
    this.serachEntry$.next(this.serachInput);
  }
  
  debonceTimeSearchClick() {
    this.clearContainer();

    this.serachEntry$
    .pipe(
      debounceTime(1000)
    )
    .subscribe((s)=> /* console.log(s) */ this.logToContainer(JSON.stringify(s)))
  }

  //captures the value and we define how many we want it to take when it hits it closes the subscribe
  takeWhileClick() {
    this.clearContainer();

    interval(500)
    .pipe(
      takeWhile((value,index)=>(value<=5))
    )
    .subscribe(
      (i)=> /* console.log('take: ',i) */ this.logToContainer('take ' + JSON.stringify(i)),
      (error)=> /* console.error(error) */  this.logToContainer(JSON.stringify(error)),
      ()=> /* console.log("complete") */  this.logToContainer('complete')
    )
  }

  //it needs an observable "dueTime$" and when the observable finishes the takeUntil finishes too
  //same logic as TakeWhile but here it is observable.
  takeUntilClick(){
    this.clearContainer();

    let dueTime$ = timer(5000);
    interval(500)
    .pipe(
      takeUntil((dueTime$))
    )
    .subscribe(
      (i)=> /* console.log('takeUntil: ',i) */ this.logToContainer('takeUntil ' + JSON.stringify(i)),
      (error)=> /* console.error(error) */  this.logToContainer(JSON.stringify(error)),
      ()=> /* console.log("complete") */  this.logToContainer(JSON.stringify('complete'))
    )
  }
}
