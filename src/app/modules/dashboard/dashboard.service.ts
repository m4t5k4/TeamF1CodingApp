import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Iot} from '../../shared/models/iot.model'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http : HttpClient) { }
  
  getIot(): Observable<Iot[]>
  {
    return this.http.get<Iot[]>(`${environment.baseUrl}iot`);
  }
}
