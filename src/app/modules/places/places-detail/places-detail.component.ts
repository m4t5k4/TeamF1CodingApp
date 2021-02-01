import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { TableLocation } from 'src/app/shared/models/table-location.model';
import { Location } from 'src/app/shared/models/location.model';
import { TablesService } from '../../tables/tables.service';
import { LocationsService } from '../../locations/locations.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { observable } from 'rxjs';

@Component({
  selector: 'app-places-detail',
  templateUrl: './places-detail.component.html',
  styleUrls: ['./places-detail.component.scss']
})
export class PlacesDetailComponent implements OnInit {

  constructor(private _tablesService: TablesService,private _locationsService: LocationsService, private router: Router) { }

  locations: Location[];
  allLocations: Location[];

  tableForm = new FormGroup(
    {
      id: new FormControl(this._tablesService.getTable().id),
      name: new FormControl(this._tablesService.getTable().name, Validators.required),
      zone: new FormControl(this._tablesService.getTable().zone, Validators.required),
      locationSelect: new FormControl(null, Validators.required),
    }
  )

  submitted: boolean = false;

  saveTable() {
    let Table = this._tablesService.getTable();
    let TableToUpdate = new TableLocation(this.tableForm.get("id").value,
    this.tableForm.get("name").value,
    this.tableForm.get("zone").value,
    this.tableForm.get("locationSelect").value);
    
    this.submitted = true;
    console.log(TableToUpdate);

    if(Table.name == "EmptyTable"){
      this._tablesService.addTable(TableToUpdate).subscribe();
    }
    else{
      this._tablesService.updateTable(TableToUpdate).subscribe();
    }

    setTimeout(()=>{                          
      this.router.navigate(["/tables"]);
    }, 1000); 
  }

  btnReturn() {
    this.router.navigate(["/tables"]);
  }


  getLocations(): void{
    this._locationsService.getLocations().subscribe(
      result => {
      this.locations = result;
      }
    )
  }

  ngOnInit(): void {
    console.log(this._tablesService.getTable().name+ " Test1")
    let Table = this._tablesService.getTable();
    this.getLocations();

    if(Table.name == "EmptyTable"){
      this.tableForm.setValue({id:0,name:"",zone:"",locationSelect:""});
    }
    else{
      this._locationsService.getLocations().subscribe(
        result => {
        this.allLocations = result;
        console.log("Test 1 : "+this.tableForm.controls['locationSelect'].value);
        var currentLocation: Location = this.allLocations[Table.location.id-1];
        this.tableForm.setValue({id:Table.id,name:Table.name,zone:Table.zone,locationSelect: currentLocation});
        console.log(this.tableForm.controls['locationSelect'].value) 
        }
      )      
    }
  }

}
