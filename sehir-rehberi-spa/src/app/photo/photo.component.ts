import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router'; 
import { Photo } from '../models/photo';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

  constructor(private authService : AuthService, private alertifyService : AlertifyService, private activatedRoute : ActivatedRoute) { }

  photos : Photo[] = [];
  uploader : FileUploader;
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;
  baseUrl = 'http://localhost:5103/api/';
  currentMain : Photo;
  currentCity : any;
  response:string;

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.currentCity = params['cityId']
    })
    this.initializeUploader();
  }

  initializeUploader(){
    // this.uploader = new FileUploader({
    //   url: this.baseUrl + 'cities/' + this.currentCity + '/photos',
    //   authToken : 'Bearer ' + this.authService.token,
    //   //authToken : 'Bearer ' + localStorage.getItem('token'),
    //   disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
    //   formatDataFunctionIsAsync: true,
    //   formatDataFunction: async (item:any) => {
    //     return new Promise( (resolve, reject) => {
    //       resolve({
    //         name: item._file.name,
    //         length: item._file.size,
    //         contentType: item._file.type,
    //         date: new Date()
    //       });
    //     });
    //   }
    // });
    // this.hasBaseDropZoneOver = false;
    // this.hasAnotherDropZoneOver = false;
    // this.response = '';
    // this.uploader.response.subscribe( res => this.response = res );

    this.uploader = new FileUploader({
      url : this.baseUrl + 'cities/' + this.currentCity + '/photos',
      authToken : 'Bearer ' + this.authService.token,
      //authToken : 'Bearer ' + this.authService.getDecodedToken(),
      //authToken : 'Bearer ' + localStorage.getItem('token'),
      //isHTML5 : true,
      allowedFileType : ['image'],
      autoUpload : false,
      removeAfterUpload : true,
      maxFileSize : 10 * 1024 * 1024
    });
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if(response){
        let res : Photo = JSON.parse(response);
        const photo = {
          id : res.id,
          url : res.url,
          dateAdded : res.dateAdded,
          Description : res.Description,
          isMain : res.isMain,
          cityId : res.cityId,
          PublicId : res.PublicId,
        }
        this.photos.push(photo);
      }
    }
  }
  fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
   fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

}
