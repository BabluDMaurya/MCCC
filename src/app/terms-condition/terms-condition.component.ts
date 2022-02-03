import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import {RegisterService} from '../_service/register.service'

@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.component.html',
  styleUrls: ['./terms-condition.component.scss']
})
export class TermsConditionComponent implements OnInit {
  back_link :any =  "home";
  component_title : string = 'Terms & Conditions';
  all_terms: any;
  terms: any;
  loading :boolean = false;
  constructor(private registerService: RegisterService) { }

  ngOnInit(): void {
    this.loading = false;
    this.registerService.terms().pipe(first()).subscribe(
      data => {
        this.loading = true;
        this.all_terms = data;
        console.log(data);
        this.terms = this.all_terms.firstFourTerms;  
        // if(this.all_terms.length > 4){
          // this.showViewMore = true;
        // }      
      },error => {
        // this.alertService.error(error);
          this.loading = false;
      });
  }

}
