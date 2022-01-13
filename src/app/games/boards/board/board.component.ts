import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import {GameService} from "../../../_service/game.service";
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Output() cardClicked = new EventEmitter();
  constructor( public boardService: GameService ) { }

  ngOnInit(): void {
  }

}
