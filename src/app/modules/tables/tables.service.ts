import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TableLocation } from '../../shared/models/table-location.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class TablesService {

  constructor(private http: HttpClient) {}

  private table = new TableLocation(0,"EmptyTable","EmptyZone");

  getTables() : Observable<TableLocation[]>
  {
    return this.http.get<TableLocation[]>(`${environment.baseUrl}tables`);
  }

  addTable(table: TableLocation) 
  {
    return this.http.post<TableLocation>(`${environment.baseUrl}tables`, table);
  }

  updateTable(table: TableLocation) 
  {
    return this.http.put<TableLocation>(`${environment.baseUrl}tables`, table);
  }

  deleteTable(tableID: number) {
    return this.http.delete<TableLocation>(`${environment.baseUrl}tables/` + tableID);
  }

  setEditTable(editTable: TableLocation){
    this.table = editTable;
  }

  getTable(){
    return this.table;
  }
}
