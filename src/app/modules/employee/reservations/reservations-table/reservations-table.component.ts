import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Reservation } from 'src/app/shared/models/reservation.model';
import { ReservationService } from '../reservation.service';
import { TokenStorageService } from '../../../../security/services/token-storage.service';

@Component({
  selector: 'app-reservations-table',
  templateUrl: './reservations-table.component.html',
  styleUrls: ['./reservations-table.component.scss']
})
export class ReservationsTableComponent implements OnInit {

  displayedColumns = ['amountPersons', 'date', 'description', 'startHour', 'endHour'];
  dataSource = new MatTableDataSource<Reservation>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private _reservationService: ReservationService,
    private _token: TokenStorageService) {
      this._reservationService.getReservationsById(_token.getUser().id).subscribe(
        result => {
          this.dataSource = new MatTableDataSource<Reservation>(result);
          console.log(this.dataSource);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

      }
    )
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
