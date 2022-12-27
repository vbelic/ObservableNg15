import { Component, OnInit } from '@angular/core';
import { fromEvent, interval, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.css']
})
export class UnsubscribeComponent implements OnInit {

  subscriptionsActive = false;
  subsciptions: Subscription[] = [];
  unsbsAll: Subject<any> = new Subject();
  intervalId: Subscription | undefined;

  constructor() { }

  ngOnInit(): void {
    this.checkSubs();
  }

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

  checkSubs(){
   this.intervalId = interval(100).subscribe((e)=>{
      let active = false;
      this.subsciptions.forEach((s)=>{
        if(!s.closed){
          active = true;
        }
      });
      this.subscriptionsActive = active;
    })
  }

  subscribe() {
    //// document?.getElementById('consolelog')?.innerHTML = "";
    this.clearContainer();

    const subs1 = interval(1000)
    .pipe(takeUntil(this.unsbsAll))
    .subscribe((i) => {
       //// console.log(i);
       this.logToContainer('i: ' + i.toString());
    });
    const subs2 = fromEvent(document, 'mousemove')
    .pipe(takeUntil(this.unsbsAll))
    .subscribe((e) => {
       //// console.log(e);
       this.logToContainer('e: ' + e.toString());
    });
    this.subsciptions.push(subs1);
    this.subsciptions.push(subs2);
  }

  unsubscribe() {
    this.unsbsAll.next(0);
  }

  ngOnDestroy(){
    //is called on page destroy when exits
    if(this.intervalId != null){
      this.intervalId.unsubscribe();
    }
    //closes all subscriptions on the page.
    this.unsbsAll.next(0);
  }
}
