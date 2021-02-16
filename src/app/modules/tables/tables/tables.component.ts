import { Component, OnInit, ViewChild  } from '@angular/core';
import { TableLocation } from 'src/app/shared/models/table-location.model';
import { TablesService } from '../tables.service';
import { LocationsService } from '../../locations/locations.service';
import { Router } from '@angular/router';
import { Location } from 'src/app/shared/models/location.model';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  locations: Location[];

  displayedColumns = ["location.name", 'zone', 'name', 'btn'];
  dataSource = new MatTableDataSource<TableLocation>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _tablesService : TablesService,private _locationsService: LocationsService, private router: Router) {
    this._tablesService.getTables().subscribe(
      result => {
        this.dataSource = new MatTableDataSource<TableLocation>(result);
        this.dataSource.sortingDataAccessor = (item, property) => {
          switch(property) {
            case 'location.name': return item.location.name;
            default: return item[property];
          }
        };
        this.dataSource.filterPredicate = (data: TableLocation, filter: string) => {
          return data.name.toLocaleLowerCase().includes(filter) ||
          data.zone.toLocaleLowerCase().includes(filter) ||
          data.location.name.toLocaleLowerCase().includes(filter);
        }
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
  }
  
  @ViewChild(MatSort) sort: MatSort;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }   

  addTable() {
    let table = new TableLocation(0,"EmptyTable","EmptyZone",this.locations[0]);
    this._tablesService.setEditTable(table)
    this.router.navigate(['/tables/edit']);
  }

  deleteTable(id: number, name: string) {
    if (window.confirm("Wil je deze tafel: " + name + " verwijderen?")) { 
      this._tablesService.deleteTable(id).subscribe();
      setTimeout(()=>{                          
        this._tablesService.getTables().subscribe(
          result => {
            this.dataSource = new MatTableDataSource<TableLocation>(result);
            this.dataSource.sortingDataAccessor = (item, property) => {
              switch(property) {
                case 'location.name': return item.location.name;
                default: return item[property];
              }
            };
            this.dataSource.filterPredicate = (data: TableLocation, filter: string) => {
              return data.name.toLocaleLowerCase().includes(filter) ||
              data.zone.toLocaleLowerCase().includes(filter) ||
              data.location.name.toLocaleLowerCase().includes(filter);
            }
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        )
      }, 1000); 
    }
  }

  showDetailTable(table: TableLocation) {
    this._tablesService.setEditTable(table)
    //console.log(this._tablesService.getTable().name)
    this.router.navigate(['/tables/edit']);
  }

  ngOnInit(): void {    
    this._locationsService.getLocations().subscribe(
      result => {
      this.locations = result;
    })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
