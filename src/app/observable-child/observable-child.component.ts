import { Component } from '@angular/core';
import { ObservableChildControlService } from './services/observable-child-control.service';

@Component({
    selector: 'app-observable-child',
    templateUrl: './observable-child.component.html',
    styleUrls: ['./observable-child.component.scss'],
    providers: [ObservableChildControlService],
    standalone: false
})
export class ObservableChildComponent {
  componenta$ = this.childControlService.componenta$;
  componentb$ = this.childControlService.componentb$;
  componentc$ = this.childControlService.componentc$;

  constructor(private childControlService: ObservableChildControlService) { }
  
  onTabClose(event: any) {
    switch (event.index) {
      case 0:
        this.childControlService.closeComponentA();
        break;
      case 1:
        this.childControlService.closeComponentB();
        break;
      case 2:
        this.childControlService.closeComponentC();
        break;
      default:
        break;
    }
  }
  
  onTabOpen(event: any) {

      switch (event.index) {
        case 0:
          this.childControlService.openComponentA();
          break;
        case 1:
          this.childControlService.openComponentB();
          break;
        case 2:
          this.childControlService.openComponentC();
          break;
        default:
          break;
      }
  }
}
