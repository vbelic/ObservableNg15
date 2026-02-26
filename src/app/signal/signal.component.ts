import { ChangeDetectorRef, Component, computed, OnInit, signal, WritableSignal } from '@angular/core';
import { CartItem } from './cart-item.model';
import { BehaviorSubject, filter, map, Observable, take, tap } from 'rxjs';
@Component({
  selector: 'app-signal',
  standalone: false,
  templateUrl: './signal.component.html',
  styleUrl: './signal.component.scss'
})
export class SignalComponent implements OnInit {
  //// https://angular.dev/ecosystem/rxjs-interop
  //// https://dev.to/soumayaerradi/angular-signals-from-zero-to-hero-4j2d
  count: WritableSignal<number> = signal(0);
  firstName = signal('Soumaya');
  lastName = signal('Erradi');
  fullName = computed(() => `${this.firstName()} ${this.lastName()}`);
  getTotalPrice = computed(() =>
    this.items().reduce((total, item) => total + item.price, 0)
  );



  private items: WritableSignal<CartItem[]> = signal<CartItem[]>([]);


  private idleTimeRemainingBs: BehaviorSubject<number> = new BehaviorSubject<number>(5);
  public idleTimeRemaining$: Observable<string> = this.idleTimeRemainingBs.asObservable().pipe(
         filter((val) => !!val),
         map((time: number) => {
              if (time / 60 > 1) {
                   return `${Math.ceil(time / 60)} minutes`;
         }

         return `${time} seconds`;
         })
  );
  private idleTimeRemainingSignal = signal<number | null>(5);
  public idleTimeRemaining = computed(() => {
     const time = this.idleTimeRemainingSignal();

     if (time === null) {
      return '';
     }

     if (time / 60 > 1) {
      return `${Math.ceil(time / 60)} minutes`;
     }

      return `${time} seconds`;
  });

  constructor(private cd: ChangeDetectorRef) {
     this.items.set([...this.items(), new CartItem('plate', 11.2)]);
     this.items.set([...this.items(), new CartItem('table', 4.4)]);
     this.items.set([...this.items(), new CartItem('broom', 14.8)]);
  }

  ngOnInit() {
   
  }



  increment() {
    this.count.set(this.count() + 1);
  }

  addItem() {
    this.items.set([...this.items(), new CartItem('chair', 5.5)]);
    this.cd.markForCheck();
  }

  private logToContainer (message: string) {
    const container = document.getElementById('consolelog');
    const messageElement = document.createElement('pre');
    messageElement.innerHTML = message;
    container?.appendChild(messageElement);
  }

  functionFullName() { 
    this.logToContainer('functionFullName');
    return 'Pero' + ' ' + 'Perić'; 
  }
}
