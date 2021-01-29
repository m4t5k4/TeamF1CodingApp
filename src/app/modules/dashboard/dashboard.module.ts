import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardService } from './dashboard.service';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule
  ],
  exports:[DashboardComponent],
  providers:[DashboardService]
})
export class DashboardModule { }
