import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { TableLocation } from 'src/app/shared/models/table-location.model';
import { TablesService } from '../tables.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tables-detail',
  templateUrl: './tables-detail.component.html',
  styleUrls: ['./tables-detail.component.scss']
})
export class TablesDetailComponent implements OnInit {

  constructor(private _tablesService: TablesService, private router: Router) { }

  tableForm = new FormGroup(
    {
      id: new FormControl(this._tablesService.getTable().id),
      name: new FormControl(this._tablesService.getTable().name, Validators.required),
      zone: new FormControl(this._tablesService.getTable().zone, Validators.required),
    }
  )

  submitted: boolean = false;

  saveTable() {
    let Table = this._tablesService.getTable();
    let TableToUpdate = new TableLocation(this.tableForm.get("id").value,this.tableForm.get("name").value,this.tableForm.get("zone").value);
    
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

  ngOnInit(): void {
    console.log(this._tablesService.getTable().name+ "Test")
    let Table = this._tablesService.getTable();
    if(Table.name == "EmptyTable"){
      this.tableForm.setValue({id:0,name:"",zone:""});
    }
    else{
      this.tableForm.setValue({id:Table.id,name:Table.name,zone:Table.zone});
    }
  }

}
