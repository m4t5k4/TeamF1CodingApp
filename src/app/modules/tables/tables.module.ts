import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablesComponent } from './tables/tables.component';
import { TablesService } from './tables.service';
import { ReactiveFormsModule} from '@angular/forms'
import { TablesDetailComponent } from './tables-detail/tables-detail.component';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    TablesComponent,
    TablesDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DataTablesModule
  ],
  providers : [
    TablesService
  ],
  exports: [
    TablesComponent
  ]
})
export class TablesModule { }
