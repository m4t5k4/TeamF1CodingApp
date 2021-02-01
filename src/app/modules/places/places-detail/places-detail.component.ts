import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { TableLocation } from 'src/app/shared/models/table-location.model';
import { Location } from 'src/app/shared/models/location.model';
import { TablesService } from '../../tables/tables.service';
import { PlacesService } from '../places.service';
import { LocationsService } from '../../locations/locations.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { observable } from 'rxjs';
import { Place } from 'src/app/shared/models/place.model';

@Component({
  selector: 'app-places-detail',
  templateUrl: './places-detail.component.html',
  styleUrls: ['./places-detail.component.scss']
})
export class PlacesDetailComponent implements OnInit {

  constructor(private _tablesService: TablesService,private _locationsService: LocationsService,private _placesService: PlacesService, private router: Router) { }

  locations: Location[];
  allLocations: Location[];
  allTables: TableLocation[];
  zones = [];

  placeForm = new FormGroup(
    {
      id: new FormControl(this._placesService.getPlace().id),
      name: new FormControl(this._placesService.getPlace().name, Validators.required),
      table: new FormControl(this._placesService.getPlace().tableLocation, Validators.required),
      selectedLocation: new FormControl(this._placesService.getPlace().tableLocation.location, Validators.required),
      selectedZone: new FormControl("",Validators.required)
    }
  )

  submitted: boolean = false;

  saveTable() {
    let Table = this._tablesService.getTable();
    let TableToUpdate = new TableLocation(this.placeForm.get("id").value,
    this.placeForm.get("name").value,
    this.placeForm.get("table").value,
    this.placeForm.get("locationSelect").value);
    
    this.submitted = true;
    console.log(TableToUpdate);

    if(Table.name == "EmptyTable"){
      this._tablesService.addTable(TableToUpdate).subscribe();
    }
    else{
      this._tablesService.updateTable(TableToUpdate).subscribe();
    }

    setTimeout(()=>{                          
      this.router.navigate(["/places"]);
    }, 1000); 
  }

  btnReturn() {
    this.router.navigate(["/places"]);
  }


  getLocations(): void{
    this._locationsService.getLocations().subscribe(
      result => {
      this.locations = result;
      }
    )
  }


  ngOnInit(): void {
    let place = this._placesService.getPlace();
    console.log("Test 1 : "+this.placeForm.controls['selectedLocation'].value.name);
    console.log("Test 2 : "+this.placeForm.controls['table'].value.name);
    this.getLocations();
    this._locationsService.getLocations().subscribe(
      result => {
      this.locations = result;
      this._tablesService.getTables().subscribe(
        result => {
        this.allTables = result;
  
        this.placeForm.get('selectedLocation').valueChanges.subscribe(location => {
          console.log(location);
          this.allTables = this.allTables.filter(table => table.location.name == location.name);
          this.zones = [... new Set(this.allTables.map(table => table.zone))];
          console.log(this.allTables);
        });
      }
      )
      }
    )



  }
}
