import { Injectable } from '@angular/core';
import { QuoteList } from '../_config/quote-list';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  lists : any = QuoteList.List;
  quotes: any = [];
  active_quote : any ='';
  localData : any;
  showquote : boolean = true;

  constructor() { }

  setupQuotes(screen:any): void {
      
    this.lists.forEach((quote : any) => {
      const quoteData = {
        id:quote.id,
        image: quote.image,
        quote: quote.quote,
      };
        this.quotes.push({ ...quoteData });
    });   
    var a:any;
    if (localStorage.getItem(screen+'-quotes') === null) {
        a = [];
    } else {
         var ld:any = localStorage.getItem(screen+'-quotes');
         a = JSON.parse(ld);
     }
     //-filter array-------//
    this.quotes = this.quotes.filter((item:any) => !a.includes(item.id));
    //-shuffle array------//
    this.quotes = this.shuffleArray(this.quotes);
    this.SaveDataToLocalStorage(screen,this.quotes[0].id);
    return this.quotes[0].image;    
  }
  SaveDataToLocalStorage(screen:any,data:any){
    var a;
    if (localStorage.getItem(screen+'-quotes') === null) {
        a = [];
    } else {
         var ld:any = localStorage.getItem(screen+'-quotes');
         a = JSON.parse(ld);
     }
     if(a.indexOf(data) !== -1){
      if(a.length == this.quotes.length){
        this.showquote = false;            
       }       
        this.quotes = this.shuffleArray(this.quotes);
     }else{
        a.push(data); 
        localStorage.setItem(screen+'-quotes', JSON.stringify(a)); 
        this.showquote = true;
     }
  }
  shuffleArray(anArray: any[]): any[] {
    return anArray.map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);
  }
}
