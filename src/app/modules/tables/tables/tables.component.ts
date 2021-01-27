import { Component, OnInit } from '@angular/core';
import { TableLocation } from 'src/app/shared/models/table-location.model';
import { TablesService } from '../tables.service';
import { Router } from '@angular/router';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  
  tables: TableLocation[];

  constructor(private _tablesService : TablesService, private router: Router) {
    var table = $('#dataTableTables').DataTable();
    table.destroy();
    //this.router.navigate(['/tables']); 
  }
    

  addTable() {
    var table = new TableLocation(0,"EmptyTable","EmptyZone");
    this._tablesService.setEditTable(table)
    this.router.navigate(['/tables/edit']);
  }

  deleteTable(id: number) {
    this._tablesService.deleteTable(id).subscribe();
    window.location.reload();
    this.router.navigate(['/tables']);
  }

  showDetailTable(table: TableLocation) {
    this._tablesService.setEditTable(table)
    console.log(this._tablesService.getTable().name)
    this.router.navigate(['/tables/edit']);
  }

  ngOnInit(): void {
    this.getTables();
    var table = $('#dataTableTables').DataTable();
    table.destroy();  
    this.tables
    this.router.navigate(['/tables']); 
  }

  getTables(): void{
    this._tablesService.getTables().subscribe(
      result => {
      this.tables = result;
      }
    )
  }

}
