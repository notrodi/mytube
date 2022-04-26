import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable, tap } from 'rxjs';

export interface Video {
  id: number,
  src: string
}

@Injectable({
  providedIn: 'root'
})
export class VideosService {
  public videos: Video[] = [];

  constructor(private httpClient: HttpClient) { }

  public fetchVideo(): void {
    firstValueFrom(this.httpClient.get<Video[]>('http://localhost:3000/videos')).then((videos: Video[]) => {
      this.videos = videos;
    })
  }

}
