import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Iot } from '../../../shared/models/iot.model';
import { formatDate } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeNlbe from '@angular/common/locales/nl-BE';
import localeNlBeExtra from '@angular/common/locales/extra/nl-BE';

import { interval } from 'rxjs';

registerLocaleData(localeNlbe, localeNlBeExtra);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild('hrHand', { static: false }) hrHand: ElementRef;
  @ViewChild('minHand', { static: false }) minHand: ElementRef;
  @ViewChild('secHand', { static: false }) secHand: ElementRef;

  iots: Iot[];
  public iot_output = new Iot(0, 4, new Date());
  public last_update = "";
  public date = new Date;

  constructor(private _dashboardService: DashboardService) {
    this._dashboardService.getIot().subscribe(
      result => {
        this.iots = result;
        this.iot_output = this.iots[this.iots.length - 1];
        this.date = new Date(this.iot_output.timeStamp);
        this.last_update = formatDate(this.date.setHours(this.date.getHours() - 1), 'dd/MM/yyyy HH:mm', 'en-UK');
      }
    );
  }

  ngOnInit(): void {
    setInterval(() => {
      const date = new Date();
      this.updateClock(date);
      this._dashboardService.getIot().subscribe(
        result => {
          this.iots = result;
          this.iot_output = this.iots[this.iots.length - 1];
          this.date = new Date(this.iot_output.timeStamp);
          this.last_update = formatDate(this.date, 'dd/MM/yyyy HH:mm', 'en-UK');
        }
      );
    }, 1000)
  }

  updateClock(date) {
    this.secHand.nativeElement.style.transform = 'rotate(' +
      date.getSeconds() * 6 + 'deg)';
    this.minHand.nativeElement.style.transform = 'rotate(' +
      date.getMinutes() * 6 + 'deg)';
    this.hrHand.nativeElement.style.transform = 'rotate(' +
      (date.getHours() * 30 + date.getMinutes() * 0.5) + 'deg)';
  }

  refresh(): void {
    window.location.reload();
  }

}
