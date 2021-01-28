import { Component, OnInit, ViewChild } from '@angular/core';
import { LocationsService } from '../locations.service';
import { Location } from '../../../shared/models/location.model'
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})

export class LocationsComponent implements OnInit {
  displayedColumns = ['name', 'address', 'description', 'btn'];
  dataSource = new MatTableDataSource<Location>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private _locationService: LocationsService, private router: Router) {
    this._locationService.getLocations().subscribe(
      result => {
        this.dataSource = new MatTableDataSource<Location>(result);
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


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  deleteLocation(locationId: number, naam: string) {
    if (confirm("Wil je deze locatie: " + naam + " verwijderen?")) {
      this._locationService.deleteLocation(locationId).subscribe();
      window.location.reload();
    }
  }

  selectedLocation: Location = null;

  showDetailLocation(l: Location) {
    //this.selectedLocation = l;
    this._locationService.setLocation(l);
    this.router.navigate(['/location/edit']);
  }

  ngOnInit(): void {
  }

  btnClickNew(): void {
    console.log('trigger');
    this.router.navigate(['/location/add']);
  };

}
