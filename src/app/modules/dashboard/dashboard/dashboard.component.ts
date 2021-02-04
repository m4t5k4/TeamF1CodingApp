import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Iot } from '../../../shared/models/iot.model';
import { formatDate } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeNlbe from '@angular/common/locales/nl-BE';
import localeNlBeExtra from '@angular/common/locales/extra/nl-BE';

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
  public path = "";
  imageSrc = "https://project40ftp.azurewebsites.net/capture.jpg";

  constructor(private _dashboardService: DashboardService) {
    setInterval(() => {
      const date = new Date();
      this.updateClock(date);
    }, 1000)
    this._dashboardService.getIot().subscribe(
      result => {
        if (result.length >= 1 ){
          this.iots = result;
          this.iot_output = this.iots[this.iots.length - 1];
          this.date = new Date(this.iot_output.timeStamp);
          this.last_update = formatDate(this.date, 'dd/MM/yyyy HH:mm', 'en-UK');
        }
        else{
          this.last_update = "Geen data beschikbaar";
          this.iot_output = new Iot(0,null,this.date)
        }
      }
    );
  }

  ngOnInit(): void {
    this.imageSrc = `https://project40ftp.azurewebsites.net/capture.jpg?time=${Date.now()}`;
    setInterval(() => {
      this._dashboardService.getIot().subscribe(
        result => {
          if (result.length >= 1 ){
            this.iots = result;
            this.iot_output = this.iots[this.iots.length - 1];
            this.date = new Date(this.iot_output.timeStamp);
            this.last_update = formatDate(this.date, 'dd/MM/yyyy HH:mm', 'en-UK');
          }
          else{
            this.last_update = "Geen data beschikbaar";
            this.iot_output = new Iot(0,null,this.date)
          }
        }
      );
      this.imageSrc = `https://project40ftp.azurewebsites.net/capture.jpg?time=${Date.now()}`;
    }, 10000)
  }

  updateClock(date) {
    this.secHand.nativeElement.style.transform = 'rotate(' +
      date.getSeconds() * 6 + 'deg)';
    this.minHand.nativeElement.style.transform = 'rotate(' +
      date.getMinutes() * 6 + 'deg)';
    this.hrHand.nativeElement.style.transform = 'rotate(' +
      (date.getHours() * 30 + date.getMinutes() * 0.5) + 'deg)';
  }

  refresh() 
  {
    this.imageSrc = `https://project40ftp.azurewebsites.net/capture.jpg?time=${Date.now()}`;
  }
    
}
