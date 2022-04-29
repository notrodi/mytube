import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom, Observer } from 'rxjs';

export interface Video {
  then: any;
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

  public fetchVideo(index: number): Observable<Video> {
    return this.httpClient.get<Video>(`http://localhost:3000/videos/${index}`)
  }

  public updateVideo(index: number, video: object): Observable<Video> {
    return this.httpClient.put<Video>(`http://localhost:3000/videos/${index}`, video)
  }

}

