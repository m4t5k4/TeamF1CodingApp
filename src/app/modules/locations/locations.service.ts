import { Injectable } from '@angular/core';
import { Location} from '../../shared/models/location.model'
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocationsComponent } from './locations/locations.component';

@Injectable()
export class LocationsService {

  constructor(private http: HttpClient) { }
  
  private location = new Location(0,"","","");

  getLocations() : Observable<Location[]>
  {
    return this.http.get<Location[]>(`${environment.baseUrl}locations`);
  }

  addLocation(location: Location)
  {
    return this.http.post<Location>(`${environment.baseUrl}locations`,location);
  }

  putLocation(location:Location)
  {
    return  this.http.put<Location>(`${environment.baseUrl}locations`, location);
  }

  deleteLocation(locationId: number)
  {
    return this.http.delete<Location>(`${environment.baseUrl}locations/` + locationId);
  }

  setLocation(location : Location)
  {
    this.location = location;
    console.log(this.location);
  }

  getLocation()
  {
    return this.location;
  }
}
