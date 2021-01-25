import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablesComponent } from './tables/tables.component';
import { TablesService } from './tables.service';
import { TablesDetailComponent } from './tables-detail/tables-detail.component';


@NgModule({
  declarations: [
    TablesComponent,
    TablesDetailComponent
  ],
  imports: [
    CommonModule
  ],
  providers : [
    TablesService
  ],
  exports: [
    TablesComponent
  ]
})
export class TablesModule { }
