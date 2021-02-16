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
import { NotifierService } from "angular-notifier";

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.scss']
})
export class ReserveComponent implements OnInit {
  notifier: NotifierService;

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
    notifier: NotifierService,
  ) { this.notifier = notifier; }

  ngOnInit(): void {
    //this.notifier.notify("success", "Welkom terug "+this.token.getUser().firstname);
    this.currentUser = this.token.getUser();
    //console.log(this.currentUser);

    this._placesService.getPlaces().subscribe(places => {
      //console.log(places);
      this.places = places.filter(place =>
          place.active == true &&
          place.tableLocation.location.name == this.reservateForm.value.selectedLocation &&
          place.tableLocation.zone == this.reservateForm.value.selectedZone &&
          place.tableLocation.name == this.reservateForm.value.selectedTable);
      this.reservateForm.get('selectedLocation').valueChanges.subscribe(location => {
        this.places = places.filter(place =>
          place.active == true &&
          place.tableLocation.location.name == location &&
          place.tableLocation.zone == this.reservateForm.value.selectedZone &&
          place.tableLocation.name == this.reservateForm.value.selectedTable);
      });
      this.reservateForm.get('selectedZone').valueChanges.subscribe(zone => {
        this.places = places.filter(place =>
          place.active == true &&
          place.tableLocation.name == this.reservateForm.value.selectedTable &&
          place.tableLocation.zone == zone &&
          place.tableLocation.location.name == this.reservateForm.value.selectedLocation);
      });
      this.reservateForm.get('selectedTable').valueChanges.subscribe(table => {
        this.places = places.filter(place =>
          place.active == true &&
          place.tableLocation.name == table &&
          place.tableLocation.zone == this.reservateForm.value.selectedZone &&
          place.tableLocation.location.name == this.reservateForm.value.selectedLocation);

        //console.log(this.places);
      });
      this.reservateForm.get('places').valueChanges.subscribe(array => {
        this.result = array;
        //console.log(this.result);
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
      //console.log(this.tables);

      this.reservateForm.controls['selectedTable'].setValue('');
      //console.log(this.reservateForm.value.selectedTable);

      this.reservateForm.get('selectedLocation').valueChanges.subscribe(location => {
        //console.log(location);
        this.tables = tables.filter(table => table.location.name == location);
        //console.log(this.tables);
        this.reservateForm.controls['selectedZone'].setValue('');
        //console.log("ln116 " +this.reservateForm.value.selectedTable.name);

      });

      this.reservateForm.get('selectedZone').valueChanges.subscribe(zone => {
        this.tables = tables.filter(table => table.zone == zone && table.location.name == this.reservateForm.value.selectedLocation);
        //console.log(this.tables);
        this.reservateForm.controls['selectedTable'].setValue('');
      });

      this.reservateForm.get('date').valueChanges.subscribe(date => {
        this._reservationService.getReservationsByDate(date).subscribe(reservations => {
          //console.log(reservations);
          let matchingTableReservations = [];
          for(var i=0; i < reservations.length; i++) {
            for(var j=0; j < reservations[i].places.length; j++) {
              //console.log(reservations[i].places[j]);
              if (reservations[i].places[j].tableLocation.location.name == this.reservateForm.value.selectedLocation &&
                reservations[i].places[j].tableLocation.zone == this.reservateForm.value.selectedZone &&
                reservations[i].places[j].tableLocation.name == this.reservateForm.value.selectedTable) {
                  let selectedPlaces = this.result.map(x => x.place);
                  //console.log(selectedPlaces);
                  if (selectedPlaces.includes(reservations[i].places[j].name)) {
                    //console.log("result includes: "+reservations[i].places[j].name);
                    //console.log(reservations[i]);
                    let from = LocalTime.parse(reservations[i].startHour.toString());
                    let end = LocalTime.parse(reservations[i].endHour.toString());
                    let selectedFrom = LocalTime.parse(this.reservateForm.value.from);
                    let selectedTill = LocalTime.parse(this.reservateForm.value.till);
                    // een reservatie eindigt na selectedFrom & begint voor selectedTill (reservatie > nieuwe)
                    let reservatieBegintTillEindigtNaFrom = end.isAfter(selectedFrom) && from.isBefore(selectedTill);
                    // een reservatie eindigt na selectedFrom & begint na selectedFrom (latere reservatie)
                    let reservatieBegintNaFromEindigtNaTill = end.isAfter(selectedFrom) && end.isAfter(selectedTill);
                    // een reservatie begint voor selectedFrom & eindigt na selectedFrom (vroegere reservatie)
                    let reservatieBegintVoorFromEindigtVoorTill = from.isBefore(selectedFrom) && end.isAfter(selectedFrom);
                    // een reservatie begint na selectedFrom & eindigt voor selectedTill (ertussen)
                    let reservatieBegintNaFromEindigtVoorTill = from.isAfter(selectedFrom) && end.isBefore(selectedTill);

                    //console.log(reservatieBegintTillEindigtNaFrom+" "+reservatieBegintNaFromEindigtNaTill+" "+reservatieBegintVoorFromEindigtVoorTill+" "+reservatieBegintNaFromEindigtVoorTill);
                  }
                  matchingTableReservations.push(reservations[i]);
                  break;
                }
            }
          }
        })
      })

      let time = LocalTime.now().toString().slice(0,-7);
      //console.log(time);
      let time2 = LocalTime.now().plusHours(1).toString().slice(0,-7);
      //console.log(time2);

      this.reservateForm.controls['date'].setValue(LocalDate.now());
      this.reservateForm.controls['from'].setValue(time);
      this.reservateForm.controls['till'].setValue(time2);
      //console.log(this.reservateForm.value.selectedLocation);
      //console.log(this.locations);

    });
  }


  onSubmit(){
    this.submitted = true;

    let places = [];

    this.result.forEach(x => {
      places.push(this.places.filter(place => place.name == x.place)[0]);
    });
    //console.log(places);
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
    //console.log(reservation);

    this._reservationService.getReservationsByDate(date).subscribe(reservations => {
      let reservatieBegintTillEindigtNaFrom;
      let reservatieBegintNaFromEindigtNaTill;
      let reservatieBegintVoorFromEindigtVoorTill;
      let reservatieBegintNaFromEindigtVoorTill;

          //console.log(reservations);
          let matchingTableReservations = [];
          for(var i=0; i < reservations.length; i++) {
            for(var j=0; j < reservations[i].places.length; j++) {
              console.log(reservations[i].places[j]);
              if (reservations[i].places[j].tableLocation.location.name == this.reservateForm.value.selectedLocation &&
                reservations[i].places[j].tableLocation.zone == this.reservateForm.value.selectedZone &&
                reservations[i].places[j].tableLocation.name == this.reservateForm.value.selectedTable) {
                  let selectedPlaces = this.result.map(x => x.place);
                  //console.log(selectedPlaces);
                  if (selectedPlaces.includes(reservations[i].places[j].name)) {
                    //console.log("result includes: "+reservations[i].places[j].name);
                    //console.log(reservations[i]);
                    let from = LocalTime.parse(reservations[i].startHour.toString());
                    let end = LocalTime.parse(reservations[i].endHour.toString());
                    let selectedFrom = LocalTime.parse(this.reservateForm.value.from);
                    let selectedTill = LocalTime.parse(this.reservateForm.value.till);

                    // een reservatie eindigt na selectedFrom & begint voor selectedTill (reservatie > nieuwe)

                    reservatieBegintTillEindigtNaFrom = end.isAfter(selectedFrom) && from.isBefore(selectedTill) && from.isBefore(selectedFrom) && end.isAfter(selectedTill);
                    if (reservatieBegintTillEindigtNaFrom) {

                      this.notifier.notify('error',"een reservatie begint om "+from+" (voor uw begin tijdstip) & eindigt om "+end+" (na uw eind tijdstip)");
                      i = reservations.length+1;
                      break;

                    }

                    // een reservatie eindigt na selectedFrom & begint na selectedFrom (latere reservatie)
                    reservatieBegintNaFromEindigtNaTill = from.isAfter(selectedFrom) && end.isAfter(selectedTill) && from.isBefore(selectedTill) && end.isAfter(selectedFrom);
                    if (reservatieBegintNaFromEindigtNaTill) {
                      this.notifier.notify('error',"een reservatie begint om "+from+" (na uw begin tijdstip) & eindigt om "+end+" (na uw eind tijdstip)");
                      i = reservations.length+1;
                      break;
                    }

                    // een reservatie begint voor selectedFrom & eindigt na selectedFrom (vroegere reservatie)
                    reservatieBegintVoorFromEindigtVoorTill = from.isBefore(selectedFrom) && end.isAfter(selectedFrom) && from.isBefore(selectedTill) && end.isBefore(selectedTill);
                    if (reservatieBegintVoorFromEindigtVoorTill) {
                      this.notifier.notify('error',"een reservatie begint om: "+from+" (is voor uw begin tijdstip) & eindigt om: "+end+" (voor uw eind tijdstip)");
                      i = reservations.length+1;
                      break;
                    }

                    // een reservatie begint na selectedFrom & eindigt voor selectedTill (ertussen)
                    reservatieBegintNaFromEindigtVoorTill = from.isAfter(selectedFrom) && end.isBefore(selectedTill) && from.isBefore(selectedTill) && end.isAfter(selectedFrom);
                    if (reservatieBegintNaFromEindigtVoorTill) {
                      this.notifier.notify('error',"een reservatie begint om: "+from+" (is na uw begin tijdstip) & eindigt om: "+end+" (voor eind tijdstip)");
                      i = reservations.length+1;
                      break;
                    }

                    //console.log(reservatieBegintTillEindigtNaFrom+" "+reservatieBegintNaFromEindigtNaTill+" "+reservatieBegintVoorFromEindigtVoorTill+" "+reservatieBegintNaFromEindigtVoorTill);
                  }
                  matchingTableReservations.push(reservations[i]);
                  //console.log(matchingTableReservations);

                }

            }
          }
          //console.log(reservatieBegintTillEindigtNaFrom+" "+reservatieBegintNaFromEindigtNaTill+" "+reservatieBegintVoorFromEindigtVoorTill+" "+reservatieBegintNaFromEindigtVoorTill);
          if (!reservatieBegintTillEindigtNaFrom && !reservatieBegintNaFromEindigtNaTill && !reservatieBegintVoorFromEindigtVoorTill && !reservatieBegintNaFromEindigtVoorTill) {
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
          } else {
            this.submitted = false;
          }
    })


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
