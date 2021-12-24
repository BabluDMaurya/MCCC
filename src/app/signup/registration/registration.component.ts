import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import { Config } from 'src/app/_config/config';
import { DatePipe } from '@angular/common';
import{ AgeBetween13To54 } from "../../_helpers/custom-DOB.validator";
import { RegisterService } from 'src/app/_service/register.service';
import { AuthenticationService } from 'src/app/_service/authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup | any;
  back_link :any =  "signin-signup";
  component_title : string = 'Fill Your Details';
  submitted = false;
  submitt :any = 1;
  constructor(
    public datepipe: DatePipe,
    private formBuilder: FormBuilder,
    private route : Router,
    private registerService : RegisterService,
    private authenticationService: AuthenticationService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      let Auth =  JSON.stringify(this.authenticationService.currentUserValue.status);
       if(Auth){
           this.route.navigate([Config.AfterLogin]);
       }
     }
   }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name : ['',[Validators.required,Validators.pattern('^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$')]],
      email : ['',[
        Validators.required,
        // Validators.email,
        Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ]],
      // dob : [''],
      // home_town : ['', Validators.required]
    });
    
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  } 
  submit(){
    this.submitted = true;
    if (this.form.invalid) {      
      return;
    }else{ 
      // let DOB = this.datepipe.transform(this.form.value.year+'-'+this.form.value.month+'-'+this.form.value.day, 'yyyy-MM-dd');
      // this.form.controls['dob'].setValue(DOB);      
        this.registerService.check_email_mobile(this.form.value).subscribe(
                (data:any) => {
                  sessionStorage.setItem('otp',data.otp);
                  sessionStorage.setItem('name',data.userDetails.name);
                  sessionStorage.setItem('email',data.userDetails.email);
                  sessionStorage.setItem('phone',data.userDetails.phone);
                  sessionStorage.setItem('country_code',data.userDetails.country_code);
                  // sessionStorage.setItem('dob',data.userDetails.dob);
                  // sessionStorage.setItem('gender',data.userDetails.gender);
                  // sessionStorage.setItem('country_id',data.userDetails.country_id);
                  // sessionStorage.setItem('state_id',data.userDetails.state_id);
                  // sessionStorage.setItem('city_id',data.userDetails.city_id);
                  // sessionStorage.setItem('home_town',data.userDetails.home_town);
                  this.route.navigate(['/create-password']);
                },
                (errorResponse: HttpErrorResponse) => {                  
                  const validationErrors = errorResponse.error.errors;
                  Object.keys(validationErrors).forEach(prop => {
                    const formControl = this.form.get(prop);
                    if (formControl) {
                      formControl.setErrors({
                        serverError: validationErrors[prop]
                      });
                    }
                  });                                   
                });
    }
  }

}
