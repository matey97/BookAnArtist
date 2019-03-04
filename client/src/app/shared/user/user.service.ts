import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get('api/users');
  }

  getProfileImage(userName: string): Observable<any> {
    return this.http.get('api/user-image/' + userName);
  }
}
