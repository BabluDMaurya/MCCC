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
import countries from '../../_files/countries.json';
import { CommonService } from 'src/app/_service/common.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
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
  back_link :any =  "home";
  component_title : string = 'Your Profile';
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
  works:any = [];
  qualifications :any = [];
  socialLink :any = [];

//----------video-------------//
vform: FormGroup | any;
videoloading : boolean = true;
fileSizeaInKB : boolean = false;
url : any;
onevideoerror:boolean = false;
videoerror:any;
newVideoAdded:boolean = false;
videos : string[] = [];
videosaved : string[] = [];
format : any;
fileselected : boolean = false;  
videoPath = this.baseUrl+'public/uploads/UserVideos/';
videoArray:any;
videofileTypes = ['mp4'];  //acceptable file types
oldvideo:any;
currentPlayingVideo: HTMLVideoElement | any;
waitText :boolean = false;
progress: number = 0;
disabledv : boolean = false;
vresData:any;   
vdatas:any

//-----------image---------//
imgArray:any = [];
imagePath = this.baseUrl+'public/uploads/UserImages/';
iform: FormGroup | any;
threeimgerror:boolean = false;
imageerror:any;
uploading:boolean=false;
iresData:any;   
idatas:any

  constructor(private location:Location,
    public datepipe: DatePipe,
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService,
    private authenticationService: AuthenticationService,
    private registerService: RegisterService,
    private alertService: AlertService,
    private notification: NotificationService,
    private commonService:CommonService
    ) { }
  ngOnInit(): void {
    //--------profile-------------//
    this.year(1971);    
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
    this.userProfile();

    //----------video ------------//
    this.vform = this.formBuilder.group({
      oldvideofileSource:[''],
      newvideofileSource:[''],
    });    
    this.commonService.myVideo().subscribe(
      res => {
      this.vresData = res;   
      this.vdatas = this.vresData.data;
      this.videoArray = this.vdatas;
    },error=>{

    });

    //---------image----------//
    this.iform = this.formBuilder.group({
      oldfileSource : [''],
      newfileSource : [''], 
    });    
    this.commonService.myImages().subscribe(res => {
      this.iresData = res;   
      this.idatas = this.iresData.data;
      this.imgArray =  this.idatas;
      if(this.imgArray == 'No Record Found'){
        this.imgArray = [];
      }
      console.log(this.imgArray);
    },error=>{
    });   
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
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
    this.disabledv = true;
    if (this.form.invalid) {
      console.log('invalid');
      console.log(this.form);
      this.disabledv = false;
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
        }else{
          this.phoneTaken = false;
          this.age = this.resData.data.age; 
        this.userdetail = this.resData.data;
        let message = this.resData.message;
        new toastbox(this.toastSuccess, 2000);
            setTimeout(() => {
              $('#'+this.toastSuccess).removeClass('show');
          }, 2000);
          sessionStorage.setItem('name',this.form.value.name);
          this.authenticationService.currentUserValue.userDetails.name = this.form.value.name;
          sessionStorage.setItem('dob',this.form.value.dob);
          sessionStorage.setItem('height',this.form.value.height);
          sessionStorage.setItem('phone',this.form.value.phone);         
          sessionStorage.setItem('city',this.userdetail.city_name);
          sessionStorage.setItem('city_id',this.userdetail.city);
          sessionStorage.setItem('state_id',this.userdetail.state);
            sessionStorage.setItem('home_town',this.form.value.home_town);
            sessionStorage.setItem('hobbies',this.form.value.hobbies);
          this.dashboardService.filter('applyed');
          this.disabledv = false;
        }
      },error=>{
        console.log('error message' , error);
        this.loading = false;
        this.disabledv = false;
      });
    }
  }
  userProfile(){
    this.dashboardService.userDetailsForPeofile().subscribe(res => {
          this.resData = res;
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
          this.workExperiencesSetValue(this.userdetail.work_experience);  
          this.socialLinkSetValue(this.userdetail.socialLinks);
          this.qualificationSetValue(this.userdetail.qualification);
          
          var date = new Date(this.userdetail.dob);
          var year = date.getFullYear();
          var month = date.getMonth() +1;
          var day = date.getUTCDate();
          this.day = day;
          this.month = month;
          this.myYear = year;
          this.city_id = this.userdetail.city_id;
          this.state_id = this.userdetail.state_id;
          sessionStorage.setItem('language_id',this.userdetail.language_id);
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
          sessionStorage.setItem('state_id',this.userdetail.state_id);
              
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
  workExperiencesSetValue(item:any){
    this.experiences = this.form.get('work_experiences') as FormArray;
    for (let x of item) {     
      this.experiences.push(this.formBuilder.group({
        experience: x.work_experience
      }));
    }
    this.form.setControl('work_experiences', this.experiences);
  }
  socialLinkSetValue(item:any){
    this.experiences = this.form.get('social_links') as FormArray;
    for (let x of item) {     
      this.experiences.push(this.formBuilder.group({
        social_link: x.social_links
      }));
    }
    this.form.setControl('social_links', this.experiences);
  }
  qualificationSetValue(item:any){
    this.experiences = this.form.get('qualifications') as FormArray;
    for (let x of item) {     
      this.experiences.push(this.formBuilder.group({
        qualification: x.qualification
      }));
    }
    this.form.setControl('qualifications', this.experiences);
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
  // video methods
  onVideoFileChange(event: any){
    this.fileSizeaInKB = false;
    let newVideo :string [] = [];
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files && event.target.files[0];
      console.log("file:",file);
      var extension = event.target.files[0].name.split('.').pop().toLowerCase();
      
      var isSuccess = this.videofileTypes.indexOf(extension) > -1;
      if (isSuccess && file.type.indexOf('video') > -1) { 
        this.fileselected = true;   
      const fileSizeInKB = Math.round(file.size / 1024);
      if(fileSizeInKB > 102400){
        this.fileSizeaInKB = true;             
        this.notification.showInfo('Please Select file less then 100 MB.','');
      }else{
        var filesAmount = event.target.files.length;
        this.format = 'video';
        for (let i = 0; i < filesAmount; i++) {
          var reader = new FileReader();         
          reader.onload = (event: any) => {
            this.url = (<FileReader>event.target).result;
            newVideo.push(event.target.result);
            this.vform.patchValue({
              newvideofileSource: newVideo
            });  
            this.videosaved = newVideo;   
            this.videos = this.videosaved;
            this.newVideoAdded = true;      
            // this.newVideoAdded = false;           
          }
          reader.readAsDataURL(event.target.files[i]);
        }
      }
    }else{
      this.notification.showInfo('Please select mp4 video.','');
    }
    }
  }
  videoSubmit($event: MouseEvent){
    this.submitted = true;
    ($event.target as HTMLButtonElement).disabled = true;
    this.disabledv = true;
  if (this.vform.invalid) {
    ($event.target as HTMLButtonElement).disabled = false;
    this.disabledv = false;
    return;
  }else{     
    //video update section
    if(this.newVideoAdded){
         this.videoArray = null;
         this.patchOldVideoValues();
    }
    //video update section
    this.videoloading = false;
    if(this.videoArray!= null){
      this.oldvideo = 1;
    }else{
      this.oldvideo = 0;
    }
    let totalvideo = this.videos.length + this.oldvideo;

    if(totalvideo > 0){
      this.patchOldVideoValues();
      this.commonService.updateVideo(this.vform.value)
      .subscribe(
        (event: HttpEvent<any>) => {
        if (event.type == HttpEventType.UploadProgress) {
          let total:any = event.total;
          this.progress = Math.round((100 / total) * event.loaded);
          this.waitText = true;
          this.videoloading = true;
        } else if (event.type == HttpEventType.Response) {
          this.videoloading = true;
          this.progress = 0;
          this.waitText = false;
          new toastbox(this.toastSuccess, 2000);
          setTimeout(() => {
            $('#'+this.toastSuccess).removeClass('show');
        }, 2000); 
          this.resData = event;
          ($event.target as HTMLButtonElement).disabled = false;
          this.disabledv = false;
        }
      });
    }else{ 
      this.videoloading = true;
       if(totalvideo > 4){
        this.videoerror = 'Please Select Only One Video';
        this.onevideoerror = true;
        ($event.target as HTMLButtonElement).disabled = false;
        this.disabledv = false;
      }
    }
  }
  }
  patchOldVideoValues(){
    this.vform.patchValue({
      oldvideofileSource: this.videoArray,
    });
  }  
  //--------Image------------
  imageSubmit($event: MouseEvent){
    this.submitted = true;
    ($event.target as HTMLButtonElement).disabled = true;
    this.disabledv = true;
    if (this.iform.invalid) {
      ($event.target as HTMLButtonElement).disabled = false;
    this.disabledv = false;
      return;
    }else{
      this.loading = false;
      let totalimg = this.imgArray.length+this.cropimages.length;
       
      if(totalimg > 0 ){    
        console.log(this.cropimages);
        this.cropimages.forEach((imgObject: { imgBase64: any; }) => {
          console.log(imgObject);
          this.finalImageList.push(imgObject.imgBase64);
          this.ipatchValues();          
        })     
        this.patchOldImageValues();
        this.uploading = true;
        this.commonService.updateImages(this.iform.value).subscribe(
    //     data => {  
    //       this.loading = true;
    //       this.uploading = false;
    //       new toastbox(this.toastSuccess, 2000);
    //       setTimeout(() => {
    //         $('#'+this.toastSuccess).removeClass('show');
    //     }, 2000);
    //     this.ngOnInit();
    //     ($event.target as HTMLButtonElement).disabled = false;
    // this.disabledv = false;
    //     },
    //     error => {
    //       this.loading = true;
    //       this.notification.showError(error.error.message,true);
    //         this.uploading = false;
    //         ($event.target as HTMLButtonElement).disabled = false;
    // this.disabledv = false;
    //     }
    (event: HttpEvent<any>) => {
      if (event.type == HttpEventType.UploadProgress) {
        let total:any = event.total;
        this.progress = Math.round((100 / total) * event.loaded);
        this.waitText = true;
        this.videoloading = true;
      } else if (event.type == HttpEventType.Response) {
        this.videoloading = true;
        this.progress = 0;
        this.waitText = false;
        new toastbox(this.toastSuccess, 2000);
        setTimeout(() => {
          $('#'+this.toastSuccess).removeClass('show');
      }, 2000); 
        this.resData = event;
        ($event.target as HTMLButtonElement).disabled = false;
        this.disabledv = false;
      }
    }
        );
        
      }else{
        this.loading = false;
        console.log("image count :" + totalimg);
        
        if(totalimg > 3){
          this.imageerror = 'Please Select Only Three Photos';
        this.threeimgerror = true;
        ($event.target as HTMLButtonElement).disabled = false;
    this.disabledv = false;
        }          
      }
    }
  }
  removeSelectedImages(url:any){   
    console.log(url); 
    this.cropimages.splice(url, 1);
    // this.patchValues();
  }
  removePrimaryImage(element: number) {
    this.imgArray.forEach((value:any,index:any)=>{
        if(index==element) {
          this.imgArray.splice(index,1);
          this.commonService.deleteImages({image_id : value.id}).subscribe(
            data => {                   
            },
            error => {              
              });
        }
        this.patchOldImageValues();
    });   
  }
  patchOldImageValues(){
    this.iform.patchValue({
      oldfileSource: this.imgArray,
    });
  }
  ipatchValues(){
    this.iform.patchValue({
       newfileSource: this.finalImageList,
    });
  }
}
