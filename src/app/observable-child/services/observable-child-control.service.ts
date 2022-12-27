import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ObservableChildControlService {
  componenta$ = new BehaviorSubject<boolean>(false);
  componentb$ = new BehaviorSubject<boolean>(false);
  componentc$ = new BehaviorSubject<boolean>(false);

  openComponentA() {
    this.componenta$.next(true);
  }

  closeComponentA() {
    this.componenta$.next(false);
  }

  openComponentB() {
    this.componentb$.next(true);
  }

  closeComponentB() {
    this.componentb$.next(false);
  }

  openComponentC() {
    this.componentc$.next(true);
  }

  closeComponentC() {
    this.componentc$.next(false);
  }
}