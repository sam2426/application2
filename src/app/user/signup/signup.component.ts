import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public firstName:any;
  public lastName:any;
  public mobile:any;
  public email:any;
  public password:any;
  public apiKey:any;

  constructor(
    public appService:AppService,
    public toastr:ToastrService,
    public router:Router
  ) { }

  ngOnInit() {
  }

  public goToSignIn : any=()=>{
    this.router.navigate(['/']);
  }

  public signUpFunction: any=()=> {
    if(!this.firstName){
      this.toastr.warning('enter first name');
    }else if(!this.lastName){
      this.toastr.warning('enter last name');
    }else if(!this.mobile){
      this.toastr.warning('enter mobile number');
    }else if(!this.password){
      this.toastr.warning('enter password');
    }else if(!this.email){
      this.toastr.warning('enter email');
    }else if(!this.apiKey){
      this.toastr.warning('enter apikey');
    }else{
      let data={
        firstName:this.firstName,
        lastName:this.lastName,
        mobile:this.mobile,
        email:this.email,
        password:this.password,
        apiKey:this.apiKey,
      }
      console.log(data);

      this.appService.signupFunction(data).subscribe((apiResponse)=>{ //apiResponse is catching the observable data.
        console.log(apiResponse);

        if (apiResponse.status===200){
          this.toastr.success('SignUp Successfully');

          this.goToSignIn();  // after signup redirecting to signin, ngs toaster still shows after 
                              //refreshing so no need for timeout.
        }
        else{
          this.toastr.error(apiResponse.message);
        }
      },
    (err)=>{
      this.toastr.error('Some error occured');
    });

    }

  }

}
