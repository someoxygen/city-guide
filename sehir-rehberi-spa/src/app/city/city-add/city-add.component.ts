import { Component, OnInit } from '@angular/core';
import { CityService } from '../../services/city.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { City } from '../../models/city';
import { AlertifyService } from '../../services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-city-add',
  templateUrl: './city-add.component.html',
  styleUrls: ['./city-add.component.css'],
  providers:[CityService]
})
export class CityAddComponent implements OnInit {
  operationName = '';
  constructor(
    private cityService : CityService,
    private formBuilder : FormBuilder,
    private authService : AuthService,
    private userService : UserService,
    private activatedRoute : ActivatedRoute
  ) { }
  city : City = new City;
  cityForm : FormGroup;

  createCityForm(){
    this.cityForm = this.formBuilder.group(
      {name : ["", Validators.required],
      description : ["", Validators.required]});
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.operationName = params['operationName'];
    });
    this.createCityForm();
  }

  add(){
    if(this.cityForm.valid){
      this.city = Object.assign({},this.cityForm.value);
      this.city.userId = this.authService.getCurrentUserId();
      this.userService.getUserById(this.city.userId).subscribe(result => {
        this.city.User = result;
      });
      this.cityService.add(this.city);
    }
  }

  edit(){
    if(this.cityForm.valid){
      this.city = Object.assign({},this.cityForm.value);
      this.city.userId = this.authService.getCurrentUserId();
      this.userService.getUserById(this.city.userId).subscribe(result => {
        this.city.User = result;
      });
      this.cityService.edit(this.city);
    }
  }

}
