import { Component, OnInit } from '@angular/core';
import { from, fromEvent, interval, Observable, observable, Observer, of, Subscription, timer } from 'rxjs';

@Component({
    selector: 'app-basic-creation',
    templateUrl: './basic-creation.component.html',
    styleUrls: ['./basic-creation.component.css'],
    standalone: false
})
export class BasicCreationComponent implements OnInit {

  subscription: Subscription = new Subscription();

  constructor() { }

  private logToContainer (message: string) {
    const container = document.getElementById('consolelog');
    const messageElement = document.createElement('pre');
    messageElement.innerHTML = message;
    container?.appendChild(messageElement);
  }

  clearContainer = () => {
    const el = document.getElementById('consolelog');
    while (el?.firstChild) {
      el.removeChild(el.firstChild);
    }
  }

  ngOnInit(): void {
    //// console.log('oi');
    this.logToContainer('OnInit()');
  }

  observableCreate() {
    this.clearContainer();

    const hello: Observable<string> = new Observable((observer: Observer<string>) => {
      observer.next('hello');
      observer.next('From');
      observer.next('Observer');
      observer.complete();
    });
  
    this.subscription.add(hello.subscribe(val => /* console.log(val) */ this.logToContainer(JSON.stringify(val))));

  }

  fromClick() {
    this.clearContainer();

    const webApiResult = [1, 2, 3, 4, 5, { x: 10, y: 20 }];
    //Pass item by item giving next to each item
    from(webApiResult).subscribe((v) => console.log(v));
    //can be given subscribes both directly and subsequently
    const source = from([1, 2, 3, 4, 5, { x: 10, y: 20 }]);
    this.subscription.add(source.subscribe((v) => /* console.log(v) */ {
      return this.logToContainer(JSON.stringify(v));
    }));
  }

  ofClick() {
    this.clearContainer();

    //the next 1 time only on the whole object
    of([1, 2, 3, 4, 5, { x: 10, y: 20 }]).subscribe((v) => /* console.log(v) */ this.logToContainer(JSON.stringify(v)));
  }

  intervalClick() {
    this.clearContainer();

    const source = interval(1000);
    this.subscription.add(source.subscribe((v) => {
      //// console.log(v)
      this.logToContainer('interval: ' + JSON.stringify(v))
    }))
  }

  timmerClick() {
    this.clearContainer();

    //waits 3 seconds and calls every 1 second thereafter
    const source = timer(3000, 1000);
    this.subscription.add(source.subscribe((v) => {
      //// console.log(v)
      this.logToContainer('timer: ' + JSON.stringify(v))
    }))
  }

  fromEventClick() {
    this.clearContainer();

    const subscriptio = fromEvent(document,'click').subscribe((e)=> /* console.log(e) */ this.logToContainer(JSON.stringify(e)));
    this.subscription.add(subscriptio);

  }

  uncubsClick() {
    this.clearContainer();

    this.subscription.unsubscribe();
    this.subscription = new Subscription();
  }  
}
