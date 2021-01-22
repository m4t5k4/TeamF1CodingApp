import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationsComponent } from './locations/locations.component';
import { LocationsService } from './locations.service';
import { LocationDetailComponent } from './location-detail/location-detail.component';
import { LocationFormComponent } from './location-form/location-form.component';
import { ReactiveFormsModule} from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [LocationsComponent, LocationDetailComponent, LocationFormComponent],
  imports: [ CommonModule, ReactiveFormsModule, MatFormFieldModule,MatButtonModule],
  exports:[LocationsComponent],
  providers:[LocationsService]
})
export class LocationsModule { }
