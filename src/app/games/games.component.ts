import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  back_link :any =  "home";
  constructor(private route : Router) { }

  ngOnInit(): void {
  }
  show(){
    this.route.navigate(['/bollywood-memory-game']);
  }
  showTicTacToe(){
    this.route.navigate(['/tic-tac-toe-game']);
  }

}
