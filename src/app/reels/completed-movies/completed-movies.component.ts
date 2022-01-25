import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-completed-movies',
  templateUrl: './completed-movies.component.html',
  styleUrls: ['./completed-movies.component.scss']
})
export class CompletedMoviesComponent implements OnInit {
  back_link:any;
  constructor() { }

  ngOnInit(): void {
  }

}
