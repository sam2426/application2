import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [      //in the tutorial it was said to import browseranimation and toastr modules in all submodules. 
    CommonModule, //but it didn't use that in this module.. but it still worked..// now putting on day11
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule,
    RouterModule.forChild([
      {path:'sign-up', component:SignupComponent}
    ])
  ]
})
export class UserModule { }
