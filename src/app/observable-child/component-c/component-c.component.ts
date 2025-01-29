import { Component, OnDestroy, OnInit } from '@angular/core';
import { ObservableChildControlService } from '../services/observable-child-control.service';

@Component({
    selector: 'app-component-c',
    templateUrl: './component-c.component.html',
    styleUrls: ['./component-c.component.scss'],
    providers: [ObservableChildControlService],
    standalone: false
})
export class ComponentCComponent implements OnInit, OnDestroy {
  ngOnInit() { alert('OnInit Komponenta C'); }
  ngOnDestroy() { alert('OnDestroy Komponenta C'); }
}