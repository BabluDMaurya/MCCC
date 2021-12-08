import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../_service/authentication.service';
import { DashboardService } from '../../_service/dashboard.service';
import { User } from '../../_models/user';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  getCount: any;
  constructor(
    private route:Router,
    private authenticationService: AuthenticationService,
    private dashboardService: DashboardService
  ) {
    
   }

  ngOnInit(): void {
    this.getUserNotificationCounter();
    setInterval(() => { 
     this.getUserNotificationCounter();
    }, 1000 * 15)
  }
  getUserNotificationCounter(){
    this.dashboardService.getUserNotificationCounter(null)
    .subscribe(res => {
      this.getCount = res.data; 
      // console.log(this.getCount + 'count');
    });
  }

}
