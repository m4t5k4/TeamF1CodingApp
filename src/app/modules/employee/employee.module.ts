import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReserveComponent } from './reserve/reserve.component';
import { SharedModule } from '../../shared/shared.module';
import { ReservationsComponent } from './reservations/reservations.component';
import { ReservationsTableComponent } from './reservations/reservations-table/reservations-table.component';
import { ReservationTimesheetComponent } from './reservations/reservation-timesheet/reservation-timesheet.component';
import { ReservationDetailComponent } from './reservations/reservation-detail/reservation-detail.component';


@NgModule({
  declarations: [ReserveComponent, ReservationsComponent, ReservationsTableComponent, ReservationTimesheetComponent, ReservationDetailComponent],
  imports: [
    CommonModule, SharedModule, 
  ]
})
export class EmployeeModule { }
