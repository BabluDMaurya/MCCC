import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../_service/authentication.service';
import { DashboardService } from '../../_service/dashboard.service';
import { User } from '../../_models/user';
declare var switchDarkModeCheck: any ;
declare var $: any ;
  



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
  constructor(
    private route:Router,
    private authenticationService: AuthenticationService,
    private dashboardService: DashboardService
    ) {this.currentUser = this.authenticationService.currentUserValue; }

  ngOnInit(): void {
    this.check = localStorage.getItem("MobilekitDarkMode"); 
    if(this.check == 1){
      this.checkboxVal = true;
    }else{
      this.checkboxVal = false;
    }
    
  }
  logout(){
    this.authenticationService.logout();
    this.route.navigate(['/']);
  }
  darkMode(){

    
    if(this.check == 1){
      $('.mccc').removeClass('dark-mode-active');  
      localStorage.setItem("MobilekitDarkMode", "0");
      var modeCheck = new switchDarkModeCheck(false);
    }else{
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
    $('.mat-typography').css('overflow','inherit');
  }
  
}
