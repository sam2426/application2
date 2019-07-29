import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';
import { ToastrService } from '../../../../node_modules/ngx-toastr';
import { AppService } from '../../app.service';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: any;
  public password: any;

  constructor(public router: Router, public toastr: ToastrService, public appService: AppService, public cookie: CookieService) { }

  ngOnInit() {
  }

  public goToSignUp() {
    this.router.navigate(['/sign-up']);
  }

  public signinFunction: any = () => {
    if (!this.email) {
      this.toastr.warning('Enter Email!');
    } else if (!this.password) {
      this.toastr.warning('Enter Password!!');
    } else {
      let data = {
        email: this.email,
        password: this.password
      }
      console.log(data);
      this.appService.signinFunction(data).subscribe((apiResponse) => {
        if (apiResponse.status === 200) {
          // this.router.navigate([]);
          this.toastr.success('hurray!!');
          console.log(apiResponse);
          this.cookie.set('authToken', apiResponse.data.authToken);
          this.cookie.set('receiverId', apiResponse.data.userDetails.userId);
          this.cookie.set('receiverName', apiResponse.data.userDetails.firstName + ' ' + apiResponse.data.userDetails.lastName);
          this.appService.setUserInfoInLocalStorage(apiResponse.data.userDetails);
          this.router.navigate(['/chat']);
        } else if (apiResponse.status === 404){
          console.log("hello");
         // this.toastr.error(apiResponse.message);
        }
      },
        (error) => {
          console.log(error);
          // this.toastr.error(err);
        }
      )}
  }

}


