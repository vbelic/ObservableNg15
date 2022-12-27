import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservableChildComponent } from './observable-child.component';

describe('ObservableChilsComponent', () => {
  let component: ObservableChildComponent;
  let fixture: ComponentFixture<ObservableChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObservableChildComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObservableChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
