import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReserveComponent } from './reserve/reserve.component';
import { SharedModule } from '../../shared/shared.module';
import { ReservationsComponent } from './reservations/reservations.component';


@NgModule({
  declarations: [ReserveComponent, ReservationsComponent],
  imports: [
    CommonModule, SharedModule
  ]
})
export class EmployeeModule { }
