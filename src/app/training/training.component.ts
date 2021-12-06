import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../_service/training.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  stickymenu = 'training';
  pageName = 'training';
  loading: boolean= false;
  resData: any;
  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.trainingService.get_training_categories().subscribe(res => {
      this.loading = true;
      this.resData = res;
      console.log(this.resData);
    },error=>{
      this.loading = false;
    });

    this.trainingService.get_training_videos({'id':1}).subscribe(res => {
      this.loading = true;
      this.resData = res;
      console.log(this.resData);
    },error=>{
      this.loading = false;
    });
    
  }

}
