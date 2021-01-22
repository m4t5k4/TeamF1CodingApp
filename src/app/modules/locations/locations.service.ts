import { Injectable } from '@angular/core';
import { Location} from '../../shared/models/location.model'
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocationsComponent } from './locations/locations.component';

@Injectable()
export class LocationsService {

  constructor(private http: HttpClient) { }

  getLocations() : Observable<Location[]>
  {
    return this.http.get<Location[]>(`${environment.baseUrl}/locations`);
  }

  addLocation(location: Location)
  {
    return this.http.post<Location>(`${environment.baseUrl}/locations`,location);
  }

  putLocation(locationId: number, location:Location)
  {
    return  this.http.put<Location>(`${environment.baseUrl}/locations/` + locationId,location);
  }

  deleteLocation(locationId: number)
  {
    return this.http.delete<Location>(`${environment.baseUrl}/locations/` + locationId);
  }
}
