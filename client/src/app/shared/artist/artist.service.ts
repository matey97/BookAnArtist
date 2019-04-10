import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Artist} from '../../model/Artist';
import {Valoracion} from '../../model/Valoracion';

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

  postArtistProfile(artist): Observable<any> {
    return this.http.post('api/artista/' + artist.username, artist);
  }

  postAddValoration(valoration: Valoracion): Observable<any> {
    return this.http.post('api/artista/' + valoration.valorado + '/valoration', valoration);
  }


}
