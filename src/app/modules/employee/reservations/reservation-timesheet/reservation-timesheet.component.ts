import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { TablesService } from 'src/app/modules/tables/tables.service';
import { ReservationService } from '../../reservations/reservation.service';
import { PlacesService } from '../../../places/places.service';

interface Node {
  name: string;
  children?: Node[];
}

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-reservation-timesheet',
  templateUrl: './reservation-timesheet.component.html',
  styleUrls: ['./reservation-timesheet.component.scss']
})
export class ReservationTimesheetComponent implements OnInit {

  private _transformer = (node: Node, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    private _reservationService: ReservationService,
    private _tablesService: TablesService,
    private _placesService: PlacesService,
  ) {
    //this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit(): void {

    this._tablesService.getTables().subscribe(tables => {
      console.log(tables);
      var corda1 = tables.filter(table => table.location.name == 'Corda campus 1');
      var zoneA = corda1.filter(table => table.zone == 'A');
      console.log(zoneA);
    });

    this._reservationService.getReservations().subscribe(reservations => {
      console.log(reservations);
    });

    let data: Node[] = [
      {
        name: 'Zone A',
        children: [
          {name: 'Tafel 1'},
          {name: 'Tafel 2'},
          {name: 'Tafel 3'},
        ]
      }, {
        name: 'Zone B',
        children: [
          {
            name: 'Tafel 1',
            children: [
              {name: 'Plaats 1'},
              {name: 'Plaats 2'},
            ]
          }, {
            name: 'Tafel 2',
            children: [
              {name: 'Plaats 1'},
              {name: 'Plaats 2'},
            ]
          },
        ]
      },
    ];
    this.dataSource.data = data;
  }

}
