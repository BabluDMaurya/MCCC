import { Component, ElementRef, OnInit,ViewChild,OnDestroy } from '@angular/core';
import { Router,NavigationStart,NavigationEnd , Event as NavigationEvent} from '@angular/router';
import { QuoteList } from 'src/app/_config/quote-list';
import { QuoteService } from 'src/app/_service/quote.service';

@Component({
  selector: 'app-final-success',
  templateUrl: './final-success.component.html',
  styleUrls: ['./final-success.component.scss']
})
export class FinalSuccessComponent implements OnInit,OnDestroy {
  back_link :any =  "";
  component_title : string = '';
  screen = 'profile';
  lists = QuoteList.List;
  showquote : boolean = true;
  @ViewChild('openquotedialog') openquotedialog:ElementRef | any;
  quote : any;
  event$ 
  constructor(private router: Router,private _QuoteService:QuoteService) {
    this.event$=this.router.events.subscribe((event: NavigationEvent) => {
            if(event instanceof NavigationEnd ) {
              console.log(event.url);
              if(event.url=="/final-success"){
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

}
