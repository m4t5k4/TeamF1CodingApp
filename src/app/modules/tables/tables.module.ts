import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablesComponent } from './tables/tables.component';
import { TablesService } from './tables.service';


@NgModule({
  declarations: [
    TablesComponent
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
