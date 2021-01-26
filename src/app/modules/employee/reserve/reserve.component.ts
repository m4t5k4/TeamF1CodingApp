import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Reservation } from '../../../shared/models/reservation.model';

import { TablesService } from 'src/app/modules/tables/tables.service';
import { ReservationService } from '../../../security/services/reservation.service';
import { TokenStorageService } from '../../../security/services/token-storage.service';
import { LocalTime } from '@js-joda/core';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.scss']
})
export class ReserveComponent implements OnInit {

  reservateForm = this.formBuilder.group({
      selectedZone: ['',Validators.required],
      selectedTable: ['',Validators.required],
      from: ['',Validators.required],
      till: ['',Validators.required],
      date: ['',Validators.required],
      amountPersons: ['',Validators.required],
      description: ['',Validators.required]
    })

  zones = [
  ];

  tables = [
  ];

  submitted: boolean = false;

  currentUser: any;

  constructor(
    private formBuilder: FormBuilder,
    private _reservationService: ReservationService,
    private _tablesService: TablesService,
    private token: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    console.log(this.currentUser);


    this._tablesService.getTables().subscribe(tables => {
      console.log(tables);

      this.zones = [... new Set(tables.map(table => table.zone))];

      var filtered = tables.filter(function(table) {
        return table.zone == 'A';
      });

      console.log(filtered);
      console.log(this.zones);

      this.reservateForm.get('selectedZone').valueChanges.subscribe(zone => {
        console.log(zone);
        this.tables = tables.filter(table => table.zone == zone);
      })

    })
  }


  onSubmit(){
    this.submitted = true;

    let date = this.reservateForm.value.date;
    let startHour = this.reservateForm.value.from;
    let endHour = this.reservateForm.value.till;
    let amountPersons = this.reservateForm.value.amountPersons;
    let description = this.reservateForm.value.description;
    let start = LocalTime.parse(startHour);
    let end = LocalTime.parse(endHour);

    let reservation = new Reservation(0,date,start,end,amountPersons,description, this.currentUser);
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

}
