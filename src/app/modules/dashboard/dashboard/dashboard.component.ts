import { Component, OnInit } from '@angular/core';
import { DashboardService} from '../dashboard.service';
import { Iot} from '../../../shared/models/iot.model';
import {formatDate} from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeNlbe from '@angular/common/locales/nl-BE';
import localeNlBeExtra from '@angular/common/locales/extra/nl-BE';

registerLocaleData(localeNlbe,localeNlBeExtra);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  iots: Iot[];
  public iot_output = new Iot(0,4, new Date());
  public last_update = "";

  constructor(private _dashboardService : DashboardService) { 
    this._dashboardService.getIot().subscribe(
      result =>
      {
        this.iots = result;
        this.iot_output = this.iots[this.iots.length -1];
        this.last_update = formatDate(this.iots[this.iots.length -1].timeStamp, 'dd/MM/yyyy hh:mm','nl-BE');
      }
    );
  }

  ngOnInit(): void {
  }

  refresh(): void {
    window.location.reload();
  }

}
