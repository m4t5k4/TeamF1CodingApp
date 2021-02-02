import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Place } from '../../shared/models/place.model';
import { TablesService } from '../tables/tables.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class PlacesService {

  constructor(private http: HttpClient, private _tablesService: TablesService) {}


  private tables = this._tablesService.getTables()

  private place = new Place(0,"EmptyPlace",this.tables[0]);

  getPlaces() : Observable<Place[]>
  {
    return this.http.get<Place[]>(`${environment.baseUrl}places`);
  }

  addPlace(place: Place) 
  {
    return this.http.post<Place>(`${environment.baseUrl}places`, place);
  }

  updatePlace(place: Place) 
  {
    return this.http.put<Place>(`${environment.baseUrl}places`, place);
  }

  deletePlace(placeID: number) {
    return this.http.delete<Place>(`${environment.baseUrl}places/` + placeID);
  }

  setEditPlace(editPlace: Place){
    this.place = editPlace;
  }

  getPlace(){
    return this.place;
  }

}
