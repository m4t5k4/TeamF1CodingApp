import { Component, OnInit } from '@angular/core';
import { TableLocation } from 'src/app/shared/models/table-location.model';
import { TablesService } from '../tables.service';
import { LocationsService } from '../../locations/locations.service';
import { Router } from '@angular/router';
import {Sort} from '@angular/material/sort';
import { Location } from 'src/app/shared/models/location.model';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  
  tables: TableLocation[];
  sortedData: TableLocation[];

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
      this.sortedData = result
      }
    )
  }

  sortData(sort: Sort) {
    const data = this.tables.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'Locatie': return this.compare(a.location, b.location, isAsc);
        case 'Zone': return this.compare(a.zone, b.zone, isAsc);
        case 'Naam': return this.compare(a.name, b.name, isAsc);
        default: return 0;
      }
    });
  }

  compare(a: Location | string, b: Location | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

}
