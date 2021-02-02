import { Component, OnInit } from '@angular/core';
import { ScenarioService } from '../scenario.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Place } from '../../../shared/models/place.model';
import { TableLocation } from 'src/app/shared/models/table-location.model';
import { Location } from 'src/app/shared/models/location.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-scenario',
  templateUrl: './scenario.component.html',
  styleUrls: ['./scenario.component.scss']
})
export class ScenarioComponent implements OnInit {
  submitted: boolean = false;
  scenarios = ['Groen', 'Geel', 'Oranje', 'Rood', 'Zwart'];
  constructor(private fb: FormBuilder, private _scenarioService: ScenarioService, private router: Router) { }
  places: Place[];
  placesTotal: Place[];
  hideForm: boolean = true;
  code: String = "";

  ngOnInit(): void {
  }

  scenarioForm = new FormGroup(
    {
      scenarioControl: new FormControl(null, Validators.required)
    }
  );

  onSubmit(): void {
    this.submitted = true;
    this._scenarioService.getAllPlaces().subscribe(
      result => this.placesTotal = result);
    if (this.scenarioForm.controls['scenarioControl'].value == "Rood") {
      this.code = "Rood";
      this._scenarioService.setandgetPlacesCodeRood().subscribe(result =>
        this.places = result);
    }
    else if (this.scenarioForm.controls['scenarioControl'].value == "Groen") {
      this.code = "Groen";
      this._scenarioService.setandgetPlacesCodeGroen().subscribe(result =>
        this.places = result);
    }
    else if (this.scenarioForm.controls['scenarioControl'].value == "Geel") {
      this.code = "Geel";
      this._scenarioService.setandgetPlacesCodeGeel().subscribe(result =>
        this.places = result);
    }
    else if (this.scenarioForm.controls['scenarioControl'].value == "Oranje") {
      this.code = "Oranje";
      this._scenarioService.setandgetPlacesCodeOranje().subscribe(result =>
        this.places = result);
    }
    else if (this.scenarioForm.controls['scenarioControl'].value == "Zwart") {
      this.code = "Zwart";
      this._scenarioService.setandgetPlacesCodeZwart().subscribe(result =>
        this.places = result);
    }
    setTimeout(() => {
      this.hideForm = false;
    },1000);
  }


  btnReturn() {
    this.router.navigate([""]);
  }

  btnRefresh() {
    window.location.reload();
  }
}




