import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {Image} from '../product';
import { Http, RequestOptions, Headers, Response } from '@angular/http';  
import { Observable } from 'rxjs/Rx';  

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent  {
  public isUploadBtn: boolean = true;
  img:Image={
    name:'',
    id:0,
  }
products:Array<any>;
path:String='';
constructor(private _dataService: DataService, private http: Http) {
    
        this._dataService.getImageData()
        .subscribe(res => this.products = res);
}
deleteImages(name,id,j){
this.img.name=name;
this.img.id=id;
this._dataService.deleteImages(this.img);
this.products.splice(j,1);
}
fileChange(event) { 
  let fileList: FileList = event.target.files;  
  if (fileList.length > 0) {  
  let file: File = fileList[0];  
  let formData: FormData = new FormData();  
  formData.append('uploadFile', file, file.name);  
  let apiUrl1 = "http://52.15.138.37:9000/upload";  
  this.http.post(apiUrl1, formData)  
  .map(res =>this.path= res.json())
  .subscribe(res=>{
    console.log(this.path);
    this.products.push(this.path);
  })  
  }  
  } 
}
