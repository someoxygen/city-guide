import { Routes } from '@angular/router';
import { CityComponent } from './city/city.component';
import { ValueComponent } from './value/value.component';
import { CityDetailComponent } from './city/city-detail/city-detail.component';
import { CityAddComponent } from './city/city-add/city-add.component';
import { RegisterComponent } from './register/register.component';
import { PhotoComponent } from './photo/photo.component';

export const appRoutes : Routes = [
  { path: 'city', component: CityComponent },
  { path: 'value', component: ValueComponent },
  { path: 'cityDetail/:cityId', component: CityDetailComponent },
  { path: 'cityadd/:operationName', component: CityAddComponent },
  { path: 'cityedit/:operationName', component: CityAddComponent },
  { path: 'addphoto/:cityId', component: PhotoComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: 'register', pathMatch: 'full' }
];
