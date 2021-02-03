import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalTime } from '@js-joda/core';
import { Observable, pipe } from 'rxjs';
import { take } from 'rxjs/operators';
import { Reservation } from 'src/app/shared/models/reservation.model';
import { User } from 'src/app/shared/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) {
    this.getReservations().pipe(take(1)).subscribe(result => this.reservation = result);
  }

  reservation;


  getReservations() : Observable<Reservation[]>
  {
    return this.http.get<Reservation[]>(`${environment.baseUrl}reservations`);
  }

  getReservationsById(id: number) {
    return this.http.get<Reservation[]>(`${environment.baseUrl}reservations/user/${id}`);
  }

  getReservationsByDate(date) {
    return this.http.get<Reservation[]>(`${environment.baseUrl}reservations/date/${date}`);
  }

  addReservation(reservation: Reservation)
  {
    return this.http.post<Reservation>(`${environment.baseUrl}reservations`, reservation);
  }

  updateReservation(reservation: Reservation)
  {
    return this.http.put<Reservation>(`${environment.baseUrl}reservations`, reservation);
  }

  deleteReservation(reservationID: number) {
    return this.http.delete<Reservation>(`${environment.baseUrl}reservations/` + reservationID);
  }

  setReservation(reservation : Reservation)
  {
    this.reservation = reservation;
    console.log(this.reservation);
  }

  getReservation()
  {
    return this.reservation;
  }
}
