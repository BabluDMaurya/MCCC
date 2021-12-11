import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { Config } from 'src/app/_config/config';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/_service/user.service';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.scss']
})
export class UploadVideoComponent implements OnInit {
  currentPlayingVideo: HTMLVideoElement | any;
  back_link :any =  "upload-images";
  component_title : string = 'Complete your Profile';
  form: FormGroup | any;
  submitted = false;
  images: string[] = [];
  format: any;
  url: any;
  responseData: any;
  uploading:boolean=false;
  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    // private alertService: AlertService
  ) {
    // redirect to home if already logged in
    // redirect to home if already logged in
    if (sessionStorage.getItem('social_login') === 'true') {
      if (sessionStorage.getItem('profile_status') === 'true') {
        this.route.navigate([Config.AfterLogin]);
      }
    } else {
      if (this.authenticationService.currentUserValue) {
        let Auth =  JSON.stringify(this.authenticationService.currentUserValue.status);
        if(Auth){
          if(sessionStorage.getItem('profile_status') === 'true'){
            this.route.navigate([Config.AfterLogin]);
          } 
        }else{
          this.route.navigate(['/signin']);
        }
      }else{
        this.route.navigate(['/signin']);
      }
    }
  }
  onPlayingVideo(event:any) {
    event.preventDefault();
    // play the first video that is chosen by the user
    if (this.currentPlayingVideo === undefined) {
      // console.log('video playing');
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
    this.form = this.formBuilder.group({
      files: ['', Validators.required],
      fileSource: ['', Validators.required]
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files && event.target.files[0];
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        if (file.type.indexOf('image') > -1) {
          this.format = 'image';
          // this.alertService.error('please select mp4 video', true);
        } else if (file.type.indexOf('video') > -1) {
          this.format = 'video';
        }
        reader.onload = (event: any) => {
          this.url = (<FileReader>event.target).result;
          this.images.push(event.target.result);
          this.form.patchValue({
            fileSource: this.images
          });
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
  submit() {
    this.uploading = true;
    this.submitted = true;
    if (this.form.invalid) {
      return;
    } else {
      this.userService.upload_video(this.form.value).pipe(first()).subscribe(res => {
        this.uploading = false;  
        this.responseData = res;
        if (this.responseData.status == 'true') {
          this.route.navigate(['/complete-profile']);
        } else {
          // this.alertService.success('File uploaded Successfully', true);
        }
      },error=>{
        this.uploading = false;
      });
    }
  }

}
