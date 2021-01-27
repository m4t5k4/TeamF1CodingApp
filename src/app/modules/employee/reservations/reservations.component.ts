import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/security/services/token-storage.service';
import { ReservationService } from './reservation.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {

  reservations: any;


  constructor(
    private _reservationService: ReservationService,
    private _tokenService: TokenStorageService
    ) { }

  ngOnInit(): void {
    this._reservationService.getReservationsById(this._tokenService.getUser().id).subscribe(reservations => {
      this.reservations = reservations;
      console.log(this.reservations);

    })
  }

  newReservation() {

  }

  showDetailReservation() {

  }

  deleteReservation(id) {
    if (confirm("Wil je deze reservatie: " + id +" verwijderen?" )) {
      this._reservationService.deleteReservation(id).subscribe(() => {
        this.reservations = this.reservations.filter(x => x.id !== id)
      });
    }
  }

}
