import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reservation } from 'src/app/shared/models/reservation.model';
import { ReservationService } from '../reservation.service';

@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.scss']
})
export class ReservationDetailComponent implements OnInit {

  reservation: Reservation

  constructor(
    private _reservationService: ReservationService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.reservation = this._reservationService.getReservation()
  }



  btnReturn() {
    this.router.navigate(["/reservations"]);
  }

  deleteReservation(id) {
    if (confirm("Wil je deze reservatie: " + id +" verwijderen?" )) {
      this._reservationService.deleteReservation(id).subscribe(() => {

      });
    }
  }

}
