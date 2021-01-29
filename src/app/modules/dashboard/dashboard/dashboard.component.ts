import { Component, OnInit } from '@angular/core';
import { DashboardService} from '../dashboard.service';
import { Iot} from '../../../shared/models/iot.model';
import {formatDate} from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeNlbe from '@angular/common/locales/nl-BE';
import localeNlBeExtra from '@angular/common/locales/extra/nl-BE';

import {interval} from 'rxjs';

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
  public date = new Date;

  constructor(private _dashboardService : DashboardService) { 
    this._dashboardService.getIot().subscribe(
      result =>
      {
        this.iots = result;
        this.iot_output = this.iots[this.iots.length -1];
        this.date = new Date(this.iot_output.timeStamp);
        this.last_update = formatDate(this.date.setHours(this.date.getHours() - 1), 'dd/MM/yyyy HH:mm','en-UK');
      }
    );
  }

  ngOnInit(): void {
  }

  refresh(): void {
    window.location.reload();
  }

}
