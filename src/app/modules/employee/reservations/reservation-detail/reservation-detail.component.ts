import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationService } from '../reservation.service';

@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.scss']
})
export class ReservationDetailComponent implements OnInit {

  constructor(
    private _reservationService: ReservationService,
    private router: Router
  ) { }

  reservationForm;

  ngOnInit(): void {
  }

  submitted: boolean = false;

  onSubmit() {
    let reservationToUpdate;

    this.submitted = true;
    console.log(reservationToUpdate);
    this._reservationService.updateReservation(reservationToUpdate).subscribe();
    setTimeout(()=>{
      this.router.navigate(["/reservations"]);
    }, 1000);
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
