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
import { ScenarioService } from '../../scenario/scenario.service';
import { Scenario } from 'src/app/shared/models/scenario.model';

@Component({
  selector: 'app-places-detail',
  templateUrl: './places-detail.component.html',
  styleUrls: ['./places-detail.component.scss']
})
export class PlacesDetailComponent implements OnInit {

  
  constructor(private _tablesService: TablesService,private _scenariosService: ScenarioService,private _locationsService: LocationsService,private _placesService: PlacesService, private router: Router) {
    this.getTables();
    this.getLocations();
    this._scenariosService.getScenario().subscribe(
      result => {
      this.scenarios = result;
      }
    )
    this._placesService.getPlaces().subscribe(
      result => {
      this.places = result;
      }
    )
  }

  locations: Location[];
  allTables: TableLocation[];
  filteredTables : TableLocation[];
  filteredTables2 : TableLocation[];
  zones = [];
  place: Place;
  places: Place[];
  placeToUpdate: Place;
  scenarios: Scenario[];

  placeForm = new FormGroup(
    {
      id: new FormControl(""),
      name: new FormControl("", Validators.required && Validators.maxLength(20)),
      selectedTable: new FormControl("", Validators.required),
      selectedLocation: new FormControl("", Validators.required),
      selectedZone: new FormControl("",Validators.required)
    }
  )

  submitted: boolean = false;

  savePlace() {
    console.log(typeof this.placeForm.get("selectedTable").value)
    if((typeof this.placeForm.get("selectedTable").value)== "string"){
      
      this.place = this._placesService.getPlace();
      this.placeToUpdate = new Place(this.placeForm.get("id").value,
      this.placeForm.get("name").value,
      this.filteredTables2.filter(table => table.name == this.placeForm.get("selectedTable").value)[0],
      this.place.active);
    }
    else{
      this.place = this._placesService.getPlace();
      this.placeToUpdate = new Place(this.placeForm.get("id").value,
      this.placeForm.get("name").value,
      this.placeForm.get("selectedTable").value,
      this.place.active);
    }

    this.places = this.places.filter(place => place.tableLocation.id == this.placeForm.get("selectedTable").value.id)
    let length = this.places.length + 1;

    switch(this.scenarios[0].scenario){
      case "Groen": { 
        console.log("Groen")
        this.placeToUpdate.active = true;
        console.log(this.placeToUpdate.active) 
        break; 
      }
      case "Geel": { 
        console.log("Geel")
        if (length % 4 == 0) {
          this.placeToUpdate.active = false;
        } 
        else {
          this.placeToUpdate.active = true;
        }
        console.log(this.placeToUpdate.active) 
        break; 
      } 
      case "Oranje": { 
        console.log("Oranje")
        if (this.places.length % 2 == 0) {
          this.placeToUpdate.active = true;
        } 
        else {
          this.placeToUpdate.active = false;
        }
        console.log(this.placeToUpdate.active) 
        break; 
      }
      case "Rood": { 
        console.log("Rood")
        if (this.places.length % 4 == 0) {
          this.placeToUpdate.active = true;
        } 
        else {
          this.placeToUpdate.active = false;
        }
        console.log(this.placeToUpdate.active) 
        break; 
      } 
      case "Zwart": { 
        console.log("Zwart")
        this.place.active = false;
        console.log(this.placeToUpdate.active) 
        break; 
      }   
    }    
    
    this.submitted = true;
    console.log(this.placeToUpdate);

    if(this.place.name == "EmptyPlace"){
      this._placesService.addPlace(this.placeToUpdate).subscribe();
    }
    else{
      this._placesService.updatePlace(this.placeToUpdate).subscribe();
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
    this.getLocations();
    this.getTables();
    this.placeForm.get('selectedLocation').valueChanges.subscribe(location => {
      this.filteredTables = this.allTables.filter(table => table.location.name == location.name);
      this.zones = [... new Set(this.filteredTables.map(table => table.zone))];
      this.filteredTables2 = this.filteredTables.filter(table => table.zone == this.place.tableLocation.zone);
    });
    this.placeForm.get('selectedZone').valueChanges.subscribe(zone => {
      this.filteredTables2 = this.filteredTables.filter(table => table.zone == zone);
    });
  }


  ngOnInit(): void {
    this.getTables();
        
    if (this.placeForm.controls['name'].value=="EmptyPlace") {
      this.router.navigate(["/places"]);
    }
    this.place = this._placesService.getPlace();
    
    this._tablesService.getTables().subscribe(
      result => {
      this.allTables = result;
      this.filteredTables = this.allTables.filter(table => table.location.name == ((this.place).tableLocation).location.name);
      this.zones = [... new Set(this.filteredTables.map(table => table.zone))];
      this.filteredTables2 = this.filteredTables.filter(table => table.zone == ((this.place).tableLocation).zone);
      this.place.tableLocation = this.filteredTables2.filter(table => table.id === this.place.tableLocation.id)[0];
      }
    )

    if (this.place.name != "EmptyPlace") {
      this.placeForm.reset({id: (this.place).id,name:(this.place).name,selectedTable:this.place.tableLocation,selectedLocation: ((this.place).tableLocation).location,selectedZone:((this.place).tableLocation).zone})
      
    }
    else{
      this.place = this._placesService.getPlace();
      this.placeForm.reset({id: (this.place).id,name:"Nieuwe Plaats",selectedTable:(this.place).tableLocation,selectedLocation: ((this.place).tableLocation).location,selectedZone:((this.place).tableLocation).zone})
    }
    this.initfunc();
    
  }
}
