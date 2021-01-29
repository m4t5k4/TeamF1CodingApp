import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablesComponent } from './tables/tables.component';
import { TablesService } from './tables.service';
import { ReactiveFormsModule} from '@angular/forms'
import { TablesDetailComponent } from './tables-detail/tables-detail.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TablesComponent,
    TablesDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    MatFormFieldModule,
    MatButtonModule,
    SharedModule
  ],
  providers : [
    TablesService
  ],
  exports: [
    TablesComponent
  ]
})
export class TablesModule { }
