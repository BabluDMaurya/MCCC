import { Component } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';
import { Router} from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MCCCSCSS';
  status = 'ONLINE';
  isConnected = true;
  constructor(private connectionService: ConnectionService,
    private route:Router,private location: Location) { 
     this.connectionService.monitor().subscribe(isConnected => {  
      this.isConnected = isConnected; 
      if (this.isConnected) { 
        this.status = "ONLINE";
        this.location.back();
      }  
      else {         
        this.status = "OFFLINE";
        this.route.navigate(['/no-internet']);
      }  
    })  
   
    
  } 
}
