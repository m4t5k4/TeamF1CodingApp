import { Injectable } from '@angular/core';
import { Place } from '../../shared/models/place.model';
import { TablesService } from '../tables/tables.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Scenario } from '../../shared/models/scenario.model';
import { ScenarioComponent } from './scenario/scenario.component';

@Injectable({
  providedIn: 'root'
})
export class ScenarioService {

  constructor(private http: HttpClient) { }

  getAllPlaces(): Observable<Place[]> {
    return this.http.get<Place[]>(`${environment.baseUrl}places`);
  }

  setandgetPlacesCodeRood(): Observable<Place[]> {
    return this.http.get<Place[]>(`${environment.baseUrl}scenario-rood`);
  }

  setandgetPlacesCodeGroen(): Observable<Place[]> {
    return this.http.get<Place[]>(`${environment.baseUrl}scenario-groen`);
  }

  setandgetPlacesCodeGeel(): Observable<Place[]> {
    return this.http.get<Place[]>(`${environment.baseUrl}scenario-geel`);
  }

  setandgetPlacesCodeOranje(): Observable<Place[]> {
    return this.http.get<Place[]>(`${environment.baseUrl}scenario-oranje`);
  }

  setandgetPlacesCodeZwart(): Observable<Place[]> {
    return this.http.get<Place[]>(`${environment.baseUrl}scenario-zwart`);
  }

  getScenario(): Observable<Scenario[]> {
    return this.http.get<Scenario[]>(`${environment.baseUrl}scenarios`);
  }

  putScenario(scenario: Scenario)
  {
    return this.http.put<ScenarioComponent>(`${environment.baseUrl}scenarios`,scenario);
  }
}
