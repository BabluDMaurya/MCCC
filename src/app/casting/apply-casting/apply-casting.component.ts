import { Component, OnInit, ViewChild} from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router,ParamMap } from '@angular/router';
import { Config } from 'src/app/_config/config';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { DashboardService } from 'src/app/_service/dashboard.service';
import { NotificationService } from 'src/app/_service/notification.service';
import { User } from '../../_models/user';
declare var $: any;
@Component({
  selector: 'app-apply-casting',
  templateUrl: './apply-casting.component.html',
  styleUrls: ['./apply-casting.component.scss']
})
export class ApplyCastingComponent implements OnInit {
  currentPlayingVideo: HTMLVideoElement | any;
  @ViewChild('closebutton') closebutton :any;
  @ViewChild ('openmediadialogbox') openmediadialogbox:any;
  @ViewChild ('openmodal') openmodal:any;
  back_link :any;
  castingId:any;
  userdetail:any;
  age:any;
  resData:any;
  form: FormGroup | any;
  hobbiesForm: FormGroup | any;
  casting_title:any;
  casting_date:any;
  baseUrl :string = Config.Host+'backend2/';
  imagePath = this.baseUrl+'public/uploads/UserImages/';
  videoPath = this.baseUrl+'public/uploads/UserVideos/';
  uploadedVideo:any;
  ShowUploadedVideo : boolean = false;
  uploadedImages :any;
  ShowUploadedImages :boolean = false;
  submitted = false;
  mediaerrortitle:any;
  mediaerrordescription:any;

  name:any;
  height:any;
  city_name:any;
  home_town:any;
  language:any;
  phone:any;
  hobbies:any;
  currentUser: User;
  btnVal :string = "Submit";
  constructor(
    private actRoute:ActivatedRoute,
    private route : Router,
    private dashboardService:DashboardService,
    private formBuilder:FormBuilder,
    private notification : NotificationService,
    private authenticationService: AuthenticationService,
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
    this.name=this.currentUser.userDetails.name;
    this.actRoute.paramMap.subscribe((params: ParamMap) => {                 
      this.castingId = params.get('id');
      this.back_link = "casting-inner/"+this.castingId;
    });
   }
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
   onPlayingVideo(event:any) {
    event.preventDefault();
    // play the first video that is chosen by the user
    if (this.currentPlayingVideo === undefined) {
      console.log('video playing');
        this.currentPlayingVideo = event.target;
        this.currentPlayingVideo.play();
    } else {
    // if the user plays a new video, pause the last one and play the new one
        if (event.target !== this.currentPlayingVideo) {         
            this.currentPlayingVideo.pause();
            // this.currentPlayingVideo = event.target;
            // this.currentPlayingVideo.play();
        }
    }
}
  ngOnInit(): void {
    this.casting_title = sessionStorage.getItem('casting_title');
    this.casting_date = sessionStorage.getItem('casting_date');
    this.form = this.formBuilder.group({    
      oldfileSource : ['',Validators.required],
      oldvideofileSource : ['',Validators.required],
      saveAsDraft : [0],  
      casting_id:[this.castingId],
      name : ['',Validators.required],
      age : ['',Validators.required],
      height : ['',Validators.required],
      phone : ['',Validators.required],
      language : ['',Validators.required],
      city : ['',Validators.required],
      home_town : ['',Validators.required],
      hobbies : ['',Validators.required],
    });

    this.hobbiesForm = this.formBuilder.group({
      hobbies : ['',[Validators.required,Validators.maxLength]],
      profile_id : ['',Validators.required]
    });
    this.userDetails();
  }
  userDetails(){
    this.dashboardService.userDetails({casting_id:this.castingId})
      .subscribe(res => {
        this.resData = res;       
        this.age = this.resData.data.age; 
        this.userdetail = this.resData.data.user_details; 
        this.name = this.userdetail.name;
        this.height = this.userdetail.height;
        this.phone = this.userdetail.phone;
        this.language = this.userdetail.language;
        this.city_name = this.userdetail.city_name;
        this.home_town = this.userdetail.home_town; 
        this.hobbies = this.userdetail.hobbies;
        if(this.userdetail.images.length > 0){
          this.uploadedImages = this.userdetail.images;
          this.ShowUploadedImages = true;
        }else{
          this.ShowUploadedImages = false;
        }    
        if(this.userdetail.videos.length > 0){
          this.uploadedVideo = this.userdetail.videos[0].videos;
          this.ShowUploadedVideo = true;
        }else{
          this.ShowUploadedVideo = false;
        }   
        this.form.controls['name'].setValue(this.userdetail.name);
        this.form.controls['age'].setValue(this.age);
        this.form.controls['city'].setValue(this.userdetail.city_name);
        this.form.controls['height'].setValue(this.userdetail.height);
        this.form.controls['hobbies'].setValue(this.userdetail.hobbies);
        this.form.controls['home_town'].setValue(this.userdetail.home_town);
        this.form.controls['language'].setValue(this.userdetail.language);
        this.form.controls['phone'].setValue(this.userdetail.phone);
        this.form.controls['oldfileSource'].setValue(this.userdetail.images);
        this.form.controls['oldvideofileSource'].setValue(this.userdetail.videos);
        if(this.userdetail.hobbies != 'Enter'){
          this.hobbiesForm.controls['hobbies'].setValue(this.userdetail.hobbies);
        }
      });        
}
completeProfile(){
  this.closebutton.nativeElement.click();
  this.route.navigate(['/personal']);
  // this.route.navigate(['/personal/apply-casting/'+this.castingId]);
}
submit(){
    this.submitted = true;
  if (this.form.invalid) {    
    this.openmodal.nativeElement.click();
    // let photoError:any = this.f.oldfileSource.errors;  
    // let videoError:any = this.f.oldvideofileSource.errors;  
    // if(photoError.required == true){
    //   this.mediaerrortitle = 'Add Your Photos';
    //   this.mediaerrordescription = 'To change Photos go to profile and update Photos from there';
    //   this.openmediadialogbox.nativeElement.click();
    // }else if(videoError.required == true){
    //   this.mediaerrortitle = 'Add Your Video';
    //   this.mediaerrordescription = 'To change video go to profile and update video from there';
    //   this.openmediadialogbox.nativeElement.click();
    // }
    this.submitConfig();
    return;
  }else{
    this.progressConfig();
    sessionStorage.removeItem('casting_title');
    sessionStorage.removeItem('casting_date');
    this.dashboardService.applyForCasting(this.form.value)     
        .subscribe(res => {
          this.submitConfig();
          this.resData = res;
          this.route.navigate(['/thank-you-casting/'+this.resData.data.application_id]);
        },error=>{
          this.submitConfig()
        });
  }
}
get f(): { [key: string]: AbstractControl } {
  return this.form.controls;
}
get h(): { [key: string]: AbstractControl } {
  return this.hobbiesForm.controls;
}
updateHobbies(event: any){
  this.submitted = true;
  console.log(this.hobbiesForm.value);
  this.hobbiesForm.controls['profile_id'].setValue(this.userdetail.user_profile_id);
  if (this.hobbiesForm.invalid) {
    return;
  }else{    
    console.log(this.hobbiesForm.value);
    this.dashboardService.updateHobbies(this.hobbiesForm.value)     
        .subscribe(res => {
          this.resData = res;
          this.form.controls['hobbies'].setValue(this.resData.data.hobbies);  
          this.userdetail.hobbies = this.resData.data.hobbies;
          this.hobbiesForm.reset(this.hobbiesForm.value.hobbies);
          this.closebutton.nativeElement.click();
        });
  }
}
}
