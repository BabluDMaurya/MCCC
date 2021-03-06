import { Component, OnInit,ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { Config } from 'src/app/_config/config';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/_service/user.service';
import { AlertService } from 'src/app/_service/alert.service';
import { Dimensions,ImageCroppedEvent, ImageTransform,base64ToFile} from 'ngx-image-cropper';
import { HttpEvent, HttpEventType } from '@angular/common/http';
declare var $: any;
@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.scss']
})
export class UploadImagesComponent implements OnInit {
  @ViewChild('openbutton') openbutton :any;
  @ViewChild('closebutton') closebutton :any;
  btnVal = "Continue";
  progress: number = 0;
  back_link :any =  "";
  component_title : string = 'Complete Your Profile';
  form: FormGroup | any;
  display = 'none';
  ulpoadedFiles: any = [];
  imgId: any=0;
  target: any = {};
  files: any = {};
  event: any = {};
  developer: any = {};
  frontEndLanguages: any = [];
  backEndLanguages: any = [];
  selectedBackEndItems: any = [];
  selectedFrontEndItems: any = [];
  imageChangedEvent: any = '';
  croppedImage: any = '';
  currentProcessingImg: any = 0;

  finalImageList: any = [];
  submitted = false;
  images : string[] = [];
  format : any;
  url : any;
  imgChangeEvt: any = '';
  cropImgPreview: any = '';  
  responseData :any;
  imagenotload : boolean = false;
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  cropedfile  :any;
  uploading:boolean = false;
  cropperbutton:boolean = false;
  cropperarea : boolean = true;
  fileTypes = ['png','jpg','jpeg'];  //acceptable file types
  constructor(
    private formBuilder: FormBuilder,
    private route : Router,
    private authenticationService: AuthenticationService,
    private userService : UserService,
    // private alertService : AlertService,
    // private location:Location,
    // private notification:NotificationService,
    ) {
     // redirect to home if already logged in
     if(sessionStorage.getItem('social_login') === 'true'){
        if(sessionStorage.getItem('profile_status') === 'true'){
          this.route.navigate([Config.AfterLogin]);
        }
     }else{
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
  //button click function
  progressConfig(){
    let ProgressBtn :string = "Progress...";
    this.btnVal = ProgressBtn;
    $(".tbsub").prop('disabled', true).addClass('dis-class');
  }
  submitConfig(){    
    let btnVal :string = "Continue";
    this.btnVal = btnVal;
    $(".tbsub").prop('disabled', false).removeClass('dis-class');
  }
  openModal() {
    this.openbutton.nativeElement.click();
  }

  onCloseHandled() {
    this.imageChangedEvent = null;
    this.display = 'none';
    this.closebutton.nativeElement.click();
  }
  fileChangeEvent(event: any): void {
    //Processing selected Images 
    for (var i = 0; i < event.target.files.length; i++) {
      var extension = event.target.files[i].name.split('.').pop().toLowerCase();
      var isSuccess = this.fileTypes.indexOf(extension) > -1;
      if (isSuccess) { 
        this.imageProcess(event, event.target.files[i]);
      }else{
        // this.notification.showInfo('Select image (jpg,jpeg,png) only.','');
      }
    }
  }

  imageProcess(event: any, file: any) {
    //Setting images in our required format
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      this.imgId = this.imgId + 1;
      if(this.ulpoadedFiles.length < 3){
        this.ulpoadedFiles.push({ imgId: this.imgId, imgBase64: reader.result, imgFile: file });
         
      }
    };
  }

  //get a Image using Image Id to crop
  //cropping process done here 
  cropImage(imgId: any) {
    this.currentProcessingImg = imgId;
    var imgObj = this.ulpoadedFiles.find((x: { imgId: any; }) => x.imgId === imgId);
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
    var imgObj = this.ulpoadedFiles.find((x: { imgId: any; }) => x.imgId === this.currentProcessingImg);
    imgObj.imgBase64 = this.croppedImage;
    this.onCloseHandled();
  }

  SaveAllImages() {
    // this.finalImageList = null;
    this.ulpoadedFiles.forEach((imgObject: { imgBase64: any; }) => {
      // console.log(imgObject);
      this.finalImageList.push(imgObject.imgBase64);
      this.patchValues();
      
    })
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
saveImage(){
  const file = this.cropedfile;
    var filesAmount = 1;
          for (let i = 0; i < filesAmount; i++) {
                  var reader = new FileReader();  
                  if(file.type.indexOf('image')> -1){
                    this.format = 'image';
                  } else if(file.type.indexOf('video')> -1){
                    // this.notification.showSuccess(' please select image.','');
                    this.format = 'video';
                  } 
                  reader.onload = (event:any) => {
                    this.url = (<FileReader>event.target).result;
                    if(this.images.length < 3){
                     this.images.push(event.target.result);    
                     this.patchValues(); 
                     if(this.images.length == 3){
                     this.cropperbutton = false;  
                     this.cropperarea = false; 
                     this.imageChangedEvent = '';
                     }                 
                    }
                  }  
                  reader.readAsDataURL(this.cropedfile);
          }
          this.imageChangedEvent = null;
        this.cropedfile = null;
}
  ngOnInit(): void {    
    this.form = this.formBuilder.group({
      files : ['',Validators.required],
      fileSource : ['',Validators.required]
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  
  // Patch form Values
  patchValues(){
    this.form.patchValue({
       fileSource: this.finalImageList
    });
  }
  // Remove Image
  removeImage(url:any){
    console.log(url);   
    // const index: number = this.ulpoadedFiles.indexOf(url);
    
    // this.ulpoadedFiles.splice(index, 1);
    console.log(this.ulpoadedFiles); 
    this.ulpoadedFiles = this.ulpoadedFiles.filter((id: any) => (id.imgId != url));
    // if(this.ulpoadedFiles.length < 3){
    //   this.cropperbutton = true;  
    //   this.cropperarea = true; 
    //   } 
    // this.patchValues();
  }

  submit(){
    this.uploading = true;
    this.submitted = true;
    console.log(this.form);
    if (this.form.invalid) {
      this.submitConfig();
      return;
    }else{      
      this.userService.upload_image(this.form.value).subscribe(
        (event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              this.progressConfig();
              console.log('Request has been made!');
              break;
            case HttpEventType.ResponseHeader:
              console.log('Response header has been received!');
              break;
            case HttpEventType.UploadProgress:
              let total:any = event.total;
              this.progress = Math.round(event.loaded / total * 100);
              console.log(`Uploaded! ${this.progress}%`);
              break;
            case HttpEventType.Response:
              this.submitConfig();
                this.uploading = false; 
                if (event.body.status == 'true') {
                  this.authenticationService.currentUserValue.percentage = event.body.percentage;
                  this.route.navigate(['/upload-video']);
                  
                } else {
                }
              setTimeout(() => {
                this.progress = 0;
              }, 1500);
          }
        }

      //   res => { 
      //   this.uploading = false;       
      //   this.responseData = res;
      //   if(this.responseData.status == 'true'){
      //       this.route.navigate(['/upload-video']);
      //   }else{
      //     // this.notification.showSuccess(' Somthing Wrong.','');
      //   }        
      // }
      );
    }
  }
  back(): void {
    this.authenticationService.logout();
    this.route.navigate(['/signin']);
  }

}
