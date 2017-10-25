import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import {Login} from '../product';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 login:Login={
   username:'',
   password:'',
 }
  status='';
  rForm: FormGroup;
  post:any;                    
  description:string = '';
  name:string = '';
  titleAlert:string = 'This field is required';
  constructor(private router:Router, private fb: FormBuilder, private dataService:DataService) { 
    
        this.rForm = fb.group({
          'name' : [null, Validators.required],
          'password' : [null, Validators.required],
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
        console.log(post);
        this.login.username=post.name;
        this.login.password=post.password;
       this.dataService.setUserLoggedIn(this.login).subscribe(res=>{
         this.status=res.status;
         console.log("login");
         if(this.status ==='success')
         {
          console.log(this.status);
          this.router.navigate(['user']);
         }
       }); 
       this.rForm.reset();
      }

}
