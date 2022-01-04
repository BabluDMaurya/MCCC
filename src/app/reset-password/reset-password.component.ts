import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators,AbstractControl } from '@angular/forms';
import { Router,ActivatedRoute,ParamMap } from '@angular/router';
import { AuthenticationService } from '../_service/authentication.service';
import { Config } from '../_config/config';
import { UserService } from '../_service/user.service';
import { first } from 'rxjs/operators';
import { MustMatch,MustMatchOTP } from '../_helpers/must-match.validator';
import { RegisterService } from 'src/app/_service/register.service';
import { OtpService } from 'src/app/_service/otp.service';
declare var $: any;
declare var toastbox: any;

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  toastSuccess14:string = 'toast-14';
  toastSuccess:string = 'toast-12';
  back_link :any =  "forgot-password";
  component_title : string = 'Reset Password';
  form: FormGroup | any;
  submitted = false;
  token:any;
  responceData:any;
  rotp : any;
  all_terms : any;
  otp : string = '1111';
  hide : boolean = true;
  chide : boolean = true;
  constructor(public otpService:OtpService,private registerService : RegisterService,private userService:UserService,private actRoute:ActivatedRoute ,private formBuilder: FormBuilder, private route : Router,private authenticationService: AuthenticationService) { }
  passwordhideshow() {
    this.hide = !this.hide;
  }
  cpasswordhideshow() {
    this.chide = !this.chide;
  }
  ngOnInit(): void {
    this.actRoute.paramMap.subscribe((params: ParamMap) => {                 
      this.token = params.get('token');
    });
    this.rotp = sessionStorage.getItem('rotp');
    this.form = this.formBuilder.group({
      password: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(12)]],
      
      otp : ['',[Validators.required]],
      // terms:['',Validators.required],
    }, {
      validator: [MustMatchOTP(this.rotp,'otp')]
  });

  // fetch terms and condtion from server
this.registerService.terms().subscribe(
  data => {
    console.log("terms run");
    this.all_terms = data;
  },error => {
    console.log("terms error");
  });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  } 
  submit(){
    console.log("submit");
    this.submitted = true;
    if (this.form.invalid) {
        return;
    }else{ 
      this.userService.reset_password(this.form.value,this.token).pipe(first()).subscribe(res => {
        this.responceData = res;
        if(this.responceData.status == 'true'){  
          sessionStorage.removeItem('rotp');
          // this.notifyService.showSuccess("Password Reset Successfully !!", "");
          new toastbox(this.toastSuccess, 2000);
            setTimeout(() => {
              $('#'+this.toastSuccess).removeClass('show');
              this.route.navigate(['/signin']);
          }, 2000);
          
        }else{
          // this.notifyService.showError(this.responceData.message, "")
          console.log('Hello forgot',this.responceData);
        }          
       },error=>{
        // this.notifyService.showError(error.message, "")
       });       
        
    }
  }
  resendOTP(){
    this.otpService.get_resendotp({email_or_mobile:sessionStorage.getItem('email_or_mobile')}).subscribe((res: any) => {      
      this.otp = res.otp;
      new toastbox(this.toastSuccess14, 2000);
            setTimeout(() => {
              $('#'+this.toastSuccess14).removeClass('show');
          }, 2000);
      sessionStorage.setItem('rotp',this.otp);
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
    if (password.match(/([A-Z])/) && password.match(/([0-9])/)) {
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
