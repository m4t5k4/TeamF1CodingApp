import { Component, OnInit } from '@angular/core';
import { TableLocation } from 'src/app/shared/models/table-location.model';
import { TablesService } from '../tables.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  
  tables: TableLocation[];

  constructor(private _tablesService : TablesService, private router: Router) { 
    this._tablesService.getTables().subscribe(
      result => {
      this.tables = result;
      }
    )
  }
  addTable() {
    this.router.navigate(['/table/edit']);
  }

  updateTable() {
    let tableToUpdate = new TableLocation(1, "Tafel 123");
    this._tablesService.updateTable(tableToUpdate).subscribe();
    window.location.reload();
  }

  deleteTable(id: number) {
    this._tablesService.deleteTable(id).subscribe();
    window.location.reload();
  }

  showDetailTable(table: TableLocation) {
    this._tablesService.setEditTable(table)
    console.log(this._tablesService.getTable().name)
    this.router.navigate(['/tables/edit']);
  }

  ngOnInit(): void {
  }

}
