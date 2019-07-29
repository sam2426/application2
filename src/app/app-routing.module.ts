import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';
import { LoginComponent } from './user/login/login.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [];

@NgModule({
  imports: [
    ChatModule,
    UserModule,
    HttpClientModule, //Absence of HttpClientModule gives this error:=> Uncaught (in promise): NullInjectorError: StaticInjectorError(AppModule)[HttpClient]: 
  // StaticInjectorError(Platform: core)[HttpClient]: 
  // NullInjectorError: No provider for HttpClient!
    RouterModule.forRoot([  //i applied this routerModule function in app-routing.module
      {path:'login', component:LoginComponent,pathMatch:'full'},
      {path:'', redirectTo:'login', pathMatch:'full'},
      {path:'*', component:LoginComponent},
      {path:'**', component:LoginComponent},
    ]
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
