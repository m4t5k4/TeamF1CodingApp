import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Reservation } from '../../../shared/models/reservation.model';
import { PlacesService } from '../../places/places.service';
import { TablesService } from 'src/app/modules/tables/tables.service';
import { ReservationService } from '../reservations/reservation.service';
import { TokenStorageService } from '../../../security/services/token-storage.service';
import { LocalDate, LocalTime } from '@js-joda/core';
import { Router } from '@angular/router';
import { Place } from 'src/app/shared/models/place.model';
import { TableLocation } from 'src/app/shared/models/table-location.model';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.scss']
})
export class ReserveComponent implements OnInit {


  reservateForm = this.formBuilder.group({
    selectedLocation: ['Corda campus 1',Validators.required],
    selectedZone: ['',Validators.required],
    selectedTable: ['',Validators.required],
    from: ['',Validators.required],
    till: ['',Validators.required],
    date: [LocalDate.now,Validators.required],
    amountPersons: [1,Validators.required],
    description: ['',Validators.required],
    places: this.formBuilder.array([
      this.formBuilder.control(null)
    ],[Validators.required])
  });

  locations = [];
  zones = [];
  tables = [];
  places = [];
  result = [];

  submitted: boolean = false;

  currentUser: any;

  constructor(
    private formBuilder: FormBuilder,
    private _reservationService: ReservationService,
    private _tablesService: TablesService,
    private _placesService: PlacesService,
    private token: TokenStorageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    console.log(this.currentUser);

    this._placesService.getPlaces().subscribe(places => {
      this.places = places;
      this.reservateForm.get('selectedLocation').valueChanges.subscribe(location => {
        this.places = places.filter(place => place.tableLocation.location.name == location);
        console.log(this.places);
      });
      this.reservateForm.get('selectedZone').valueChanges.subscribe(zone => {
        this.places = places.filter(place =>
          place.tableLocation.name == this.reservateForm.value.selectedTable &&
          place.tableLocation.zone == zone &&
          place.tableLocation.location.name == this.reservateForm.value.selectedLocation);
        console.log(this.places);
      });
      this.reservateForm.get('selectedTable').valueChanges.subscribe(table => {
        this.places = places.filter(place =>
          place.tableLocation.name == table &&
          place.tableLocation.zone == this.reservateForm.value.selectedZone &&
          place.tableLocation.location.name == this.reservateForm.value.selectedLocation);
        console.log(this.places);

      });
      this.reservateForm.get('places').valueChanges.subscribe(array => {
        this.result = array;
        console.log(this.result);
      })

    })

    this._tablesService.getTables().subscribe(tables => {
      console.log(tables);
      this.locations = [... new Set(tables.map(table => table.location.name))];

      this.reservateForm.get('selectedLocation').valueChanges.subscribe(location => {
        console.log(location);
        this.tables = tables.filter(table => table.location.name == location);
        this.zones = [... new Set(this.tables.map(table => table.zone))];
        console.log(this.tables);
      });

      this.reservateForm.get('selectedZone').valueChanges.subscribe(zone => {
        console.log(zone);
        this.tables = tables.filter(table => table.zone == zone && table.location.name == this.reservateForm.value.selectedLocation);
        console.log(this.tables);
        console.log(this.reservateForm.value.selectedLocation);
      });

      let time = LocalTime.now().toString().slice(0,-7);

      this.reservateForm.controls['selectedLocation'].setValue(this.locations[0]);
      this.reservateForm.controls['date'].setValue(LocalDate.now());
      this.reservateForm.controls['from'].setValue(time);
      this.reservateForm.controls['till'].setValue(time);
      console.log(this.reservateForm.value.selectedLocation);
      console.log(this.locations);

    });
  }


  onSubmit(){
    this.submitted = true;

    let places = [];
    this.result.forEach(x => {
      places.push(this.places.filter(place => place.name == x)[0]);
    });
    let date = this.reservateForm.value.date;
    let startHour = this.reservateForm.value.from;
    let endHour = this.reservateForm.value.till;
    let amountPersons = this.reservateForm.value.amountPersons;
    let description = this.reservateForm.value.description;
    let start = LocalTime.parse(startHour);
    let end = LocalTime.parse(endHour);
    let user = this.currentUser;
    user.roles = [];

    let reservation = new Reservation(0,date,start,end,amountPersons,description, user,false,places);
    console.log(reservation);
    this._reservationService.addReservation(reservation).subscribe({
      next: () => {
        console.log(reservation + " toegevoegd");
        this.submitted = false;
        this.router.navigate(['/reservations']);
      },
      error: error => {
        console.log(error);
      }
    });
  }

  addPlace() {
    (this.reservateForm.get('places') as FormArray).push(this.formBuilder.control(null));
  }

  removePlace() {
    (this.reservateForm.get('places') as FormArray).removeAt((this.reservateForm.get('places') as FormArray).length - 1);
  }

  getPlacesFormControls() {
    return (<FormArray> this.reservateForm.get('places')).controls;
  }

}
