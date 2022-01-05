import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/_service/dashboard.service';
import {BdcWalkService} from 'bdc-walkthrough';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private dashboardService:DashboardService,private bdcWalkService: BdcWalkService) { }

  ngOnInit(): void {
  }
  letEx(){
    this.dashboardService.filter('applyed');
  }

}
