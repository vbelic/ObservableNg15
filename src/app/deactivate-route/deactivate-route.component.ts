import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-deactivate-route',
  templateUrl: './deactivate-route.component.html',
  styleUrls: ['./deactivate-route.component.scss'],
  providers: [],
})
export class DeactivateRouteComponent implements OnInit, OnDestroy {
  isModelValid: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  public OnCloseOkAndRedirect() {
    this.isModelValid = true;
    this.router.navigate(['/']);
    //// this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    //// window.location.reload();
  }

  public OnCloseAndAskForRedirect() {
    this.isModelValid = false;
    this.router.navigate(['/']);
    //// this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    //// window.location.reload();
  }

  ngOnInit() {
  }

  ngOnDestroy() { 
  }

  public canDeactivate(): Promise<boolean> {
    //// za primjer je postavljen Promise<boolean> - no moze se koristiti i Observable<boolean> ili <boolean>
    return new Promise((resolve, reject) => {
        if (this.isModelValid) {
          alert('We\'re allowed to change route!');
          resolve(true);
          //// obzirom da root ima material switch, a kako se ne bi prikazivala deactivate route-a - postavljen je refresh
          //// ovo je samo POC deactivate route-a - setTimeout se NE KORISTI u developmentu
          setTimeout(function(){
            window.location.reload();
          }, 600);
        } else {
          alert('We\'re NOT allowed to change route!');
          resolve(false);
        }
    });
  }
}
