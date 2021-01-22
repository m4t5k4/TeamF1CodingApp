import { Component, OnInit } from '@angular/core';
import { TableLocation } from 'src/app/shared/models/table-location.model';
import { TablesService } from '../tables.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  
  tables: TableLocation[];

  constructor(private _tablesService : TablesService) { 
    this._tablesService.getTables().subscribe(
      result => {
      this.tables = result;
      }
      );
  }
  addTable() {
    let newTable = new TableLocation(0,"Tafel 500");
    this._tablesService.addTable(newTable).subscribe();
    window.location.reload();
  }

  updateTable() {
    let tableToUpdate = new TableLocation(1, "Tafel 123");
    this._tablesService.updateTable(tableToUpdate).subscribe();
    window.location.reload();
  }

  deleteTable(id) {
    this._tablesService.deleteTable(id).subscribe();
    window.location.reload();
  }

  ngOnInit(): void {
  }

}
