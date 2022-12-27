import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DeactivateRouteComponent } from './deactivate-route/deactivate-route.component';
import { CanDeactivateGuard } from './deactivate-route/services/can-component-deactivate.service';

//// const routes: Routes = [];
const routes: Routes = [
  {
      path: '',
      children: [
          {
              path: 'deactivate',
              component: DeactivateRouteComponent,
              canDeactivate: [CanDeactivateGuard]
          },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
