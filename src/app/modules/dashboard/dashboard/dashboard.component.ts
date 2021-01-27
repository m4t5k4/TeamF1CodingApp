import { Component, OnInit } from '@angular/core';
import { DashboardService} from '../dashboard.service';
import { Iot} from '../../../shared/models/iot.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  iots: Iot[];

  constructor(private _dashboardService : DashboardService) { 
    this._dashboardService.getIot().subscribe(
      result =>
      {
        this.iots = result;
      }
    );
  }

  ngOnInit(): void {
  }

  refresh(): void {
    window.location.reload();
  }

}
