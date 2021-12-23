import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import { Config } from 'src/app/_config/config';
import { RegisterService } from 'src/app/_service/register.service';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { OtpService } from 'src/app/_service/otp.service';
import { MustMatch,MustMatchOTP } from '../../_helpers/must-match.validator';
declare var $: any;
declare var toastbox: any;
@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.scss']
})
export class CreatePasswordComponent implements OnInit {
  toastSuccess:string = 'toast-14';
  form: FormGroup | any;
  back_link :any =  "registration";
  component_title : string = 'Create Password';
  submitted = false;
  storeOTP : any;
  otp : string = '1111';
  all_terms : any;
  hide : boolean = true;
  chide : boolean = true;
  constructor(
    private formBuilder: FormBuilder,
    private route : Router,
    private registerService : RegisterService,
    public otpService:OtpService,private authenticationService: AuthenticationService,
  ) { 
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      let Auth =  JSON.stringify(this.authenticationService.currentUserValue.status);
       if(Auth){
           this.route.navigate([Config.AfterLogin]);
       }
     }
  }
  passwordhideshow() {
    this.hide = !this.hide;
  }
  cpasswordhideshow() {
    this.chide = !this.chide;
  }
  ngOnInit(): void {
    this.storeOTP = sessionStorage.getItem('otp');
    this.form = this.formBuilder.group({
      password: ['',[Validators.required,Validators.maxLength(20)]],
      otp : ['', [Validators.required]],
      terms:['',Validators.required],
      name : [''],
      email : [''],
      phone : [''],
      country_code : [''],
      // gender: [''],
      // dob: [''],
      // country: [''],
      // state: [''],
      // city: [''],
      // home_town: ['']
    },{
    validator: [MustMatchOTP(this.storeOTP,'otp')]
    
});
//set the form value
this.form.controls['name'].setValue(sessionStorage.getItem('name'));
this.form.controls['email'].setValue(sessionStorage.getItem('email'));
this.form.controls['phone'].setValue(sessionStorage.getItem('phone'));
this.form.controls['country_code'].setValue(sessionStorage.getItem('country_code'));
// this.form.controls['dob'].setValue(sessionStorage.getItem('dob'));
// this.form.controls['gender'].setValue(sessionStorage.getItem('gender'));
// this.form.controls['country'].setValue(sessionStorage.getItem('country_id'));
// this.form.controls['state'].setValue(sessionStorage.getItem('state_id'));
// this.form.controls['city'].setValue(sessionStorage.getItem('city_id'));
// this.form.controls['home_town'].setValue(sessionStorage.getItem('home_town'));

// fetch terms and condtion from server
this.registerService.terms().subscribe(
  data => {
    
    this.all_terms = data;
    this.all_terms = this.all_terms.allTerms;
  },error => {
    console.log("terms error");
  });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  completeYourProfile(){
    this.authenticationService.login(sessionStorage.getItem('email'), sessionStorage.getItem('password'))
            .subscribe(
                data => {
                  //clear all the session data
                  sessionStorage.clear();
                  sessionStorage.setItem('profile_status',data.profileStatus);
                  if(data.profileStatus === 'false'){
                    this.route.navigate(['/complete-profile']);
                  }else{
                    this.route.navigate(['/home']);
                  }
                },
                error => {
                  
                });
  }
  submit(){
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }else{
        sessionStorage.setItem('password',this.form.value.password);
        this.registerService.register_new(this.form.value).subscribe(
                data => {     
                  // sessionStorage.removeItem('city_id');
                  // sessionStorage.removeItem('otp');
                  // sessionStorage.removeItem('gender');
                  // sessionStorage.removeItem('state_id');
                  // sessionStorage.removeItem('home_town');
                  // sessionStorage.removeItem('dob');
                  sessionStorage.removeItem('phone');
                  sessionStorage.removeItem('name');
                  sessionStorage.removeItem('country_code'); 
                  // sessionStorage.removeItem('email');
                  // sessionStorage.removeItem('password');    
                  this.completeYourProfile();                
                  
                },
                (errorResponse: HttpErrorResponse) => {
                  const validationErrors = errorResponse.error.errors;
                  Object.keys(validationErrors).forEach(prop => {
                    const formControl = this.form.get(prop);
                    if (formControl) {
                      formControl.setErrors({
                        serverError: validationErrors[prop]
                      });
                    }
                  });                                   
                });
    }
  }
  resendOTP(){
    this.otpService.get_resendotp({phone:sessionStorage.getItem('phone'),email:sessionStorage.getItem('email')}).subscribe((res: any) => {      
      this.otp = res.otp;
      new toastbox(this.toastSuccess, 2000);
            setTimeout(() => {
              $('#'+this.toastSuccess).removeClass('show');
          }, 2000);
      sessionStorage.setItem('otp',this.otp);      
      this.ngOnInit();

    });
  }

  passwordInfo() {
    var password = $('#password').val();
    let revalue = this.checkStrength(password);
    if ( revalue == 'false') {
        $('#sign-up').attr('disabled', true);
    }
  }  
  checkStrength(password:string) {
    var strength = 0; 
  
    //If password contains both lower and uppercase characters, increase strength value.
    if (password.match(/([a-z])/)) {
      strength += 1;
      $('.low-case').addClass('text-success');
      $('.low-case i').removeClass('fa-circle').addClass('fa-check-circle');
  } else {
      $('.low-case').removeClass('text-success');
      $('.low-case i').addClass('fa-circle').removeClass('fa-check-circle');
  }

  if (password.match(/([A-Z])/)) {
    // if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
    strength += 1;
    $('.low-uppercase').addClass('text-success');
    $('.low-uppercase i').removeClass('fa-circle').addClass('fa-check-circle');
} else {
    $('.low-uppercase').removeClass('text-success');
    $('.low-uppercase i').addClass('fa-circle').removeClass('fa-check-circle');
}
  
    //If it has numbers and characters, increase strength value.
    if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) {
        strength += 1;
        $('.one-number').addClass('text-success');
        $('.one-number i').removeClass('fa-circle').addClass('fa-check-circle');
  
    } else {
        $('.one-number').removeClass('text-success');
        $('.one-number i').addClass('fa-circle').removeClass('fa-check-circle');
    }
  
    //If it has one special character, increase strength value.
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
        strength += 1;
        $('.one-special-char').addClass('text-success');
        $('.one-special-char i').removeClass('fa-circle').addClass('fa-check-circle');
  
    } else {
        $('.one-special-char').removeClass('text-success');
        $('.one-special-char i').addClass('fa-circle').removeClass('fa-check-circle');
    }
  
    if (password.length > 7) {
        strength += 1;
        $('.eight-character').addClass('text-success');
        $('.eight-character i').removeClass('fa-circle').addClass('fa-check-circle');
  
    } else {
        $('.eight-character').removeClass('text-success');
        $('.eight-character i').addClass('fa-circle').removeClass('fa-check-circle');
    }
  
  
  
  
    // If value is less than 2
  
    if (strength < 2) {
        $('#result').removeClass()
        $('#password-strength').addClass('progress-bar-danger');
  
        $('#result').addClass('text-danger').text('Very Week');
        $('#password-strength').css('width', '10%');
        return 'less';
    } else if (strength == 2) {
        $('#result').addClass('good');
        $('#password-strength').removeClass('progress-bar-danger');
        $('#password-strength').addClass('progress-bar-warning');
        $('#result').addClass('text-warning').text('Week')
        $('#password-strength').css('width', '60%');
        return 'Week'
    } else if (strength == 4) {
        $('#result').removeClass()
        $('#result').addClass('strong');
        $('#password-strength').removeClass('progress-bar-warning');
        $('#password-strength').addClass('progress-bar-success');
        $('#result').addClass('text-success').text('Strength');
        $('#password-strength').css('width', '100%');
  
        return 'Strong'
    }else{
      return 'false';
    }
  
  }

  ConfirmpasswordInfo() {
    var ConfirmPassword = $('#ConfirmPassword').val();
    let revalue = this.confirm_checkStrength(ConfirmPassword);
    if ( revalue== 'false') {
        $('#sign-up').attr('disabled', true);
    }
  }
  
  confirm_checkStrength(ConfirmPassword:any) {
    var confirmstrength = 0;  
  
    //If password contains both lower and uppercase characters, increase strength value.
    if (ConfirmPassword.match(/([a-z])/)) {
      confirmstrength += 1;
          $('.confirm-low-case').addClass('text-success');
          $('.confirm-low-case i').removeClass('fa-circle').addClass('fa-check-circle');
      } else {
          $('.confirm-low-case').removeClass('text-success');
          $('.confirm-low-case i').addClass('fa-circle').removeClass('fa-check-circle');
      }

      if (ConfirmPassword.match(/([A-Z])/)) {
        // if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
          confirmstrength += 1;
          $('.confirm-low-uppercase').addClass('text-success');
          $('.confirm-low-uppercase i').removeClass('fa-circle').addClass('fa-check-circle');
      } else {
          $('.confirm-low-uppercase').removeClass('text-success');
          $('.confirm-low-uppercase i').addClass('fa-circle').removeClass('fa-check-circle');
      }
  
    //If it has numbers and characters, increase strength value.
    if (ConfirmPassword.match(/([a-zA-Z])/) && ConfirmPassword.match(/([0-9])/)) {
      confirmstrength += 1;
        $('.confirm-one-number').addClass('text-success');
        $('.confirm-one-number i').removeClass('fa-circle').addClass('fa-check-circle');
  
    } else {
        $('.confirm-one-number').removeClass('text-success');
        $('.confirm-one-number i').addClass('fa-circle').removeClass('fa-check-circle');
    }
  
    //If it has one special character, increase strength value.
    if (ConfirmPassword.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      confirmstrength += 1;
        $('.confirm-one-special-char').addClass('text-success');
        $('.confirm-one-special-char i').removeClass('fa-circle').addClass('fa-check-circle');
  
    } else {
        $('.confirm-one-special-char').removeClass('text-success');
        $('.confirm-one-special-char i').addClass('fa-circle').removeClass('fa-check-circle');
    }
  
    if (ConfirmPassword.length > 7) {
      confirmstrength += 1;
        $('.confirm-eight-character').addClass('text-success');
        $('.confirm-eight-character i').removeClass('fa-circle').addClass('fa-check-circle');
  
    } else {
        $('.confirm-eight-character').removeClass('text-success');
        $('.confirm-eight-character i').addClass('fa-circle').removeClass('fa-check-circle');
    }
  
  
  
  
    // If value is less than 2
  
    if (confirmstrength < 2) {
        $('#result').removeClass()
        $('#password-strength').addClass('progress-bar-danger');
  
        $('#result').addClass('text-danger').text('Very Week');
        $('#password-strength').css('width', '10%');
        return 'less'
    } else if (confirmstrength == 2) {
        $('#result').addClass('good');
        $('#password-strength').removeClass('progress-bar-danger');
        $('#password-strength').addClass('progress-bar-warning');
        $('#result').addClass('text-warning').text('Week')
        $('#password-strength').css('width', '60%');
        return 'Week'
    } else if (confirmstrength == 4) {
        $('#result').removeClass()
        $('#result').addClass('strong');
        $('#password-strength').removeClass('progress-bar-warning');
        $('#password-strength').addClass('progress-bar-success');
        $('#result').addClass('text-success').text('Strength');
        $('#password-strength').css('width', '100%');
  
        return 'Strong'
    }else{
      return 'false';
    }
  
  }

  getCodeBoxElement(index:any) {
    return document.getElementById('codeBox' + index);
  }
  onKeyUpEvent(index :any , event :any ) {
    const eventCode = event.which || event.keyCode;
    var htindex:any = this.getCodeBoxElement(index);
    if (htindex?.value.length === 1) {
       if (index !== 4) {
        this.getCodeBoxElement(index+ 1)?.focus();
       } else {
        htindex.blur();
          // Submit code
          let otp1:any = document.getElementById('codeBox1');
          let otp2:any = document.getElementById('codeBox2');
          let otp3:any = document.getElementById('codeBox3');
          let otp4:any = document.getElementById('codeBox4');
          this.form.controls['otp'].setValue(otp1.value+otp2.value+otp3.value+otp4.value);
          console.log('submit code');
       }
    }
    if (eventCode === 8 && index !== 1) {
      this.getCodeBoxElement(index - 1)?.focus();
    }
  }
  onFocusEvent(index:any) {
    for (let item:any = 1; item < index; item++) {
       const currentElement :any = this.getCodeBoxElement(item);
       if (!currentElement.value) {
            currentElement.focus();
            break;
       }
    }
  }

}
