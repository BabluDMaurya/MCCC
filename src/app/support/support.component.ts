import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { Router } from '@angular/router';
import { Config } from 'src/app/_config/config';
import {HttpErrorResponse} from '@angular/common/http';
import { RegisterService } from '../_service/register.service';
declare var $: any;
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
  optionsList = ['What Happen Next', 'App Not Working', 'What do casting agencies do', 'What types of Casting?'];

  btnVal :string = "Send";

//button click function
  progressConfig(){
    let ProgressBtn :string = "Progress...";
    this.btnVal = ProgressBtn;
    $(".tbsub").prop('disabled', true).addClass('dis-class');
  }
  submitConfig(){    
    let btnVal : string = "Send";
    this.btnVal = btnVal;
    $(".tbsub").prop('disabled', false).removeClass('dis-class');
  }
  constructor(
    private formBuilder: FormBuilder,
    private route : Router,
    private authenticationService: AuthenticationService,
    private registerService : RegisterService,
    ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      options : ['What Happen Next',[Validators.required]],
      message : ['',[Validators.required]]
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  } 

  submit(){
    this.submitted = true;
    if (this.form.invalid) {
      this.submitConfig();
      return;
    }else{        
      this.progressConfig();
        this.registerService.support(this.form.value).subscribe(
                data => {   
                  this.submitConfig();
                  this.submitted = false;                
                  this.opendialog.nativeElement.click();
                  this.ngOnInit();                  
                },
                (errorResponse: HttpErrorResponse) => {
                  this.submitConfig();
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
