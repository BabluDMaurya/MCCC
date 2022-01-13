import { Component, OnInit,ViewChild } from '@angular/core';
import {GameService} from "../../_service/game.service";
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {
  @ViewChild('opendialog') opendialog:any;
  back_link = "games";
  constructor( public gameService: GameService){  
  }

  resetGame(){
    this.gameService.newGame()
  }
  ngOnInit(): void {
    console.log("Over Status:",this.gameService.gameOver);
  }
  cardClicked(){
    if(this.gameService.gameOver){
      this.opendialog.nativeElement.click();
    }
  }
}
