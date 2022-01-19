import { Component, ElementRef, OnInit,ViewChild,OnDestroy } from '@angular/core';
import { Router,NavigationStart, Event as NavigationEvent} from '@angular/router';
import { QuoteList} from '../_config/quote-list';
import { QuoteService } from '../_service/quote.service';
@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit, OnDestroy {  
  back_link :any =  "home";
  @ViewChild('openquotedialog') openquotedialog:ElementRef | any;
  screen = 'game';
  lists = QuoteList.List;
  quote : any;
  event$ 
  constructor(private router: Router,private _QuoteService:QuoteService) {
    this.event$=this.router.events.subscribe((event: NavigationEvent) => {
            if(event instanceof NavigationStart) {
              if(event.url=="/games"){
                this.showQuote();
              }
            }
          });
        }    
  ngOnDestroy() {
    this.event$.unsubscribe();
  }
  showQuote(){
    this.quote = this._QuoteService.setupQuotes(this.screen);
    if (localStorage.getItem(this.screen+'-quotes') != null) {
      var qd:any = localStorage.getItem(this.screen+'-quotes');
      let ld :any  = JSON.parse(qd)
      if(ld.length <= this.lists.length){
        setTimeout(() => {
          this.openquotedialog.nativeElement.click();
        }, 3000);
      }    
    }
  }
  ngOnInit(): void {
  }
  show(){
    this.router.navigate(['/bollywood-memory-game']);
  }
  showTicTacToe(){
    this.router.navigate(['/tic-tac-toe-game']);
  }
  
}
