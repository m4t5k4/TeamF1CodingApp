import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '../../../shared/models/location.model';
import { LocationsService } from '../locations.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss']
})
export class LocationFormComponent implements OnInit {

  locationForm = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    }
  )

  constructor(private fb: FormBuilder, private _locationService: LocationsService, private router : Router) { }

  ngOnInit(): void {
    this.locationForm.valueChanges.subscribe(val => {
      console.log(val);
    })
  }

  submitted: boolean = false;

  onSubmit() {
    console.log(this.locationForm.value);
    this.submitted = true;
    this._locationService.addLocation(this.locationForm.value).subscribe();
    setTimeout(()=>{                          
      this.router.navigate(["/locations"]);
    }, 1000); 
  }

  btnReturn()
  {
    this.router.navigate(["/locations"]);
  }
}
