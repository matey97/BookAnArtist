import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BASE_URL} from '../Services';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(BASE_URL + '/artistas');
  }
}
