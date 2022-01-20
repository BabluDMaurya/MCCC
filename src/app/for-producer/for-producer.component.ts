import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { Router } from '@angular/router';
import { Config } from 'src/app/_config/config';
import {HttpErrorResponse} from '@angular/common/http';
import { RegisterService } from '../_service/register.service';
import mobile_code from '../_files/mobile_code.json';

declare var $: any;

@Component({
  selector: 'app-for-producer',
  templateUrl: './for-producer.component.html',
  styleUrls: ['./for-producer.component.scss']
})
export class ForProducerComponent implements OnInit {
  public codeList:{id:number, name:string,mobileCountryCode:string}[] = mobile_code;
  selectedCode = '+91';
  @ViewChild('opendialog') opendialog:any;
  form: FormGroup | any;
  back_link :any =  "home";
  component_title : string = 'Producer Contact';
  submitted = false;
  btnVal :string = "Submit";

//button click function
  progressConfig(){
    let ProgressBtn :string = "Progress...";
    this.btnVal = ProgressBtn;
    $(".tbsub").prop('disabled', true).addClass('dis-class');
  }
  submitConfig(){    
    let btnVal : string = "Submit";
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
      name : ['',[Validators.required,Validators.pattern('^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$')]],
      email : ['',[
        Validators.required,
        // Validators.email,
        Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ]],
      phone : ['',[Validators.required]],
      country_code : ['+91',[Validators.required]],
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
        this.registerService.producer_contact(this.form.value).subscribe(
                data => {   
                  this.submitConfig();
                  this.submitted = false;                
                  this.opendialog.nativeElement.click();
                  this.form.reset();
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
