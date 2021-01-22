import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Reservation } from '../../../shared/models/reservation.model';
import { ReservationService } from '../../../security/services/reservation.service';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.scss']
})
export class ReserveComponent implements OnInit {

  reservateForm = this.formBuilder.group({
      selectedLocation: [''],
      selectedPlace: [''],
      from: [''],
      till: [''],
      date: [''],
      amountPersons: [''],
      description: ['']
    })

  locations = [
    { name: "A"},
    { name: "B"},
    { name: "C"},
    { name: "D"},
    { name: "E"},
  ];

  places = [
    { number: 1 },
    { number: 2 },
    { number: 3 },
    { number: 4 },
    { number: 5 },
  ];

  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private _reservationService: ReservationService
  ) { }

  onSubmit(){
    this.submitted = true;

    let date = this.reservateForm.value.date;
    let startHour = this.reservateForm.value.from;
    let endHour = this.reservateForm.value.till;
    let amountPersons = this.reservateForm.value.amountPersons;
    let description = this.reservateForm.value.description;

    let reservation = new Reservation(0,date,startHour,endHour,amountPersons,description);
    console.log(reservation);
    this._reservationService.postReservation(reservation).subscribe({
      next: () => {
        console.log(reservation + " toegevoegd");
      },
      error: error => {
        console.log(error);
      }
    });
  }

  ngOnInit(): void {

  }

}
