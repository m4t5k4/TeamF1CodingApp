import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from 'src/app/shared/models/reservation.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }

  getReservations() : Observable<Reservation[]>
  {
    return this.http.get<Reservation[]>(`${environment.baseUrl}reservations`);
  }

  getReservationsById(id: number) {
    return this.http.get<Reservation[]>(`${environment.baseUrl}reservations/user/${id}`);
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
}
