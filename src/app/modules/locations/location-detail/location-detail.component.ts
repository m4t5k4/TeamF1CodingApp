import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Location } from '../../../shared/models/location.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LocationsService } from '../locations.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.scss']
})

export class LocationDetailComponent implements OnInit {
  constructor(private _locationService: LocationsService, private router: Router) {

  }

  locationForm = new FormGroup(
    {
      name: new FormControl(this._locationService.getLocation().name, Validators.required),
      address: new FormControl(this._locationService.getLocation().address, Validators.required),
      description: new FormControl(this._locationService.getLocation().description, Validators.required),
      id: new FormControl(this._locationService.getLocation().id)
    }
  )

  ngOnInit(): void {
  }

  submitted: boolean = false;

  onSubmit() {
    this.submitted = true;
    console.log(this.locationForm.value);
    this._locationService.putLocation(this._locationService.getLocation().id, this.locationForm.value).subscribe();
    this.router.navigate(["/location"]);
  }

  btnReturn() {
    this.router.navigate(["/location"]);
  }
}
