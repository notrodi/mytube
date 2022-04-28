import { Video, VideosService } from './../shared/videos.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'mt-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
  constructor(public videosService: VideosService,
              private httpClient: HttpClient) { }

  public videos: Video[] = [];
  public indexCurrentVideo: number = 0;
  public indexNextVideo: number = 2;
  public thereIsAnotherVideo: boolean = true;

  ngOnInit(): void {
    this.displayVideo(this.indexCurrentVideo, this.indexNextVideo);
  }

  public displayVideo(startIndex: number, endIndex: number): void {
    for(startIndex; startIndex <= endIndex; startIndex++) {
      this.videosService.fetchVideo(startIndex).subscribe({
        next: (video: Video) => {
          this.videos.push(video);
        },
        error: (err: any) => {
          if (err.status == 404) {
            this.thereIsAnotherVideo = false;
          }
        }
      })
      this.indexCurrentVideo++;
    }

    this.indexNextVideo++;
  }

  public onScroll() {
    if (this.thereIsAnotherVideo) {
      this.displayVideo(this.indexCurrentVideo, this.indexNextVideo);
    }
  }

  public addComment(index: number) {
    this.videos[index].comments.unshift(this.videos[index].currentComment);
    this.videos[index].currentComment = '';
    this.videosService.updateVideo(index, this.videos[index]).subscribe();
  }

  public deleteComment() {
    alert("work")
  }
}