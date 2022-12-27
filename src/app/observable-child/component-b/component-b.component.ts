import { Component, OnDestroy, OnInit } from '@angular/core';
import { ObservableChildControlService } from '../services/observable-child-control.service';

@Component({
  selector: 'app-component-b',
  templateUrl: './component-b.component.html',
  styleUrls: ['./component-b.component.scss'],
  providers: [ObservableChildControlService],
})
export class ComponentBComponent implements OnInit, OnDestroy {
  ngOnInit() { alert('OnInit Komponenta B'); }
  ngOnDestroy() { alert('OnDestroy Komponenta B'); }
}