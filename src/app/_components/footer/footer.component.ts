import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/_service/dashboard.service';
import {BdcWalkService} from 'bdc-walkthrough';

declare var $: any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  setintvl:any;

  constructor(private dashboardService:DashboardService,private bdcWalkService: BdcWalkService) { }

  ngOnInit(): void {
    // this.setintvl = setInterval(() => { 
      // this.addExternalClass();
      // console.log('startIntereval')
    //  },200)
    
  }
  letEx(){
    this.dashboardService.filter('applyed');
  }

  addExternalClass(){
    if($('.bdc-walk-popup').hasClass('circle_menus')){
      $('.cdk-overlay-pane').addClass('pgpg');
    }
  }
  ngAfterViewChecked(){
    this.addExternalClass();
  }
}
