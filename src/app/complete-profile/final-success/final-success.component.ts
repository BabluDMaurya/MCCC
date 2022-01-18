import { Component, OnInit } from '@angular/core';
import { QuoteList } from 'src/app/_config/quote-list';

@Component({
  selector: 'app-final-success',
  templateUrl: './final-success.component.html',
  styleUrls: ['./final-success.component.scss']
})
export class FinalSuccessComponent implements OnInit {
  back_link :any =  "";
  component_title : string = '';
  screen = 'profile';
  lists = QuoteList.List;
  showquote : boolean = true;
  constructor() { }

  ngOnInit(): void {
    //-----show quote-------//
    if (localStorage.getItem(this.screen+'-quotes') != null) {
      var qd:any = localStorage.getItem(this.screen+'-quotes');
      let ld :any  = JSON.parse(qd)
      if(ld.length == this.lists.length){
        this.showquote = false;
      }else{
        this.showquote = true;
      }
    }
  }

}
