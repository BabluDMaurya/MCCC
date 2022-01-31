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
  expanded = 0;
  pageName = 'training';
  loading: boolean= false;
  trvideo: boolean= false;
  resData: any;
  trainCatg: any;
  trainingVideo: any;
  title: any;

  loadMoreButton :boolean = false;
  videosdata:any = []; 
  displayData:any = []; 

  constructor(private trainingService: TrainingService) { }
  two_sliders = {"slidesToShow": 2.5, "slidesToScroll": 2,"dots": false,"infinite": false,'nextArrow':false,'prevArrow':false};

  ngOnInit(): void {
    // this.trainingService.get_training_categories().subscribe(res => {
    //   this.loading = true;
    //   this.trainCatg = res.data;
    //   this.title = this.trainCatg[0].title;
    //   console.log(this.trainCatg);
    // },error=>{
    //   this.loading = false;
    // });

    // this.trainingService.get_training_videos({'id':1,'limit':10}).subscribe(res => {
      this.trainingService.get_training_videos(null).subscribe(res => {
      this.loading = true;
      
      if(res.data == 'No Data'){
        this.trainingVideo = [];
        this.trvideo = false;
      }else{
        this.trainingVideo = res.data;
        this.trvideo = true;

        this.videosdata = res.data;
        let newLength;
        if(this.trainingVideo.length >= this.displayData.length + 10){
          newLength= this.displayData.length + 10;
        }else{
          let newLengthadd = this.trainingVideo.length - this.displayData.length;
          newLength = this.displayData.length + newLengthadd;
        }

        if (newLength > this.videosdata.length) {
            newLength = this.videosdata.length;
        }
        this.displayData = this.videosdata.slice(0, newLength);
        if (newLength < this.videosdata.length) {
            this.loadMoreButton = true;
        }else{
          this.loadMoreButton = false;
        }
      }
     
      console.log(this.trainingVideo);
    },error=>{
      this.loading = false;
      this.trvideo = false;
    });
    
  }
  isOdd(n:number) {
    return Math.abs(n % 2) == 1;
 }
 slickInit(e:any) {
  // console.log('slick initialized');
}    
breakpoint(e:any) {
  // console.log('breakpoint');
}    
afterChange(e:any) {
  // console.log('afterChange');
}    
beforeChange(e:any) {
  // console.log('beforeChange');
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
    loadmore(){
      let newLength;
      if(this.videosdata.length >= this.displayData.length + 10){
        newLength= this.displayData.length + 10;
      }else{
        let newLengthadd = this.videosdata.length - this.displayData.length;
        newLength = this.displayData.length + newLengthadd;
      }

      console.log("displayData :",this.displayData.length);
      console.log("newlength :",newLength);

      if (newLength > this.videosdata.length) {
          newLength = this.videosdata.length;
      }
       this.displayData = this.videosdata.slice(0, newLength);
       if (newLength < this.videosdata.length) {
          this.loadMoreButton = true;
       }else{
          this.loadMoreButton = false;
       }
    }
}
