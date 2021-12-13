import { Component, OnInit, ViewChild} from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router,ParamMap } from '@angular/router';
import { Config } from 'src/app/_config/config';
import { DashboardService } from 'src/app/_service/dashboard.service';
import { NotificationService } from 'src/app/_service/notification.service';

@Component({
  selector: 'app-apply-casting',
  templateUrl: './apply-casting.component.html',
  styleUrls: ['./apply-casting.component.scss']
})
export class ApplyCastingComponent implements OnInit {
  currentPlayingVideo: HTMLVideoElement | any;
  @ViewChild('closebutton') closebutton :any;
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
  constructor(
    private actRoute:ActivatedRoute,
    private route : Router,
    private dashboardService:DashboardService,
    private formBuilder:FormBuilder,
    private notification : NotificationService,
  ) {
    this.actRoute.paramMap.subscribe((params: ParamMap) => {                 
      this.castingId = params.get('id');
      this.back_link = "casting-inner/"+this.castingId;
    });
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
      oldfileSource : [''],
      oldvideofileSource : [''],
      saveAsDraft : [0],  
      casting_id:[this.castingId],
      name : [''],
      age : [''],
      height : [''],
      phone : [''],
      language : [''],
      city : [''],
      home_town : [''],
      hobbies : [''],
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
        // console.log("UserDetails:",this.userdetail);   
        
      });        
}
submit(){
    this.submitted = true;
  if (this.form.invalid) {
    return;
  }else{
    sessionStorage.removeItem('casting_title');
    sessionStorage.removeItem('casting_date');
    this.dashboardService.applyForCasting(this.form.value)     
        .subscribe(res => {
          this.resData = res;
          this.route.navigate(['/thank-you-casting/'+this.resData.data.application_id]);
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
