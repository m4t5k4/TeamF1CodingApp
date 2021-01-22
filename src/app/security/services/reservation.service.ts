import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from 'src/app/shared/models/reservation.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) {

  }

  public getReservations() {
    return this.http.get<Reservation[]>(`${environment.baseUrl}reservations`);
  }

  public postReservation(reservation: Reservation) {
    return this.http.post<Reservation>(`${environment.baseUrl}reservations`, reservation);
  }

  public putReservation(id: number, reservation: Reservation) {
    return this.http.put<Reservation>(`${environment.baseUrl}reservations/` + id, reservation);
  }

  public deleteReservation(id: number) {
    return this.http.delete<Reservation>(`${environment.baseUrl}reservations/` + id);
  }
}
