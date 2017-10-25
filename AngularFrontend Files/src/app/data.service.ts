import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Product, Book, DelBook, Login, Image} from './product';

@Injectable()
export class DataService {
  
  private isUserLoggedIn;
  private username='';
  private password='';
  books:Array<any>;
  images:Array<any>;
  result1;
  constructor(private http:Http) { 
  	this.isUserLoggedIn = false;
  }

  setUserLoggedIn(prod: Login) {
  console.log(prod);
    this.username=prod.username;
    this.password=prod.password;
    this.isUserLoggedIn= true;
    console.log("userName"+this.username+"password"+this.password);
    return this.http.get("http://52.15.138.37:9000/api/checklogin/"+this.username+"/"+this.password) .map(result => this.result1 = result.json());
  }

  getUserLoggedIn() {
  	return this.isUserLoggedIn;
  }
  getUserName(){
    return this.username;
  }
  getUserbooks(){
    console.log("username="+this.username);
     return this.http.get("http://52.15.138.37:9000/api/getbooks/"+this.username)
     .map(result => this.books = result.json());
    }
  postDataadd(prod: Product) {
  console.log('Add  Product');
  console.log(prod);
  return this.http.get("http://52.15.138.37:9000/api/adduser/"+prod.name+"/"+prod.username+"/"+prod.password).subscribe();
  }
  postbookData(prod: Book){
    console.log('Add  Product');
    console.log(prod);
    return this.http.get("http://52.15.138.37:9000/api/addbook/"+prod.username+"/"+prod.name+"/"+prod.author)
    .map(result => this.books = result.json());
  }
  deletebook(prod:DelBook){
    return this.http.get("http://52.15.138.37:9000/api/deletebook/"+prod.name+"/"+prod.username).subscribe();
  }
  logout(){
    this.isUserLoggedIn= false;
  }
  getImageData(){
    return this.http.get("http://52.15.138.37:9000/api/getImages")
    .map(result => this.images = result.json());
  }
  deleteImages(img: Image){
    console.log(img);
    return this.http.get("http://52.15.138.37:9000/api/deleteImages/"+img.name+"/"+img.id).subscribe();
  }
}
