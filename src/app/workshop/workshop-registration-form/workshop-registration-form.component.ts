import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap,Router } from '@angular/router';
import { Config } from '../../_config/config';
import {WorkshopService} from '../../_service/workshop.service';
import { Location } from '@angular/common';
import { AuthenticationService } from '../../_service/authentication.service';
import { DashboardService } from '../../_service/dashboard.service';
import { User } from '../../_models/user';
import { NotificationService } from 'src/app/_service/notification.service';
import { AbstractControl, FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
declare var toastbox: any;
declare var $: any;

@Component({
  selector: 'app-workshop-registration-form',
  templateUrl: './workshop-registration-form.component.html',
  styleUrls: ['./workshop-registration-form.component.scss']
})
export class WorkshopRegistrationFormComponent implements OnInit {
  @ViewChild('closebutton') closebutton :any;
  @ViewChild ('openmediadialogbox') openmediadialogbox:any;
  @ViewChild ('openmodal') openmodal:any;
  back_link :any;
  castingId:any;
  pageName = "Workshop";
  fileTypes = ['png','jpg','jpeg'];  //acceptable file types
  id: any;
  type:any;
  bgImage: any;
  workshopData: any;
  eventData: any;
  currentUser: User;
  images: string[] = [];
  images2: string[] = [];
  userId: any;
  userData: any;
  url: any;
  form: FormGroup | any;
  loading: boolean = false;
  submitted = false;
  aadharfileChoosen : boolean = false;
  aadharfileName : any;
  panfileChoosen : boolean = false;
  panfileName : any;
  toastSuccess:string = 'toast-18';
  btnVal :string = "Submit";
  userdetail : any;
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
  constructor(private location: Location,private workshopService: WorkshopService,
    private route:Router,
    private actRoute:ActivatedRoute,
    private authenticationService: AuthenticationService,
    private dashboardService: DashboardService,
    private formBuilder:FormBuilder,
    private notification:NotificationService) { 
      this.currentUser = this.authenticationService.currentUserValue;
      this.userId = this.currentUser.userDetails.id;
      console.log(this.currentUser);
    }

  ngOnInit(): void {

    this.actRoute.paramMap.subscribe((params: ParamMap) => {                 
      this.id = params.get('id');
      this.type = params.get('type');
      console.log(this.type);
    });

    this.dashboardService.userDetails({casting_id:''}).subscribe(
      data => { 
        this.userData = data;
        this.userdetail = this.userData.data.user_details;        
        this.form.controls['age'].setValue(this.userData.data.age);
        this.form.controls['city'].setValue(this.userdetail.city_name);
        this.form.controls['sex'].setValue(this.userdetail.gender);
        this.form.controls['dob'].setValue(this.userdetail.dob);
        this.form.controls['phone'].setValue(this.userdetail.phone);
        if(this.userdetail.phone !=null && this.userdetail.phone !=''){
        this.currentUser.userDetails.phone = this.userdetail.phone;
        }
        console.log("User Data:",data);
    });

    if(this.type == 1){
      this.dashboardService.innerEvents({'id': this.id}).subscribe(
        data => { 
          this.eventData = data;
          this.workshopData = this.eventData.data;
          console.log(this.workshopData);
      });
    }

    if(this.type == 2){
      this.workshopService.get_each_workshop_data({'id': this.id}).subscribe(
        data => { 
          this.workshopData = data.data[0];
          console.log(this.workshopData);
      });
    }

    this.form = this.formBuilder.group({
      
      sos_phone : [null,Validators.required],
      edu_details: [null,Validators.required],
      address: [null,Validators.required],
      aadhar_file: [null,Validators.required],
      pan_file: [null,Validators.required],
      about_workshop: [null,Validators.required],
      fileSource : [''],
      aadharfileSource : [''],
      workshop_id:[this.id,''],

     
      age : ['',Validators.required],
      sex : ['',Validators.required],
      phone : ['',Validators.required],
      dob : ['',Validators.required],
      city : ['',Validators.required],
     
    });
    this.loading = true;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  } 
  completeProfile(){
    this.closebutton.nativeElement.click();
    this.route.navigate(['/personal']);
    // this.route.navigate(['/personal/apply-casting/'+this.castingId]);
  }
  submit(){    
    this.submitted = true;
    if (this.form.invalid) {
      console.log(this.form);
      if((this.userdetail.phone == null || this.userdetail.phone !='') || (this.userData.data.age == null || this.userData.data.age ==0) || (this.userdetail.gender == null || this.userdetail.gender == '') || (this.userdetail.city_name == null || this.userdetail.city_name == '') || (this.userdetail.dob == null || this.userdetail.dob == '')){
        this.openmodal.nativeElement.click();
      }
      this.submitConfig();
      return;
    }else{
      this.progressConfig();
      this.loading = false;
      var data = this.form.value;
      console.log(this.form.value);
      if(this.type == 2){
          this.workshopService.user_apply_for_workshop(data).subscribe(
            data => { 
              this.dashboardService.filter('applyed');
              console.log(data);
              this.loading = true;
              this.submitConfig();
              this.route.navigate(['/thank-you-workshop/']);
          });
      }
      if(this.type == 1){
        
        this.dashboardService.user_apply_for_events(data).subscribe(
          data => { 
            this.dashboardService.filter('applyed');
            console.log(data);
            this.loading = true;
            this.submitConfig();
            this.route.navigate(['/thank-you-workshop',this.workshopData.title]);
        });
    }
    }
  }
  back(): void {
    this.location.back()
  } 
  // onFileChange(event: any) {
  //   this.images.push(event.target.files[0]);
  //   this.form.value.append = event.target.files[0];
  //     this.form.patchValue({
  //       fileSource: event.target.files[0]
  //     });
  // }

  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      var extension = event.target.files[0].name.split('.').pop().toLowerCase();
        var isSuccess = this.fileTypes.indexOf(extension) > -1;
        if (isSuccess) { 
      this.panfileChoosen = true;
      this.panfileName = event.target.files[0].name; 
      const file = event.target.files && event.target.files[0];
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        
        reader.onload = (event: any) => {
          this.url = (<FileReader>event.target).result;
          this.images.push(event.target.result);
          this.form.patchValue({
            fileSource: this.images
          });
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }else{
      this.notification.showInfo('Select image (jpg,jpeg,png) only.','');
    }
  }
  }

  onFileChange2(event: any) {
    if (event.target.files && event.target.files[0]) {
      var extension = event.target.files[0].name.split('.').pop().toLowerCase();
        var isSuccess = this.fileTypes.indexOf(extension) > -1;
        if (isSuccess) { 
      this.aadharfileChoosen = true;
      this.aadharfileName = event.target.files[0].name;      
      const file = event.target.files && event.target.files[0];
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        
        reader.onload = (event: any) => {
          this.url = (<FileReader>event.target).result;
          
          this.images2.push(event.target.result);
          this.form.patchValue({
            aadharfileSource: this.images2
          });
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }else{
      this.notification.showInfo('Select image (jpg,jpeg,png) only.','');
    }
  }
  }

}
