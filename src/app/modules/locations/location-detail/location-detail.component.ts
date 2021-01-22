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
      id: new FormControl(this._locationService.getLocation().id),
      name: new FormControl(this._locationService.getLocation().name, Validators.required),
      address: new FormControl(this._locationService.getLocation().address, Validators.required),
      description: new FormControl(this._locationService.getLocation().description, Validators.required)
    }
  )

  ngOnInit(): void {
  }

  submitted: boolean = false;

  onSubmit() {
    let locationToUpdate = new Location(this.locationForm.get("id").value,this.locationForm.get("name").value, this.locationForm.get("address").value, this.locationForm.get("description").value);
    
    this.submitted = true;
    console.log(locationToUpdate);
    this._locationService.putLocation(locationToUpdate).subscribe();
    setTimeout(()=>{                          
      this.router.navigate(["/location"]);
    }, 1000); 
  }

  btnReturn() {
    this.router.navigate(["/location"]);
  }
}
