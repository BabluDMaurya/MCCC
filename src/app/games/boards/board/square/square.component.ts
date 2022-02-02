import { Component, OnInit, Input } from '@angular/core';
import {GameService} from "../../../../_service/game.service";
@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent implements OnInit {

  @Input() square:any; 

  constructor( public gameService: GameService) { }

  ngOnInit() {
  }

  changePlayer(){ 

    this.gameService.isGameRunning = true;

    if ( this.gameService.isGameRunning && this.square.state === null ){
      this.square.state =  this.gameService.activePlayer;
      this.gameService.changePlayerTurn( this.square);
    }
    
  }

}
