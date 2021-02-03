import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { TableLocation } from 'src/app/shared/models/table-location.model';
import { Location } from 'src/app/shared/models/location.model';
import { TablesService } from '../tables.service';
import { LocationsService } from '../../locations/locations.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { observable } from 'rxjs';

@Component({
  selector: 'app-tables-detail',
  templateUrl: './tables-detail.component.html',
  styleUrls: ['./tables-detail.component.scss']
})
export class TablesDetailComponent implements OnInit {
  
  locations: Location[];
  Table:TableLocation;

  constructor(private _tablesService: TablesService,private _locationsService: LocationsService, private router: Router) {
    this.getLocations();
  }



  tableForm = new FormGroup(
    {
      id: new FormControl(""),
      name: new FormControl("", Validators.required && Validators.maxLength(20)),
      zone: new FormControl("", Validators.required && Validators.maxLength(1)),
      locationSelect: new FormControl("", Validators.required),
    }
  )

  submitted: boolean = false;

  saveTable() {
    let Table = this._tablesService.getTable();
    let zone = this.tableForm.get("zone").value
    let TableToUpdate = new TableLocation(this.tableForm.get("id").value,
    this.tableForm.get("name").value,
    zone.toUpperCase(),
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
    this._locationsService.getLocations().subscribe(
      result => {
      this.locations = result;
      }
    )
    this.Table = this._tablesService.getTable();
    //console.log(this.Table.name)


    if(this.Table.name == "EmptyTable"){
      this.tableForm.setValue({id:0,name:"Nieuwe Tafel",zone:"A",locationSelect:(this.Table).location});
    }
    else{
      console.log("Test 1 : "+this.tableForm.controls['locationSelect'].value);
      this.tableForm.setValue({id:this.Table.id,name:this.Table.name,zone:this.Table.zone,locationSelect: (this.Table).location});
      console.log("Test 2 : "+this.tableForm.controls['locationSelect'].value.name)       
    }
  }
}
