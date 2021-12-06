import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../_service/authentication.service';
import { DashboardService } from '../../_service/dashboard.service';
import { User } from '../../_models/user';

@Component({
  selector: 'app-sidebars',
  templateUrl: './sidebars.component.html',
  styleUrls: ['./sidebars.component.scss']
})
export class SidebarsComponent implements OnInit {
  currentUser: User;
  constructor(
    private route:Router,
    private authenticationService: AuthenticationService,
    private dashboardService: DashboardService
    ) {this.currentUser = this.authenticationService.currentUserValue; }

  ngOnInit(): void {
  }
  logout(){
    this.authenticationService.logout();
    this.route.navigate(['/']);
  }

}
