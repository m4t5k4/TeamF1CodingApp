import { Component, OnInit } from '@angular/core';
import { TableLocation } from 'src/app/shared/models/table-location.model';
import { TablesService } from '../tables.service';
import { LocationsService } from '../../locations/locations.service';
import { Router } from '@angular/router';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  
  tables: TableLocation[];

  constructor(private _tablesService : TablesService,private _locationsService: LocationsService, private router: Router) {
  }
    

  addTable() {
    var locations = this._locationsService.getLocations();
    var table = new TableLocation(0,"EmptyTable","EmptyZone",locations[0]);
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
