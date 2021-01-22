import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Location} from '../../../shared/models/location.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LocationsService } from '../locations.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.scss']
})

export class LocationDetailComponent implements OnInit {
  @Input() location: Location;
  locationForm = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    }
  )

  constructor(private _locationService: LocationsService, private router : Router) { }

  ngOnInit(): void {
  }

  submitted: boolean = false;

  onSubmit() {
    console.log(this.locationForm.value);
    this.submitted = true;
    this._locationService.addLocation(this.locationForm.value).subscribe();
    this.router.navigate(["/location"]);
  }

}
