import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { Router } from '@angular/router';
import { Config } from 'src/app/_config/config';
import {HttpErrorResponse} from '@angular/common/http';
@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {
  form: FormGroup | any;
  back_link :any =  "home";
  component_title : string = 'Support';
  submitted = false;
  optionsList = ['Female', 'Male', 'Transgender', 'Genderqueer'];
  constructor(
    private formBuilder: FormBuilder,
    private route : Router,
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
      options : ['',[Validators.required,Validators.pattern('^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$')]],
      message : ['']
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
      
        // this.registerService.register_new(this.form.value).subscribe(
        //         data => {     
                                      
        //           this.route.navigate(['/success']);
        //         },
        //         (errorResponse: HttpErrorResponse) => {
        //           const validationErrors = errorResponse.error.errors;
        //           Object.keys(validationErrors).forEach(prop => {
        //             const formControl = this.form.get(prop);
        //             if (formControl) {
        //               formControl.setErrors({
        //                 serverError: validationErrors[prop]
        //               });
        //             }
        //           });                                   
        //         });
    }
  }

}
