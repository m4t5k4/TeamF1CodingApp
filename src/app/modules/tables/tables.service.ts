import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TableLocation } from '../../shared/models/table-location.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class TablesService {

  constructor(private http: HttpClient) { }

  getTables() : Observable<TableLocation[]>
  {
    return this.http.get<TableLocation[]>(`${environment.baseUrl}/tables`);
  }
}
