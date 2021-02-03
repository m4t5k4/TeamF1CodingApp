import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlacesComponent } from './places/places.component';
import { PlacesDetailComponent } from './places-detail/places-detail.component';
import { PlacesService } from './places.service';
import { ReactiveFormsModule} from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [PlacesComponent, PlacesDetailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    MatFormFieldModule,
    MatButtonModule,
    SharedModule
  ],
  providers : [
    PlacesService
  ],
  exports: [
    PlacesComponent
  ]
})
export class PlacesModule { }
