import { Component, OnInit } from '@angular/core';
import { TableLocation } from 'src/app/shared/models/table-location.model';
import { TablesService } from '../tables.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  
  tables: TableLocation[];

  constructor(private _tablesService : TablesService) { 
    this._tablesService.getTables().subscribe(
      result => {
      this.tables = result;
      }
      );
  }

  ngOnInit(): void {
  }

}
