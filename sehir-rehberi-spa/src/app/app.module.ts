import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import { NavComponent } from './nav/nav.component';
import { CityComponent } from './city/city.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { CityDetailComponent } from './city/city-detail/city-detail.component';
import { GalleryModule } from 'ng-gallery';
import { CityAddComponent } from './city/city-add/city-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertifyService } from './services/alertify.service';
import { RegisterComponent } from './register/register.component';
import { NgxEditorModule } from 'ngx-editor';
import { FileUploadModule } from 'ng2-file-upload';
import { PhotoComponent } from './photo/photo.component';


@NgModule({
  declarations: [				
    AppComponent,
    ValueComponent,
    NavComponent,
    CityComponent,
    CityDetailComponent,
    CityAddComponent,
    RegisterComponent,
    PhotoComponent
   ],
  imports: [
    // NgxEditorModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GalleryModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    AlertifyService,
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
