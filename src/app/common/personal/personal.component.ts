import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Config } from 'src/app/_config/config';
import { RegisterService } from 'src/app/_service/register.service';
import { DashboardService } from 'src/app/_service/dashboard.service';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { AlertService } from '../../_service/alert.service';

import { DatePipe } from '@angular/common';

import { first } from 'rxjs/operators';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {
  form: FormGroup | any;
  back_link :any =  "signin-signup";
  component_title : string = 'Fill Your Details';
  submitted = false;
  submitt :any = 1;
  phoneTaken : boolean = false;
  castingId:any;
  resData:any;
  baseUrl :string = Config.Host+'backend2/';
  userdetail:any;
  age:any;
  loading = false;
  dataTrue = false;
  response: any;
  states: any;
  cities: any;
  scity:any;
  languages: any;
  responseData: any;
  cityVisible:boolean = true;
  language_ids :any;
  city_id:any;
  state_id:any;
  day: any;
  month: any;
  myYear: any;
  country_id:any;
  codeList: any = ['+91', '+101', '+21'];
  selectedCode = '+91';
  cityList : any;
  stateList : any; 
  selectedCountry = 'Select';  
  selectedState = 'Select';
  selectedCity = 'Select';
  dayList: any = ['1', '2', '3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'];
  monthList: any = ['1', '2', '3','4','5','6','7','8','9','10','11','12'];
  yearList: any = [];
  all_countries : any = [];
  constructor(private location:Location,
    public datepipe: DatePipe,
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService,
    private authenticationService: AuthenticationService,
    private registerService: RegisterService,
    private alertService: AlertService,) { }

  ngOnInit(): void {
    this.year(1971);
    this.userProfile();
    this.form = this.formBuilder.group({
      name : ['',[Validators.required,Validators.pattern('^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$')]],
      dob : [''],
      home_town : ['', Validators.required],
      hobbies: ['', Validators.required],
      language_id: ['',[Validators.required]],
      country_code:['',[Validators.required]],
      country:['',[Validators.required]],
      state:['',[Validators.required]],
      select_city:['',[Validators.required]],
      phone:['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      height:['',[Validators.required,Validators.pattern("^[0-9]+(.[0-9]{0,2})?$")]],
      day:['', [Validators.required]],     
      month:['', [Validators.required]],     
      year:['', [Validators.required]],      
     
    });

    
    this.registerService.languages().pipe(first()).subscribe(res => {
      this.response = res;
      if (this.response.data !== 'undefined' && this.response.data.length > 0) {
        this.dataTrue = true;
        this.languages = this.response.data;
      } else {
        this.dataTrue = false;
      }
    }, error => {
      this.alertService.error(error);
      this.loading = false;
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  } 
  back(): void {
    this.location.back();
   
  }
  year(startYear:number) {
    var currentYear = new Date().getFullYear(), years = [];
    startYear = startYear || 1971;  
    while ( startYear <= currentYear ) {
        this.yearList.push(startYear++);
    }   
    return this.yearList;
}
  submit(){
    this.submitted = true;
    if (this.form.invalid) {
      console.log('invalid');
      console.log(this.form);
      return;
    }else{
      this.loading = true;
      let DOB = this.datepipe.transform(this.form.value.year+'-'+this.form.value.month+'-'+this.form.value.day, 'yyyy-MM-dd');
      this.form.controls['dob'].setValue(DOB); 
      this.dashboardService.editUserDetail(this.form.value).pipe(first()).subscribe(res=>{
        this.loading = false;
        this.resData = res;
        if(this.resData.code == '500' && this.resData.status == 'false'){
          let message = this.resData.message;
          // this.notification.showError(message,'');
        }else{
          this.phoneTaken = false;
          this.age = this.resData.data.age; 
        this.userdetail = this.resData.data;
        let message = this.resData.message;
        // this.notification.showSuccess(message,'');
          sessionStorage.setItem('name',this.form.value.name);
          this.authenticationService.currentUserValue.userDetails.name = this.form.value.name;
          // sessionStorage.setItem('age',this.age);
          sessionStorage.setItem('dob',this.form.value.dob);
          sessionStorage.setItem('height',this.form.value.height);
          sessionStorage.setItem('phone',this.form.value.phone);
          // sessionStorage.setItem('language_id',this.userdetail.language_id);
          // sessionStorage.setItem('language',this.userdetail.language);
         
          sessionStorage.setItem('city',this.userdetail.city_name);
          sessionStorage.setItem('city_id',this.userdetail.city);
          sessionStorage.setItem('state_id',this.userdetail.state);
          // if(this.userdetail.home_town != null && this.userdetail.home_town != ''){
            sessionStorage.setItem('home_town',this.form.value.home_town);
          // }
          // if(this.userdetail.hobbies != null && this.userdetail.hobbies !=''){
            sessionStorage.setItem('hobbies',this.form.value.hobbies);
          // }     
          this.dashboardService.filter('applyed');
        }
      },error=>{
        console.log('error message' , error);
        this.loading = false;
      });
    }
  }
  userProfile(){
    this.dashboardService.userDetailsForPeofile()
        .subscribe(res => {
          this.resData = res; 
          console.log(this.resData);
          this.userdetail = this.resData.data.user_details;
          this.form.controls['name'].setValue(this.userdetail.name);
          this.form.controls['dob'].setValue(this.userdetail.dob);
          this.form.controls['height'].setValue(this.userdetail.height);
          this.form.controls['phone'].setValue(this.userdetail.phone);
          this.form.controls['language_id'].setValue(this.userdetail.language_id);
          this.form.controls['country'].setValue(101);
          this.form.controls['select_city'].setValue(this.userdetail.city_id);
          this.form.controls['state'].setValue(this.userdetail.state_id);
          this.form.controls['home_town'].setValue(this.userdetail.home_town);
          this.form.controls['hobbies'].setValue(this.userdetail.hobbies);
          var date = new Date(this.userdetail.dob);
          var year = date.getFullYear();
          var month = date.getMonth() +1;
          var day = date.getUTCDate();
      
          this.day = day;
          this.month = month;
          this.myYear = year;
          this.city_id = this.userdetail.city_id;
          this.state_id = this.userdetail.state_id;
          // this.city_id = this.userdetail.city_id;
          // sessionStorage.setItem('name',this.userdetail.name);
          // sessionStorage.setItem('dob',this.userdetail.dob);
          // sessionStorage.setItem('height',this.userdetail.height);
          // sessionStorage.setItem('phone',this.userdetail.phone);
          sessionStorage.setItem('language_id',this.userdetail.language_id);
          // sessionStorage.setItem('language',this.userdetail.language);
          if(this.userdetail.city_name != null && this.userdetail.city_name !=''){
            this.dataTrue = true;            
            this.cityVisible = true;
            this.registerService.cities({ state_id: this.userdetail.state_id }).subscribe(res => {
              this.response = res;
              if (this.response.data !== 'undefined' && this.response.data.length > 0) {
                this.dataTrue = true;
                this.cityVisible = false;
                this.cityList = this.response.data;
              } else {
                this.dataTrue = false;
              }
            }, error => {
              this.alertService.error(error);
              this.loading = false;
            });
          }
          sessionStorage.setItem('city',this.userdetail.city_name);
          // sessionStorage.setItem('city_id',this.userdetail.city_id);
          sessionStorage.setItem('state_id',this.userdetail.state_id);
          // if(this.userdetail.home_town != null && this.userdetail.home_town != '' && this.userdetail.home_town != 'null'){
          //   sessionStorage.setItem('home_town',this.userdetail.home_town);
          // }
          // if(this.userdetail.hobbies != null && this.userdetail.hobbies != ''){
          //   sessionStorage.setItem('hobbies',this.userdetail.hobbies);
          // }
              
    this.registerService.languages().pipe(first()).subscribe(res => {
      this.response = res;
      if (this.response.data !== 'undefined' && this.response.data.length > 0) {
        this.dataTrue = true;
        this.languages = this.response.data;
        let lanstr:any = sessionStorage.getItem('language_id');
        this.language_ids = lanstr.split(',');
      } else {
        this.dataTrue = false;
      }
    }, error => {
      this.alertService.error(error);
      this.loading = false;
    });

    this.registerService.states({country_id:101}).subscribe(res=>{
      this.response = res;
      if(this.response.data !== 'undefined' && this.response.data.length > 0){
        this.stateList = this.response.data;  
      }else{          
        this.dataTrue = false;
      }
    },error=>{
     
    });

        });
  }
  changeSuitState(e:any) {
    if(e.target.value > 0){      
      this.registerService.states({country_id:e.target.value}).subscribe(res=>{
        this.response = res;
        if(this.response.data !== 'undefined' && this.response.data.length > 0){
          this.stateList = this.response.data;  
        }else{          
          this.dataTrue = false;
        }
      },error=>{
       
      });
    }
  }
  changeSuit(e:any) {
    if(e.target.value > 0){      
      this.registerService.cities({state_id:e.target.value}).subscribe(res=>{
        this.response = res;
        if(this.response.data !== 'undefined' && this.response.data.length > 0){
          this.cityList = this.response.data;  
        }else{          
          this.dataTrue = false;
        }
      },error=>{
       
      });
    }
  }
}
