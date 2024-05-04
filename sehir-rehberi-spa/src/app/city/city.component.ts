import { Component, OnInit } from '@angular/core';
import { City } from '../models/city';
import { CityService } from '../services/city.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css'],
  providers: [CityService],
})
export class CityComponent implements OnInit {
  constructor(private cityService: CityService, private authService : AuthService) {}
  cities: City[] = [];
  userId = 0;
  operationName = 'edit';
  ngOnInit() {
    this.userId = this.authService.getCurrentUserId();
    if(this.userId != 0){
      this.cityService.getCitiesByUserId(this.userId).subscribe((data) => {
        this.cities = data;
      });
    }
  }
  
  deleteCity(cityId : number){
    this.cityService.deleteCityById(cityId).subscribe(result =>{
      if(result){
        this.cityService.getCitiesByUserId(this.userId).subscribe((data) => {
          this.cities = data;
        });
      }
    });
  }
}
