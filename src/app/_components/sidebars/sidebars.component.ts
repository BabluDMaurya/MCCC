import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../_service/authentication.service';
import { DashboardService } from '../../_service/dashboard.service';
import { User } from '../../_models/user';
declare var switchDarkModeCheck: any ;
declare var $: any ;
import { Config } from 'src/app/_config/config';
@Component({
  selector: 'app-sidebars',
  templateUrl: './sidebars.component.html',
  styleUrls: ['./sidebars.component.scss']
})
export class SidebarsComponent implements OnInit {
  currentUser: User;
  @ViewChild('closebutton') closebutton :any;
  selected: boolean = false;
  check:any;
  checkboxVal :boolean = false;
  resData: any;
  data : any;
  baseUrl :string = Config.Host;
  profile_pic_path: any;
  profile_pic: any;
  progress: number = 0;

  constructor(
    private route:Router,
    private authenticationService: AuthenticationService,
    private dashboardService: DashboardService
    ) {this.currentUser = this.authenticationService.currentUserValue; 
      this.progress = this.currentUser.percentage;
    }

  ngOnInit(): void {
    this.check = localStorage.getItem("MobilekitDarkMode"); 
    if(this.check == 1){
      this.checkboxVal = true;
    }else{
      this.checkboxVal = false;
    }
    
    // console.log(this.currentUser);
    this.dashboardService.userDetailsForPeofile()
        .subscribe(res => {
          this.resData = res;
          this.profile_pic_path =  this.resData.data.user_details.profile_pic_path;
          this.profile_pic = this.resData.data.user_details.profile_pic;
          this.data = this.resData.data.user_details;
          // console.log(this.resData.data.user_details);
        });
  }
  logout(){
    $('.mccc').css('overflow','inherit');
    this.authenticationService.logout();
    this.route.navigate(['/signin']);
  }
  sideBarClose(){
    $('.mccc').css('overflow','inherit');
  }
  darkMode(){
    if(this.check == 1){
      this.check = 0;
      $('.mccc').removeClass('dark-mode-active');  
      localStorage.setItem("MobilekitDarkMode", "0");
      var modeCheck = new switchDarkModeCheck(false);
    }else{
      this.check = 1;
      $('.mccc').addClass('dark-mode-active');  
      localStorage.setItem("MobilekitDarkMode", "1");
      var modeCheck =  new switchDarkModeCheck(true);
    }
    console.log(modeCheck , "modeCheck");
    // if($('.mccc').hasClass('dark-mode-active')) {
    //   $('.mccc').removeClass('dark-mode-active');  
    // };
    // $('.mccc').addClass('dark-mode-active');
    // localStorage.setItem("MobilekitDarkMode", "1");
  }
  closeSide(){
    $('.mccc').css('overflow','inherit');
  }
  
}
