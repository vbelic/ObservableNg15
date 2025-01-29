import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, of, Subscription } from 'rxjs';
import { ModelObserverModel } from './model-observer.model';

@Component({
    selector: 'app-model-observer',
    templateUrl: './model-observer.component.html',
    styleUrls: ['./model-observer.component.scss'],
    providers: [],
    standalone: false
})
export class ModelObserverComponent implements OnInit, OnDestroy {
  public model: Array<ModelObserverModel> = new Array<ModelObserverModel>();
  //// private modelSubscriber: Subscription;
  private data: BehaviorSubject<ModelObserverModel[]> = new BehaviorSubject(this.model);

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  private modelObservable = of(this.model);
  private modelObserver = {
      next: (x: any) => {
          // Observer got a next value
          if (x) {
              x.hashCode = `${this.GetHashCode(x)}`;
          }
          this.MapHashCode();
      },
      error: (err: any) => {
           console.error('Observer got an error: ' + err)
      },
      complete: () => {
          // Observer got a complete notification
      },
  };

  private InitControls() { 
    this.model = new ModelObserverModel()
                     .mock()
                     .map(x => {
                      x.hashCode = this.GetHashCode(x);
                      this.MapHashCode();
                      return x;
                     });
  }

  ngOnInit() {
     this.InitControls();

     // check for duplicate items
     this.modelObservable.subscribe(this.modelObserver);
  }

  ngOnDestroy() {
    //// this.pricingModelSubscriber.unsubscribe();
  }

  public OnValueChanged = (item: ModelObserverModel) => {
    this.modelObserver.next(item);
  }

  onIsMandatoryValueChanged(event: any, item: ModelObserverModel){
    item.isMandatory = event.value === true ? true : false; 
    this.modelObserver.next(item);
  }

  /**
      Returns numerical representation of string
  * @param input Source string
  */
  private getStringHashCode(input: string): number {
        let hash = 0;
        let chr = 0;
        if (input.length === 0) return hash;
        for (let i = 0; i < input.length; i++) {
            chr = input.charCodeAt(i);
            // tslint:disable-next-line:no-bitwise
            hash = ((hash << 5) - hash) + chr;
            // tslint:disable-next-line:no-bitwise
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
  }

  private GetHashCode = (item: ModelObserverModel): string => {
        const hashCode = item instanceof ModelObserverModel ? 
            this.getStringHashCode(`${item.id}${item.name}${item.isMandatory}`).toString() : '';

        return hashCode;
  }

  private MapHashCode = () => {
        if (this.model.length > 0) {
            // const result = Array.from(this.model.items.reduce((m, t) => m.set(t.hashCode, t), new Map()).values());
            Array.from(this.model.reduce((m, t) => {
                if (this.model.filter(c => c.hashCode === t.hashCode).length > 1) {
                    t.isDuplicate = true; // found duplicate
                } else {
                    t.isDuplicate = false; // non duplicate
                }
                return m;
            }, new Map()).values());
        }
  }
}