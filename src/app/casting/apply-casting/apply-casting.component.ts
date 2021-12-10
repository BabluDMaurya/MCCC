import { Component, OnInit } from '@angular/core';
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
  back_link :any;
  castingId:any;
  userdetail:any;
  age:any;
  resData:any;
  form: FormGroup | any;
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
        console.log("UserDetails:",this.userdetail);   
        
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
          this.route.navigate(['/thank-you-casting/'+this.resData.data.id]);
        });
  }
}
get f(): { [key: string]: AbstractControl } {
  return this.form.controls;
}
}
