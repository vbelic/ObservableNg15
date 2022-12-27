import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

export enum EnumeratedTypes {
    TYPE1 = 0x01,
    TYPE2 = 0x02,
    TYPE3 = 0x03,
}

@Component({
  selector: 'app-constant',
  templateUrl: './constant.component.html',
  styleUrls: ['./constant.component.scss'],
  providers: [],
})
export class ConstantComponent implements OnInit, OnDestroy {
  EnumeratedTypes: typeof EnumeratedTypes = EnumeratedTypes;
  public selectedEnumeratedType: number = EnumeratedTypes.TYPE1;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() { 
  }
}
