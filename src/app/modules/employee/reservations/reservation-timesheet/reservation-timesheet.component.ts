import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [
      {name: 'Apple'},
      {name: 'Banana'},
      {name: 'Fruit loops'},
    ]
  }, {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [
          {name: 'Broccoli'},
          {name: 'Brussels sprouts'},
        ]
      }, {
        name: 'Orange',
        children: [
          {name: 'Pumpkins'},
          {name: 'Carrots'},
        ]
      },
    ]
  },
];

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

  private _transformer = (node: FoodNode, level: number) => {
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

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit(): void {
    let data: FoodNode[] = [
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
