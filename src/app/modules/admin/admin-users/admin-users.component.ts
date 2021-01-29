import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { AdminService } from "../admin.service";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements AfterViewInit {
  users: User[];
  displayedColumns: string[] = ['firstname', 'lastname', 'username', 'role', 'btn'];
  dataSource = new MatTableDataSource<User>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _adminService: AdminService, private router: Router) {
    this._adminService.getUsers().subscribe(
      result => {
        this.dataSource = new MatTableDataSource<User>(result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.dataSource);
       }
    );
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

  editUser(user: User){
    this._adminService.setUser(user);
    this.router.navigate(['/admin/user/edit']);
  }

  deleteUser(id: number) {
    this._adminService.deleteUser(id).subscribe();
    window.location.reload();
    this.router.navigate(['/admin/user']);
  }
}

