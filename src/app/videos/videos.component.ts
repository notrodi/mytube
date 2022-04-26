import { VideosService, Video } from './../shared/videos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mt-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {

  constructor(public videosService: VideosService) { }

  ngOnInit(): void {
    this.videosService.fetchVideo();
  }

}