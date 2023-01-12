import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatDividerModule} from '@angular/material/divider';
import {MatRippleModule} from '@angular/material/core';
import {MatTreeModule} from '@angular/material/tree';

import { ConfirmationService, MessageService } from 'primeng/api';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { AccordionModule } from 'primeng/accordion';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';

import { FlexLayoutModule } from '@angular/flex-layout';

import { BasicCreationComponent } from './basic-creation/basic-creation.component';
import { OperatorsComponent } from './operators/operators.component';
import { AsyncComponent } from './async/async.component';
import { ErrorHandlingComponent } from './error-handling/error-handling.component';
import { DragAndDropComponent } from './drag-and-drop/drag-and-drop.component';
import { ViewChildComponent } from './view-child/view-child.component';
import { UnsubscribeComponent } from './unsubscribe/unsubscribe.component';
import { SwitchMergeComponent } from './switch-merge/switch-merge.component';

import { HttpClientModule } from '@angular/common/http';
import { ObservableChildComponent } from './observable-child/observable-child.component';
import { ComponentAComponent } from './observable-child/component-a/component-a.component';
import { ComponentBComponent } from './observable-child/component-b/component-b.component';
import { ComponentCComponent } from './observable-child/component-c/component-c.component';
import { ObservableChildControlService } from './observable-child/services/observable-child-control.service';
import { CanDeactivateGuard } from './deactivate-route/services/can-component-deactivate.service';
import { DeactivateRouteComponent } from './deactivate-route/deactivate-route.component';
import { DeactivateShowComponent } from './deactivate-route/deactivate-show.component';
import { ModelObserverComponent } from './model-observer/model-observer.component';
import { ConstantComponent } from './constant/constant.component';
import { SubjectComponent } from './subject/subject.component';
import { MultipleComponent } from './multiple/multiple.component';
import { LookupCacheComponent } from './lookup-cache/lookup-cache.component';
import { DataStorageService } from './lookup-cache/services/data-storage.service';
import { StyleObserverComponent } from './style-observer/style-observer.component';

@NgModule({
  declarations: [
    AppComponent,
    AsyncComponent,
    BasicCreationComponent,
    OperatorsComponent,
    AsyncComponent,
    ErrorHandlingComponent,
    DragAndDropComponent,
    ViewChildComponent,
    UnsubscribeComponent,
    SwitchMergeComponent,
    ObservableChildComponent,
    ComponentAComponent,
    ComponentBComponent,
    ComponentCComponent,
    DeactivateRouteComponent,
    DeactivateShowComponent,
    ModelObserverComponent,
    ConstantComponent,
    SubjectComponent,
    MultipleComponent,
    LookupCacheComponent,
    StyleObserverComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,

    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,

    AccordionModule,
    RadioButtonModule,
    InputNumberModule,
    CheckboxModule,
    ProgressSpinnerModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    TableModule,

    FlexLayoutModule,

    HttpClientModule 
  ],
  providers: [
    HttpClientModule,
    ConfirmationService,
    MessageService,
    ObservableChildControlService,
    CanDeactivateGuard,
    DataStorageService,
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
