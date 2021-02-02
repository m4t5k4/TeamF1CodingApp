import { Component, OnInit, ViewChild } from '@angular/core';
import { TableLocation } from 'src/app/shared/models/table-location.model';
import { TablesService } from '../../tables/tables.service';
import { LocationsService } from '../../locations/locations.service'
import { Router } from '@angular/router';
import { Location } from 'src/app/shared/models/location.model';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PlacesService } from "../places.service"
import { Place } from 'src/app/shared/models/place.model';
import { from } from 'rxjs';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit {

  locations: Location[];
  test: Place[];
  tables: TableLocation[];

  displayedColumns = ["table.location.name","table.name","name", 'btn'];
  dataSource = new MatTableDataSource<Place>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _tablesService : TablesService,private _placesService: PlacesService,private _locationsService:LocationsService, private router: Router) {
    this._placesService.getPlaces().subscribe(
      result => {
        this.dataSource = new MatTableDataSource<Place>(result);
        this.dataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
              case 'table.location.name': return item.tableLocation.location.name;
              case 'table.name': return item.tableLocation.name;
              default: return item[property];
          }
        }
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.dataSource);  
      }
    )
    this._locationsService.getLocations().subscribe(
      result => {
          this.locations = result
      }
    )
   }

   @ViewChild(MatSort) sort: MatSort;
   ngAfterViewInit() {
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
  }
   applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


  ngOnInit(): void {
    this._tablesService.getTables().subscribe(
      result => {
      this.tables = result;
    })
  }

  addPlace() {
    let place = new Place(0,"EmptyPlace",this.tables[0],false);
    this._placesService.setEditPlace(place)
    //console.log(this._placesService.getPlace().id + ": "+ this._placesService.getPlace().name+","+this._placesService.getPlace().tableLocation.name)
    this.router.navigate(['/places/edit']);
  }

  deletePlace(id: number) {
    this._placesService.deletePlace(id).subscribe();
    window.location.reload();
    this.router.navigate(['/places']);
  }

  showDetailPlace(place: Place) {
    this._placesService.setEditPlace(place)
    //console.log(this._placesService.getPlace().id)
    this.router.navigate(['/places/edit']);
  }

}
