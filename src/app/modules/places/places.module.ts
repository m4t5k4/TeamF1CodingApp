import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlacesComponent } from './places/places.component';
import { PlacesDetailComponent } from './places-detail/places-detail.component';



@NgModule({
  declarations: [PlacesComponent, PlacesDetailComponent],
  imports: [
    CommonModule
  ]
})
export class PlacesModule { }
