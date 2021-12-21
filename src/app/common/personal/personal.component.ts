import { Component, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Location } from '@angular/common';
import { Config } from 'src/app/_config/config';
import { RegisterService } from 'src/app/_service/register.service';
import { DashboardService } from 'src/app/_service/dashboard.service';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { AlertService } from '../../_service/alert.service';

import { DatePipe } from '@angular/common';

import { first } from 'rxjs/operators';
import { NotificationService } from 'src/app/_service/notification.service';
import { base64ToFile, Dimensions, ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import countries from '../../_files/countries.json';
declare var toastbox: any;
declare var $: any;
@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {
  public countryList:{id:number,name:string, code:string}[] = countries;
  workCount : number = 1;
  qualiCount : number = 1;
  socialCount : number = 1;
  form: FormGroup | any;
  experiences: FormArray | any;
  qualifs: FormArray | any;
  slinks: FormArray | any;
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
  fileTypes = ['png','jpg','jpeg'];
  imagenotload : boolean = false;
  imgId = 0;
  cropimages : any[] = [];
  currentProcessingImg: any = 0;
  imageChangedEvent: any = '';
  display = 'none';
  croppedImage: any = '';
  showCropper = false;
  finalImageList: any = [];
  toastSuccess:string = 'toast-18';




  genderList = ['Female', 'Male', 'Transgender', 'Genderqueer'];
  constructor(private location:Location,
    public datepipe: DatePipe,
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService,
    private authenticationService: AuthenticationService,
    private registerService: RegisterService,
    private alertService: AlertService,
    private notification: NotificationService) { }

  ngOnInit(): void {
    this.year(1971);
    this.userProfile();
    this.form = this.formBuilder.group({
      name : ['',[Validators.required,Validators.pattern('^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$')]],
      dob : [''],
      home_town : ['', Validators.required],
      hobbies: ['', Validators.required],
      language_id: ['',[Validators.required]],
      // country_code:['',[Validators.required]],
      gender:['',[Validators.required]],
      country:['',[Validators.required]],
      state:['',[Validators.required]],
      select_city:['',[Validators.required]],
      work_experiences: this.formBuilder.array([this.createExperience()]),
      qualifications: this.formBuilder.array([this.createQualification()]),
      social_links: this.formBuilder.array([this.createSocialLinks()]),
      // phone:['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      height:['',[Validators.required,Validators.pattern("^[0-9]+(.[0-9]{0,2})?$")]],
      day:['', [Validators.required]],     
      month:['', [Validators.required]],     
      year:['', [Validators.required]],   
      profilePicSource:[''] ,
     
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
  createExperience(): FormGroup {
    return this.formBuilder.group({
      experience: ['']
    });
  }
  addExperience(): void {
    if(this.workCount < 5){
      console.log(this.workCount)
        this.experiences = this.form.get('work_experiences') as FormArray;
        this.experiences.push(this.createExperience());
        this.workCount = this.workCount + 1;
    }
  }
  removeExperience(i: number) {
    this.experiences.removeAt(i);
    this.workCount = this.workCount - 1;
  }
  createQualification(): FormGroup {
    return this.formBuilder.group({
      qualification: ['']
    });
  }
  addQualification(): void {
    if(this.qualiCount < 5){
    this.qualifs = this.form.get('qualifications') as FormArray;
    this.qualifs.push(this.createQualification());
    this.qualiCount = this.qualiCount + 1;
    }
  }
  removeQualification(i: number) {
    this.qualiCount = this.qualiCount - 1;
    this.qualifs.removeAt(i);
  }

  createSocialLinks(): FormGroup {
    return this.formBuilder.group({
      social_link: ['']
    });
  }
  addSocialLinks(): void {
    if(this.socialCount < 5){
      this.slinks = this.form.get('social_links') as FormArray;
      this.slinks.push(this.createSocialLinks());
      this.socialCount = this.socialCount + 1;
    }
  }
  removeSocialLinks(i: number) {
    this.socialCount = this.socialCount - 1;
    this.slinks.removeAt(i);
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
      this.cropimages.forEach((imgObject: { imgBase64: any; }) => {
        console.log(imgObject);
        this.finalImageList.push(imgObject.imgBase64);
        this.patchValues();
        
      }) 
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
        new toastbox(this.toastSuccess, 2000);
            setTimeout(() => {
              $('#'+this.toastSuccess).removeClass('show');
          }, 2000); 
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
          this.form.controls['gender'].setValue(this.userdetail.gender);
          this.form.controls['language_id'].setValue(this.userdetail.language_id);
          this.form.controls['country'].setValue(this.userdetail.country_id);
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

  fileChangeEvent(event: any): void {
    // this.modalService.dismissAll('save');
    var extension = event.target.files[0].name.split('.').pop().toLowerCase();
      var isSuccess = this.fileTypes.indexOf(extension) > -1;
      if (isSuccess) { 
      this.imagenotload = false;
      // this.imageChangedEvent = event;
      }else{
        this.notification.showInfo('Select image (jpg,jpeg,png) only.','');
      }
    
      for (var i = 0; i < event.target.files.length; i++) {
        this.imageProcess(event, event.target.files[i]);
      
    }
  }
  imageProcess(event: any, file: any) {
    //Setting images in our required format
    this.cropimages = [];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      this.imgId = this.imgId + 1;
      // if(this.ulpoadedFiles.length < 3){
        this.cropimages.push({ imgId: this.imgId, imgBase64: reader.result, imgFile: file });
      // }
    };
    console.log(this.cropimages);
  }
  cropImage(imgId: any) {
    console.log('dd');
    this.currentProcessingImg = imgId;
    console.log(imgId);
    console.log(this.cropimages);
    var imgObj = this.cropimages.find((x: { imgId: any; }) => x.imgId === imgId);
    //created dummy event Object and set as imageChangedEvent so it will set cropper on this image 
    var event = {
      target: {
        files: [imgObj.imgFile]
      }
    };
    this.imageChangedEvent = event;
    this.openModal();
  }
  SaveCropedImage() {
    var imgObj = this.cropimages.find((x: { imgId: any; }) => x.imgId === this.currentProcessingImg);
    imgObj.imgBase64 = this.croppedImage;
    // this.finalImageList.push(imgObj.imgBase64);
    // this.patchValues();
    this.onCloseHandled();
  }
  patchValues(){
    // this.form.controls['newfileSource'].setValue(this.finalImageList);
    this.form.patchValue({
       profilePicSource: this.finalImageList,
    });
  }
  openModal() {
    this.display = 'block';
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    this.imagenotload = true;
    this.notification.showInfo('Load failed.','');
      console.log('Load failed');
  }
  imageLoaded() {
    this.imagenotload = false;
      this.showCropper = true;
      console.log('Image loaded');    
  }
  onCloseHandled() {
    this.imageChangedEvent = null;
    this.display = 'none';
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;    
    // this.cropedfile = base64ToFile(this.croppedImage);   
    
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
