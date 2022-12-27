import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-deactivate-show',
  templateUrl: './deactivate-show.component.html',
})
export class DeactivateShowComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.router.navigate(['/deactivate']);
  }

  ngOnDestroy() { 
  }
}
