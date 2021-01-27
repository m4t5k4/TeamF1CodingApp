import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-reservations-table',
  templateUrl: './reservations-table.component.html',
  styleUrls: ['./reservations-table.component.scss']
})
export class ReservationsTableComponent implements OnInit {

  displayedColumns = ['id', 'name', 'progress', 'color'];
  dataSource = new MatTableDataSource<UserData>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {
      // Create 100 users
    const users: UserData[] = [];
    var users1=[];
    for (let i = 1; i <= 100; i++) { /*users.push(createNewUser(i));*/

      users1.push({"cnt" : i,"name":"batr"+i});

     }
     console.log(users1);
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource<UserData>(users1);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
  }



  @ViewChild(MatSort) sort: MatSort;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}
