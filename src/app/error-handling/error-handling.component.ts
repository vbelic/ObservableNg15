import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription, throwError, timer } from 'rxjs';
import { catchError, map, retry, retryWhen, tap, timeout } from 'rxjs/operators';

@Component({
    selector: 'app-error-handling',
    templateUrl: './error-handling.component.html',
    styleUrls: ['./error-handling.component.css'],
    standalone: false
})
export class ErrorHandlingComponent implements OnInit, OnDestroy {

  private objSubscription: Subscription = new Subscription();

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
    if (this.objSubscription) {
      this.objSubscription.unsubscribe();
    }
  }

  startTest() {
    this.clearContainer();

    let obj: Observable<any> = new Observable((observer)=>{
     for (let i = 0; i < 10; i++) {
       if (i===7){
         observer.error("Error occurred at position: "+i);
       } else {
         observer.next(i);
      }
     } 
    });

    this.objSubscription = obj
    .pipe(
      map(i=>i*10),
      tap(i=> /* console.log("before: "+i) */ 
         this.logToContainer("before: "+i)
         ),
      catchError(error=>{
         //// console.error('inside catch error: '+error);
         this.logToContainer('inside catch error: '+error);

         //return another value instead of the error in if, goes from complete
         //return of(0)
         //returns an error not complete
         return throwError('throwError: ');
      }),
      //how many times do you want to try to do this process, if you tried all these times and even then it gave an error and it drops the error
      // retry(2),
      //when will it try to recurre, in this case after 5 seconds it tries to recurre this request
      retryWhen(i => timer(5000))
    ).subscribe();
  
    /**
    .subscribe(
      (i)=>console.log("normal: "+i),
      (err)=>console.error("Erro: "+err),
      ()=>console.log("complete")
    ); */
  
    let obj2: Observable<any> = new Observable((observer)=>{
      timer(2000).subscribe((n)=>observer.next(1000));
      timer(2000).subscribe((n)=>observer.complete());
    });
  
    obj2
    .pipe(
      timeout(2600)
    )
    .subscribe(
      (i)=> /* console.log("N: "+i) */ this.logToContainer("N: "+i),
      (err)=> /* console.error("Error: "+err) */ this.logToContainer("Error: "+err),
      ()=> /* console.log("complete") */  this.logToContainer("complete")
    );
  }
}
