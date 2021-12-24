import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray,AbstractControl,ValidationErrors} from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../_service/authentication.service';
import { AlertService } from '../../_service/alert.service';
import { Config } from '../../_config/config';
import { UserService } from 'src/app/_service/user.service';
import { RegisterService } from 'src/app/_service/register.service';
import{ AgeBetween13To54 } from "../../_helpers/custom-DOB.validator";
import { DatePipe } from '@angular/common';
declare var toastbox: any;
declare var $: any;
@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./complete-profile.component.scss']
})
export class CompleteProfileComponent implements OnInit {
  toastSuccess:string = 'toast-11';
  workCount : number = 1;
  qualiCount : number = 1;
  socialCount : number = 1;
  back_link :any =  "";
  component_title : string = 'Complete your Profile';
  submitted: boolean = false;
  form: FormGroup | any;
  experiences: FormArray | any;
  qualifs: FormArray | any;
  slinks: FormArray | any;
  loading = false;
  social_login = false;
  dataTrue = false;
  response: any;
  states: any;
  cities: any;
  languages: any;
  responseData: any;
  statesTrue = false;
  uploading:boolean=false;
  constructor(private formBuilder: FormBuilder,
    public datepipe: DatePipe,
    private router: ActivatedRoute,
    private route: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private userService: UserService,
    private registerService: RegisterService,
  ) {
    // redirect to home if already logged in
    if (sessionStorage.getItem('social_login') === 'true') {
      if (sessionStorage.getItem('profile_status') === 'true') {
        this.route.navigate([Config.AfterLogin]);
      }
    } else {
      if (this.authenticationService.currentUserValue) {
        if (sessionStorage.getItem('profile_status') === 'true') {
          this.route.navigate([Config.AfterLogin]);
        }
      } else {
        this.route.navigate(['/signin']);
      }
    }
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('social_login')) {
      this.social_login = true;
      this.form = this.formBuilder.group({
        phone: ['', [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
        dob: ['', Validators.required],
        gender: ['', Validators.required],
        state: ['', Validators.required],
        city: ['', Validators.required],
        // tag_line: ['', [Validators.required,Validators.maxLength(50)]],
        // short_bio: ['', [Validators.required,Validators.maxLength(200)]],
        work_experiences: this.formBuilder.array([this.createExperience()]),
        qualifications: this.formBuilder.array([this.createQualification()]),
        language_id: ['',[Validators.required]],
        social_links: this.formBuilder.array([this.createSocialLinks()]),
        // skin_color:['',Validators.required],
        height:['',[Validators.required,Validators.pattern("^[0-9]+(.[0-9]{0,2})?$")]]
      }, {
        validator: AgeBetween13To54('dob')
    });
    } else {
      this.form = this.formBuilder.group({
        // tag_line: ['', [Validators.required,Validators.maxLength(50)]],
        // short_bio: ['', [Validators.required,Validators.maxLength(200)]],
        work_experiences: this.formBuilder.array([this.createExperience()]),
        qualifications: this.formBuilder.array([this.createQualification()]),
        language_id: ['',Validators.required],
        social_links: this.formBuilder.array([this.createSocialLinks()]),
        // skin_color:['',Validators.required],
        height:['',[Validators.required,Validators.pattern("^[0-9]+(.[0-9]{0,2})?$")]],
        home_town : ['', Validators.required],
        dob : [''],
      });
    }
    if (sessionStorage.getItem('social_login')) {
      this.registerService.state().pipe(first()).subscribe(res => {
        this.response = res;
        if (this.response.data !== 'undefined' && this.response.data.length > 0) {
          this.dataTrue = true;
          this.states = this.response.data;
        } else {
          this.dataTrue = false;
        }
      }, error => {
        this.alertService.error(error);
        this.loading = false;
      });
    }
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
  createExperience(): FormGroup {
    return this.formBuilder.group({
      experience: ['']
    });
  }
  addExperience(): void {
    if(this.workCount < 5){
        this.experiences = this.form.get('work_experiences') as FormArray;
        this.experiences.push(this.createExperience());
        this.workCount = this.workCount + 1;
    }
  }
  removeExperience(i: number) {
    this.workCount = this.workCount - 1;
    this.experiences.removeAt(i);
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

  changeSuit(e: any) {
    if (e.target.value > 0) {
      this.statesTrue = true;
      this.registerService.cities({ state_id: e.target.value }).pipe(first()).subscribe(res => {
        this.response = res;
        if (this.response.data !== 'undefined' && this.response.data.length > 0) {
          this.dataTrue = true;
          this.cities = this.response.data;
        } else {
          this.dataTrue = false;
        }
      }, error => {
        this.alertService.error(error);
        this.loading = false;
      });
    }
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit() {
    this.uploading = true;
    this.submitted = true;
    // reset alerts on submit
    this.alertService.clear();
    // stop here if form is invalid
    if (this.form?.invalid) {
      this.uploading = false;
      this.getFormValidationErrors();
      return;
    }
    this.loading = true;
    let DOB = this.datepipe.transform(this.form.value.year+'-'+this.form.value.month+'-'+this.form.value.day, 'yyyy-MM-dd');
      this.form.controls['dob'].setValue(DOB); 
    this.userService.profile_final_stap(this.form.value).pipe(first()).subscribe(
      data => {
        this.uploading = false;
        this.responseData = data;
        if (this.responseData.status == "true") {
          let ld:any  = localStorage.getItem('currentUser');
          let item =JSON.parse(ld);
          item['profileStatus']='true';
          localStorage.setItem('currentUser', JSON.stringify(item));
          this.authenticationService.currentUserValue.profileStatus = "true";
          this.route.navigate(['/upload-images']);
        } else {
          this.alertService.success(this.responseData.data);
        }
      }, error => {
        this.uploading = false;
        this.alertService.error(error);
        this.loading = false;
      });
  }
  getFormValidationErrors() {
    Object.keys(this.form.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.form.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          new toastbox(this.toastSuccess, 2000);
          $('#form-error-id').text(key+': '+keyError)
            setTimeout(() => {
              $('#'+this.toastSuccess).removeClass('show');
          }, 2000);
        //  console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }

}
