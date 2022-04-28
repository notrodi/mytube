import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Video {
  id: number,
  title: string,
  src: string,
  comments: string[],
  currentComment: string
}

@Injectable({
  providedIn: 'root'
})
export class VideosService {

  constructor(private httpClient: HttpClient) { }

  public fetchVideo(index: number): any {
    return this.httpClient.get<Video>(`http://localhost:3000/videos/${index}`)
  }

  public updateVideo(index: number, video: object): any {
    return this.httpClient.put<Video>(`http://localhost:3000/videos/${index}`, video)
  }

}

