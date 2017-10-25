import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Book,DelBook} from '../product';

@Component({
  selector: 'app-userportal',
  templateUrl: './userportal.component.html',
  styleUrls: ['./userportal.component.css']
})
export class UserportalComponent implements OnInit {
  rForm: FormGroup;
  name;
  boos:any[]=[];
  addItem : Book = {
    username: '',
    name: 'admin',
    author: 'admin',
};  
deletItem:DelBook={
  username:'',
  name:''
};
  titleAlert:string = 'This field is required';
  constructor(private dataService:DataService,private fb: FormBuilder,private router:Router) {
     this.name=this.dataService.getUserName();
     this.dataService.getUserbooks().subscribe(res=>{
      this.boos=res;
      });

    this.rForm = fb.group({
      'name' : [null, Validators.required],
      'author' : [null, Validators.required],
      'validate' : ''
    });

   }
  ngOnInit() {
    if(this.name==='')
    {
      this.router.navigate(['/']);
    }
    this.rForm.get('validate').valueChanges.subscribe(

      (validate) => {

          if (validate == '1') {
              this.rForm.get('name').setValidators([Validators.required, Validators.minLength(3)]);
              this.titleAlert = 'You need to specify at least 3 characters';
          } else {
              this.rForm.get('name').setValidators(Validators.required);
          }
          this.rForm.get('name').updateValueAndValidity();

      });
  }
  addPost(post) {
    this.addItem.username=this.name;
    this.addItem.name=post.name;
    this.addItem.author=post.author;
    this.dataService.postbookData(this.addItem).subscribe(res=>{
      this.boos.push(res);
    });
    this.rForm.reset();
   }
   deletebook(bookname,i){
    this.deletItem.username=this.name;
    this.deletItem.name=bookname;
    this.dataService.deletebook(this.deletItem);
    this.boos.splice(i,1);
}
logout(){
  this.dataService.logout();
  this.router.navigate(['/']);
}
}

