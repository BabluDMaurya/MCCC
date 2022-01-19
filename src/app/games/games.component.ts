import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuoteList} from '../_config/quote-list';
@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  back_link :any =  "home";
  screen = 'game';
  lists = QuoteList.List;
  showquote : boolean = true;
  constructor(private route : Router) { }

  ngOnInit(): void {

  }
  ngAfterViewChecked(){
    if (localStorage.getItem(this.screen+'-quotes') != null) {
      var qd:any = localStorage.getItem(this.screen+'-quotes');
      let ld :any  = JSON.parse(qd)
      if(ld.length == this.lists.length){
        this.showquote = false;
      }else{
        this.showquote = true;
      }
      console.log("ld.length:",ld);
      console.log("this.lists.length:",this.lists.length);
      console.log("this.showquote:",this.showquote);
    }     
  }
  show(){
    this.route.navigate(['/bollywood-memory-game']);
  }
  showTicTacToe(){
    this.route.navigate(['/tic-tac-toe-game']);
  }

}
