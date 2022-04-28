import { VideosService } from './../shared/videos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mt-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {

  constructor(public videosService: VideosService) { }

  ngOnInit(): void {
    this.videosService.fetchVideo(this.videosService.indexNextVideo);
  }

  public onScroll() {
    if (this.videosService.isMoreVideos) {
      this.videosService.fetchVideo(this.videosService.indexNextVideo);
    }
  }
}