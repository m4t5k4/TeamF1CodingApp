import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationTimesheetComponent } from './reservation-timesheet.component';

describe('ReservationTimesheetComponent', () => {
  let component: ReservationTimesheetComponent;
  let fixture: ComponentFixture<ReservationTimesheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationTimesheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationTimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
