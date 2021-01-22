import { Component, OnInit } from '@angular/core';
import { LocationsService } from '../locations.service';
import { Location } from '../../../shared/models/location.model'
import { Router } from '@angular/router';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})

export class LocationsComponent implements OnInit {
  locations: Location[];
  constructor(private _locationService: LocationsService, private router: Router) {
    this._locationService.getLocations().subscribe(
      result => {
        this.locations = result;
      }
    )

  }

  updateLocation(number: number, location: Location) {
    this._locationService.putLocation(number, location).subscribe;
  }

  deleteLocation(locationId: number, naam : string) {
    if (confirm("Wil je deze locatie: " + naam +" verwijderen?" )) {
      this._locationService.deleteLocation(locationId).subscribe();
      window.location.reload();
    }
  }

  selectedLocation: Location = null;

  showDetailLocation(l: Location) {
    //this.selectedLocation = l;
    this._locationService.setLocation(l);
    this.router.navigate(['/location/edit']);
  }

  ngOnInit(): void {
  }

  btnClickNew(): void {
    console.log('trigger');
    this.router.navigate(['/location/add']);
  };

}
