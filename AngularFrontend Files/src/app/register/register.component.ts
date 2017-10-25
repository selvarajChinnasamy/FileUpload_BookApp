import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import {Product} from '../product';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  rForm: FormGroup;
  post:any;    
  addItem : Product = {
    name: 'admin',
    username: 'admin',
    password: 'admin',
};          
  titleAlert:string = 'This field is required';
  constructor(private fb: FormBuilder,private dataService:DataService) { 
    
        this.rForm = fb.group({
          'name' : [null, Validators.required],
          'username' : [null, Validators.required],
          'password' : [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(500)])],
          'validate' : ''
        });
    
      }
    

      ngOnInit() {
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
       this.addItem.name=post.name;
       this.addItem.username=post.username;
       this.addItem.password=post.password;
       this.dataService.postDataadd(this.addItem);
       this.rForm.reset();
      }


}
