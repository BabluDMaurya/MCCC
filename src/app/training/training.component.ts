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
  trainCatg: any;
  trainingVideo: any;
  title: any;
  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.trainingService.get_training_categories().subscribe(res => {
      this.loading = true;
      this.trainCatg = res.data;
      this.title = this.trainCatg[0].title;
      console.log(this.trainCatg);
    },error=>{
      this.loading = false;
    });

    this.trainingService.get_training_videos({'id':1,'limit':3}).subscribe(res => {
      this.loading = true;
      
      if(res.data == 'No Data'){
        this.trainingVideo = [];
      }else{
        this.trainingVideo = res.data;
      }
     
      console.log(this.trainingVideo);
    },error=>{
      this.loading = false;
    });
    
  }
  changeCat(id: any,title:any){
    console.log(id);
    this.title = title;
    this.trainingService.get_training_videos({'id':id,'limit':3}).subscribe(res => {
      this.loading = true;
      if(res.data == 'No Data'){
        this.trainingVideo = [];
      }else{
        this.trainingVideo = res.data;
      }
      console.log(this.trainingVideo);
    },error=>{
      this.loading = false;
    });
    }
    viewVideo(id:any,catId:any){
      console.log(id);
      console.log(catId);
    }
}
