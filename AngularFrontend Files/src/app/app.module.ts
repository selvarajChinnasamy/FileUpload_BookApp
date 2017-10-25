import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserportalComponent } from './userportal/userportal.component';
import { DataService } from './data.service';
import{AuthguardGuard} from'./authguard.guard';
import { HttpModule } from '@angular/http';
import { ImageComponent } from './image/image.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    UserportalComponent,
    ImageComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ang4-seo-pre'}),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
  ],
  providers: [DataService,AuthguardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
