import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LookupModel, Person } from './models/lookup.model';
import { DataStorageService } from './services/data-storage.service';

@Component({
  selector: 'app-lookup-cache',
  templateUrl: './lookup-cache.component.html',
  styleUrls: ['./lookup-cache.component.scss'],
  providers: [],
})

export class LookupCacheComponent implements OnInit, OnDestroy {
  lookups: LookupModel = new LookupModel();
  public users$: Observable<any> = new Observable<any>();
  selectedUser: Person = new Person();
  constructor(public dataStorageService: DataStorageService) {
    this.lookups = this.dataStorageService.lookups;
  }

  logToContainer (message: string) {
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

  ngOnInit() {
    this.users$ = this.dataStorageService.getFirstServiceLookups(['users']);
  }

  ngOnDestroy() { 
  }
}