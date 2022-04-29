import { Video, VideosService, Comment } from './../shared/videos.service';
import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'mt-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
  constructor(public videosService: VideosService) { }

  public videos: Video[] = [];
  public indexNextVideo: number = 3;
  public thereIsAnotherVideo: boolean = true;

  ngOnInit(): void {
    this.displayInitVideo();
  }

  public async displayInitVideo() {
    for (let index = 0; index < this.indexNextVideo; index++) {
      this.videos.push(await firstValueFrom(this.videosService.fetchVideo(index)));
    }
  }

  public displayVideo(index: number) {
    this.videosService.fetchVideo(index)
      .subscribe({
        next: (video: Video) => {
          this.videos.push(video);
        },
        error: (err: any) => {
          if (err.status == 404) {
            this.thereIsAnotherVideo = false;
          }
        }
      })
    this.indexNextVideo++;
  }

  public onScroll() {
    if (this.thereIsAnotherVideo) {
      this.displayVideo(this.indexNextVideo);
    }
  }

  public addComment(index: number) {
    const newComment: Comment = {
      id: this.videos[index].comments.length,
      comment: this.videos[index].currentComment
    }

    this.videos[index].comments.unshift(newComment);
    this.videos[index].currentComment = '';
    this.videosService.updateVideo(index, this.videos[index]).subscribe();
  }

  public deleteComment(indexVideo: number, indexComment: number) {
    for (let comm of this.videos[indexVideo].comments) {
      if (comm.id == indexComment) {
        const indexComm = this.videos[indexVideo].comments.indexOf(comm);
        this.videos[indexVideo].comments.splice(indexComm, 1)
      }
    }

    console.log(this.videos[indexVideo]);
    this.videosService.updateVideo(indexVideo, this.videos[indexVideo]).subscribe();
  }
}