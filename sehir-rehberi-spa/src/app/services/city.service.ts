import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../models/city';
import { Photo } from '../models/photo';
import { AlertifyService } from './alertify.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  constructor(private httpClient: HttpClient,
    private alertifyService : AlertifyService,
    private router : Router
  ) {}
  path = 'http://localhost:5103/api/';

  getCities(): Observable<City[]> {
    return this.httpClient.get<City[]>(this.path + 'cities');
  }
  getCityById(cityId : number): Observable<City>{
    return this.httpClient.get<City>(this.path + "cities/detail/?id=" + cityId);
  }
  getCitiesByUserId(userId : number): Observable<City[]>{
    return this.httpClient.get<City[]>(this.path + "cities/getCitiesByUserId/?userId=" + userId);
  }
  getPhotosByCity(cityId : number) : Observable<Photo[]>{
    return this.httpClient.get<Photo[]>(this.path + "cities/photos/?cityId=" + cityId);
  }
  add(city : City){
    this.httpClient.post<City>(this.path + 'Cities/add', city).subscribe(data => {
      this.alertifyService.success("City successfully added.");
      this.router.navigateByUrl('/cityDetail/' + data["id"]);
    });
  }
}
