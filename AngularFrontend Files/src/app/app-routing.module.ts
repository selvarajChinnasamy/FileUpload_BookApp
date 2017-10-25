import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { UserportalComponent } from './userportal/userportal.component';
import { LoginComponent  } from './login/login.component';
import{AuthguardGuard} from'./authguard.guard';
import { ImageComponent } from './image/image.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    component: LoginComponent 
  },
  {
    path: 'user',
    canActivate:[AuthguardGuard],
    component: UserportalComponent 
  },
  {
    path: 'images',
    component: ImageComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
