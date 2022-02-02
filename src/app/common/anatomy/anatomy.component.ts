import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AlertService } from 'src/app/_service/alert.service';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { CommonService } from 'src/app/_service/common.service';
import { Location } from '@angular/common';
import { NotificationService } from 'src/app/_service/notification.service';
declare var toastbox: any;
declare var $: any;
@Component({
  selector: 'app-anatomy',
  templateUrl: './anatomy.component.html',
  styleUrls: ['./anatomy.component.scss']
})
export class AnatomyComponent implements OnInit {
  pageName="anatomy";
  currentUser: User;
  loading:boolean = true;
  datas : any;
  resData:any;
  form: FormGroup | any;
  submitted = false;
  uploading:boolean=false;
  active:any=0;
  toastSuccess:string = 'toast-18';
  btnVal :string = "Save";

//button click function
  progressConfig(){
    let ProgressBtn :string = "Progress...";
    this.btnVal = ProgressBtn;
    $(".tbsub").prop('disabled', true).addClass('dis-class');
  }
  submitConfig(){    
    let btnVal : string = "Save";
    this.btnVal = btnVal;
    $(".tbsub").prop('disabled', false).removeClass('dis-class');
  }
  constructor( private notification : NotificationService, private alertService:AlertService,private formBuilder: FormBuilder,private location:Location,private route:Router,
    private authenticationService: AuthenticationService,private commonService:CommonService) {
      this.currentUser = this.authenticationService.currentUserValue;
     }

     ngOnInit(): void {
      this.form = this.formBuilder.group({
        // weight:['',Validators.required],
        // skin_color:['',Validators.required],
        waist:['',Validators.required],
        chest:['',Validators.required],
        bust:['',Validators.required],
        hair:['',Validators.required],
        tattoo:['',Validators.required]
      });
      this.loading = false;
      this.commonService.anatomyInner().subscribe(res => {
        this.loading = true;
        this.resData = res;   
        this.datas = this.resData.data;
        // this.form.controls['weight'].setValue(this.datas.weight);
        // this.form.controls['skin_color'].setValue(this.datas.skin_color);
        this.form.controls['waist'].setValue(this.datas.waist);
        this.form.controls['chest'].setValue(this.datas.chest);
        this.form.controls['bust'].setValue(this.datas.bust);
        this.form.controls['hair'].setValue(this.datas.hair);
        this.form.controls['tattoo'].setValue(this.datas.tattoo);
      },error=>{
        this.loading = false;
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
        this.uploading = true;
        this.active=1;
        this.progressConfig();
        this.commonService.anatomyInnerUpdate(this.form.value).subscribe(
          data => {  
            this.submitConfig();
            this.uploading = false;    
            new toastbox(this.toastSuccess, 2000);
            setTimeout(() => {
              $('#'+this.toastSuccess).removeClass('show');
          }, 2000); 
            this.active=0;   
            // this.notification.showSuccess('Updated Successfully','');
          },
          error => {
            this.submitConfig();
            // this.notification.showError(error.error.message,true);
              this.uploading = false;
              this.active=0;
          }); 
      }
    }
    back(): void {
      this.location.back();
    }

}
