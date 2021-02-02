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
  constructor(private fb: FormBuilder, private _scenarioService: ScenarioService) { }
  places : Place[];

  ngOnInit(): void {
  }

  scenarioForm = new FormGroup(
    {
      scenarioControl: new FormControl(null, Validators.required)
    }
  );

  onSubmit() : void{
    let i = 0;
    this.submitted = true;
    if (this.scenarioForm.controls['scenarioControl'].value == "Rood") {
      console.log("code rood")
      this._scenarioService.setandgetPlacesCodeRood().subscribe(result=>
        this.places = result);
    }
    else if (this.scenarioForm.controls['scenarioControl'].value == "Groen"){
      console.log("code groen")
      this._scenarioService.setandgetPlacesCodeGroen().subscribe(result=>
        this.places = result);
    }
    else if (this.scenarioForm.controls['scenarioControl'].value == "Geel"){
      console.log("code geel")
      this._scenarioService.setandgetPlacesCodeGeel().subscribe(result=>
        this.places = result);
    }
    else if (this.scenarioForm.controls['scenarioControl'].value == "Oranje"){
      console.log("code oranje")
      this._scenarioService.setandgetPlacesCodeOranje().subscribe(result=>
        this.places = result);
    }
    else if (this.scenarioForm.controls['scenarioControl'].value == "Zwart"){
      console.log("code zwart")
      this._scenarioService.setandgetPlacesCodeZwart().subscribe(result=>
        this.places = result);
    }
  }
} 

