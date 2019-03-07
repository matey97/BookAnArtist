import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get('api/artistas');
  }

  getArtistByUsername(username: string): Observable<any> {
    return this.http.get('api/artista/' + username);
  }

  postArtistProfile(artistObj, imagesObj, videosObj): Observable<any> {
    return this.http.post('api/artista/' + artistObj.username, {artist: artistObj, images: imagesObj, videos: videosObj});
  }
}
