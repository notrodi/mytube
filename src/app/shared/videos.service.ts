import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

export interface Video {
  id: number,
  title: string,
  src: string
}

@Injectable({
  providedIn: 'root'
})
export class VideosService {
  public videos: Video[] = [];
  public indexVideo: number = 0;
  public indexNextVideo: number = 3;
  public isMoreVideos: boolean = true;

  constructor(private httpClient: HttpClient) { }

  public fetchVideo(n: number) {
    for (this.indexVideo; this.indexVideo < n; this.indexVideo++) {
      this.httpClient.get<Video>(`http://localhost:3000/videos/${this.indexVideo}`).subscribe({
        next: (value: Video) => {
          this.videos.push(value)
        },
        error: (err) => {
          if (err.status == 404) {
            this.isMoreVideos = false;
          }
        }
      })
        
      }
    this.indexNextVideo++;
  }

}

