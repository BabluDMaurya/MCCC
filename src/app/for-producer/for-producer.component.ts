import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { Router } from '@angular/router';
import { Config } from 'src/app/_config/config';
import {HttpErrorResponse} from '@angular/common/http';
import { RegisterService } from '../_service/register.service';
import mobile_code from '../_files/mobile_code.json';
import countries from '../_files/countries.json';

declare var $: any;

@Component({
  selector: 'app-for-producer',
  templateUrl: './for-producer.component.html',
  styleUrls: ['./for-producer.component.scss']
})
export class ForProducerComponent implements OnInit {
  public countryList:{id:number, name:string, code:string}[] = countries;
  public codeList:{id:number, name:string,mobileCountryCode:string}[] = mobile_code;
  response: any;
  languages: any;
  selectedCode = '+91';
  @ViewChild('opendialog') opendialog:any;
  form: FormGroup | any;
  back_link :any =  "home";
  component_title : string = 'Producer Enquiry';
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
      production_house:['',[Validators.required]],
      designation:['',[Validators.required]],
      country_id:['',[Validators.required]],
      language_id : ['',[Validators.required]],
      film_log_line : [''],
      cast : ['',[Validators.required]], 
      phone : ['',[Validators.required]],
      country_code : ['+91',[Validators.required]],
      // message : ['',[Validators.required]]
    });
    this.registerService.languages().subscribe(res => {
      this.response = res;
      if (this.response.data !== 'undefined' && this.response.data.length > 0) {
        this.languages = this.response.data;
      }
    }, error => {
      
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
