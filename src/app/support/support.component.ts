import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { Router } from '@angular/router';
import { Config } from 'src/app/_config/config';
import {HttpErrorResponse} from '@angular/common/http';
import { RegisterService } from '../_service/register.service';
@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {
  @ViewChild('opendialog') opendialog:any;
  form: FormGroup | any;
  back_link :any =  "home";
  component_title : string = 'Support';
  submitted = false;
  optionsList = ['What Whappen Next', 'App Not Working', 'What do casting agencies do', 'What types of Casting?'];


  constructor(
    private formBuilder: FormBuilder,
    private route : Router,
    private authenticationService: AuthenticationService,
    private registerService : RegisterService,
    ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      options : ['What Whappen Next',[Validators.required]],
      message : ['',[Validators.required]]
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
      
        this.registerService.support(this.form.value).subscribe(
                data => {   
                  this.submitted = false;                
                  this.opendialog.nativeElement.click();
                  this.ngOnInit();                  
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
