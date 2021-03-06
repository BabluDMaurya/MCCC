import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_service/authentication.service';
import { Config } from '../_config/config';
import { UserService } from '../_service/user.service';
import { HttpErrorResponse } from '@angular/common/http';
declare var $: any;
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  back_link: any = "signin";
  component_title: string = 'Forgot Password';
  form: FormGroup | any;
  submitted = false;
  responceData: any;
  btnVal :string = "Next";

//button click function
  progressConfig(){
    let ProgressBtn :string = "Progress...";
    this.btnVal = ProgressBtn;
    $(".tbsub").prop('disabled', true).addClass('dis-class');
  }
  submitConfig(){    
    let btnVal : string = "Next";
    this.btnVal = btnVal;
    $(".tbsub").prop('disabled', false).removeClass('dis-class');
  }
  constructor(private formBuilder: FormBuilder,
    private route: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email_or_mobile: ['', Validators.required],
      // email_or_mobile : ['',[Validators.required,Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]]
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      this.submitConfig();
      return;
    } else {
      this.progressConfig();
      this.userService.forgot_password(this.form.value).subscribe(res => {
        this.responceData = res;
        this.submitConfig();
        if (this.responceData.status == 'true' && this.responceData.token != '') {
          sessionStorage.setItem('rotp', this.responceData.otp);
          sessionStorage.setItem('email_or_mobile', this.form.value.email_or_mobile);
          this.route.navigate(['/reset-password', this.responceData.token]);
        } else {
          this.form.controls['email_or_mobile'].setErrors({ userNotExit: true });
        }
      }, (error) => {
        this.submitConfig();
        console.log("error", error);
        const validationErrors = error;
        // Object.keys(validationErrors).forEach(prop => {
        const formControl = this.form.get('email_or_mobile');
        if (formControl) {
          formControl.setErrors({
            serverError: validationErrors
          });
        }
        // });                                   
      });
    }
  }

}
