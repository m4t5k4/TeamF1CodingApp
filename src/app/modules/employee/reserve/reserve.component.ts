import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Reservation } from '../../../shared/models/reservation.model';
import { PlacesService } from '../../places/places.service';
import { TablesService } from 'src/app/modules/tables/tables.service';
import { ReservationService } from '../reservations/reservation.service';
import { TokenStorageService } from '../../../security/services/token-storage.service';
import { LocalDate, LocalTime } from '@js-joda/core';
import { Router } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.scss']
})
export class ReserveComponent implements OnInit {


  reservateForm = this.formBuilder.group({
    selectedLocation: ['',Validators.required],
    selectedZone: ['',Validators.required],
    selectedTable: ['',Validators.required],
    from: ['',Validators.required],
    till: ['',Validators.required],
    date: [LocalDate.now,Validators.required],
    amountPersons: [1,Validators.required],
    description: [''],
    places: this.formBuilder.array([
      this.formBuilder.group({ place: ['',[RxwebValidators.unique(),Validators.required]]})
    ])
  });

  locations = [];
  zones = [];
  tables = [];
  places = [];
  result = [];

  today = LocalDate.now().toString();
  future = LocalDate.now().plusYears(1).toString();

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
      this.places = places.filter(place =>
          place.tableLocation.location.name == this.reservateForm.value.selectedLocation &&
          place.tableLocation.zone == this.reservateForm.value.selectedZone &&
          place.tableLocation.name == this.reservateForm.value.selectedTable);

      this.reservateForm.get('selectedLocation').valueChanges.subscribe(location => {
        this.places = places.filter(place =>
          place.tableLocation.location.name == location &&
          place.tableLocation.zone == this.reservateForm.value.selectedZone &&
          place.tableLocation.name == this.reservateForm.value.selectedTable);
      });
      this.reservateForm.get('selectedZone').valueChanges.subscribe(zone => {
        this.places = places.filter(place =>
          place.tableLocation.name == this.reservateForm.value.selectedTable &&
          place.tableLocation.zone == zone &&
          place.tableLocation.location.name == this.reservateForm.value.selectedLocation);
      });
      this.reservateForm.get('selectedTable').valueChanges.subscribe(table => {
        this.places = places.filter(place =>
          place.tableLocation.name == table &&
          place.tableLocation.zone == this.reservateForm.value.selectedZone &&
          place.tableLocation.location.name == this.reservateForm.value.selectedLocation);

      });
      this.reservateForm.get('places').valueChanges.subscribe(array => {
        this.result = array;
        console.log(this.result);
      })

    })

    this._tablesService.getTables().subscribe(tables => {

      this.locations = [... new Set(tables.map(table => table.location.name))];
      this.zones = [... new Set(tables.map(table => table.zone))];

      this.reservateForm.controls['selectedLocation'].setValue(this.locations[0]);
      this.reservateForm.controls['selectedZone'].setValue('');

      this.tables = tables.filter(table =>
          table.location.name == this.reservateForm.value.selectedLocation &&
          table.zone == this.reservateForm.value.selectedZone);
      console.log(this.tables);

      this.reservateForm.controls['selectedTable'].setValue('');
      console.log(this.reservateForm.value.selectedTable);

      this.reservateForm.get('selectedLocation').valueChanges.subscribe(location => {
        console.log(location);

        this.tables = tables.filter(table => table.location.name == location);
        console.log(this.tables);
        this.reservateForm.controls['selectedZone'].setValue('');
        console.log("ln116 " +this.reservateForm.value.selectedTable.name);

      });

      this.reservateForm.get('selectedZone').valueChanges.subscribe(zone => {
        console.log(zone);
        this.tables = tables.filter(table => table.zone == zone && table.location.name == this.reservateForm.value.selectedLocation);
        console.log(this.tables);
        this.reservateForm.controls['selectedTable'].setValue('');
        console.log(this.reservateForm.value.selectedTable);
      });

      let time = LocalTime.now().toString().slice(0,-7);


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
    let amountPersons = places.length;
    let description = this.reservateForm.value.description;
    let start = startHour
    let end = endHour;
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
    (this.reservateForm.get('places') as FormArray).push(this.formBuilder.group({ place:['',[RxwebValidators.unique(),Validators.required]]}));
  }

  removePlace() {
    (this.reservateForm.get('places') as FormArray).removeAt((this.reservateForm.get('places') as FormArray).length - 1);
  }

  getPlacesFormControls() {
    return (<FormArray> this.reservateForm.get('places')).controls;
  }

}
