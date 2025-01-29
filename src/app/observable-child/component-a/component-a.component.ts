import { Component, OnDestroy, OnInit } from '@angular/core';
import { ObservableChildControlService } from '../services/observable-child-control.service';

@Component({
    selector: 'app-component-a',
    templateUrl: './component-a.component.html',
    styleUrls: ['./component-a.component.scss'],
    providers: [],
    standalone: false
})
export class ComponentAComponent implements OnInit, OnDestroy {
    ngOnInit() { alert('OnInit Komponenta A'); }
    ngOnDestroy() { alert('OnDestroy Komponenta A'); }
}