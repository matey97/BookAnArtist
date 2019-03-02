import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BASE_URL} from '../Services';
@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  constructor(private http: HttpClient) { }

  getImage(id: number): Observable<any> {
    return this.http.get(BASE_URL + '/image/' + id);
  }

  getVideo(id: number): Observable<any> {
    return this.http.get(BASE_URL + '/video/' + id);
  }
}
