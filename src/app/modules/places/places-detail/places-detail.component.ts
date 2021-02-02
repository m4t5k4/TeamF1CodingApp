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

  constructor(private _tablesService: TablesService,private _locationsService: LocationsService,private _placesService: PlacesService, private router: Router) {
    this.getLocations();
    this.getTables();
   }

  locations: Location[];
  allTables: TableLocation[];
  zones = [];
  filteredTables : TableLocation[];
  filteredTables2 : TableLocation[];
  place: Place;

  placeForm = new FormGroup(
    {
      id: new FormControl(""),
      name: new FormControl("", Validators.required),
      table: new FormControl("", Validators.required),
      selectedLocation: new FormControl("", Validators.required),
      selectedZone: new FormControl("",Validators.required)
    }
  )

  submitted: boolean = false;

  savePlace() {
    let place = this._placesService.getPlace();
    let placeToUpdate = new Place(this.placeForm.get("id").value,
    this.placeForm.get("name").value,
    this.placeForm.get("table").value,
    this.place.active);
    
    this.submitted = true;
    console.log(placeToUpdate);

    if(place.name == "EmptyPlace"){
      this._placesService.addPlace(placeToUpdate).subscribe();
    }
    else{
      this._placesService.updatePlace(placeToUpdate).subscribe();
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
  getTables(): void{
    this._tablesService.getTables().subscribe(
      result => {
      this.allTables = result;
      }
    )
  }

  initfunc(): void{
    this._tablesService.getTables().subscribe(
      result => {
      this.allTables = result;
    })
    this._locationsService.getLocations().subscribe(
      result => {
      this.locations = result;
    })

    this.placeForm.get('selectedLocation').valueChanges.subscribe(location => {
      this.filteredTables = this.allTables.filter(table => table.location.name == location.name);
      this.zones = [... new Set(this.filteredTables.map(table => table.zone))];
/*       console.log(this.allTables)
      console.log(this.filteredTables)
      console.log(this.zones)
      console.log(typeof this.placeForm.get('selectedLocation').value) */
            
    });
    this.placeForm.get('selectedZone').valueChanges.subscribe(zone => {
      //console.log(zone);
      this.filteredTables2 = this.filteredTables.filter(table => table.zone == zone);
    });
  }


  ngOnInit(): void {
    this.getLocations();
    this.getTables();    
    if (this.placeForm.controls['name'].value=="EmptyPlace") {
      this.router.navigate(["/places"]);
    }
    this.place = this._placesService.getPlace();
    
    this._tablesService.getTables().subscribe(
      result => {
      this.allTables = result;
      this.filteredTables = this.allTables.filter(table => table.location.name == ((this.place).tableLocation).location.name);
      //console.log(this.filteredTables)
      this.zones = [... new Set(this.filteredTables.map(table => table.zone))];
      this.filteredTables2 = this.filteredTables.filter(table => table.zone == ((this.place).tableLocation).zone);
      //console.log(this.filteredTables2)
      }
    )

    if (this.place.name != "EmptyPlace") {
      //console.log(this.placeForm.get('selectedLocation').value.name)
      this.placeForm.setValue({id: (this.place).id,name:(this.place).name,table:(this.place).tableLocation,selectedLocation: ((this.place).tableLocation).location,selectedZone:((this.place).tableLocation).zone})
      
    }
    else{
      this.place = this._placesService.getPlace();
      this.placeForm.setValue({id: (this.place).id,name:"Nieuwe Plaats",table:(this.place).tableLocation,selectedLocation: ((this.place).tableLocation).location,selectedZone:((this.place).tableLocation).zone})
      //console.log(this.place)

    }
    //console.log("Test 1 : "+this.placeForm.controls['selectedLocation'].value.name);
    //console.log("Test 2 : "+this.placeForm.controls['id'].value);
    this.initfunc();
    
  }
}
