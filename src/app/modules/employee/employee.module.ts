import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReserveComponent } from './reserve/reserve.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [ReserveComponent],
  imports: [
    CommonModule, SharedModule
  ]
})
export class EmployeeModule { }
