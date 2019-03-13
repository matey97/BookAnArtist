import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { LoginComponent } from '../login/login.component';
import { AppComponent } from 'src/app/app.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loguedUserName: string;

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get('api/users');
  }

  getLoguedUser(): Observable<any> {
    return this.http.get('api/user/' + this.loguedUserName);
  }

  getProfileImage(userName: string): Observable<any> {
    return this.http.get('api/user-image/' + userName);
  }

  public setUserName(name: string){
    this.loguedUserName = name;
  }
}
