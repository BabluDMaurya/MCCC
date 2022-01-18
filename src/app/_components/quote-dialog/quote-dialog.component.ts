import { Component, OnInit,ViewChild,Input } from '@angular/core';
import { QuoteList} from '../../_config/quote-list';
declare var $: any;
@Component({
  selector: 'app-quote-dialog',
  templateUrl: './quote-dialog.component.html',
  styleUrls: ['./quote-dialog.component.scss']
})
export class QuoteDialogComponent implements OnInit {
  @Input() screen:any;
  @ViewChild('opendialog') opendialog:any;
  lists : any;
  quotes: any = [];
  active_quote : any;
  localData : any;
  showquote : boolean = true;
  constructor() { }
  ngOnInit(): void {      
    this.setupQuotes();
  }
  setupQuotes(): void {
      this.lists = QuoteList.List;
    this.lists.forEach((quote : any) => {
      const quoteData = {
        id:quote.id,
        image: quote.image,
        quote: quote.quote,
      };
        this.quotes.push({ ...quoteData });
    });   
    var a:any;
    if (localStorage.getItem(this.screen+'-quotes') === null) {
        a = [];
    } else {
         var ld:any = localStorage.getItem(this.screen+'-quotes');
         a = JSON.parse(ld);
     }
     //-filter array-------//
    this.quotes = this.quotes.filter((item:any) => !a.includes(item.id));
    //-shuffle array------//
    this.quotes = this.shuffleArray(this.quotes);    
    this.active_quote = this.quotes[0].image;
    this.SaveDataToLocalStorage(this.quotes[0].id);    
  }
  SaveDataToLocalStorage(data:any){
    var a;
    if (localStorage.getItem(this.screen+'-quotes') === null) {
        a = [];
    } else {
         var ld:any = localStorage.getItem(this.screen+'-quotes');
         a = JSON.parse(ld);
     }
     if(a.indexOf(data) !== -1){
      if(a.length == this.quotes.length){
        this.showquote = false;            
       }       
        this.quotes = this.shuffleArray(this.quotes);
     }else{
        a.push(data); 
        localStorage.setItem(this.screen+'-quotes', JSON.stringify(a)); 
        this.showquote = true;
     }
  }
  shuffleArray(anArray: any[]): any[] {
    return anArray.map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);
  }
  ngAfterViewChecked(){
    if(this.showquote){
      // const myVar = setTimeout(()=>{                           
              this.opendialog.nativeElement.click();
      //         clearTimeout(myVar);
      // }, 3000);          
    }
  } 
}
