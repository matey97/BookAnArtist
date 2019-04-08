import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { LoginComponent } from '../login/login.component';
import { AppComponent } from 'src/app/app.component';
import {User} from "../../model/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loguedUserName: string;
  logincomponent: LoginComponent;
  user: User;

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get('api/users');
  }

  getLoguedUser(): Observable<any> {
    return this.http.get<any>('api/user/' + this.loguedUserName);
  }

  public setUser(user: User){
    this.user = user;
  }
  public getUser(): User {
    return this.user;
  }

// getLoguedUser(): User {
  //
  //   return this.logincomponent.getLoguedUser();
  // }

  getProfileImage(userName: string): Observable<any> {
    return this.http.get('api/user-image/' + userName);
  }

  public setUserName(name: string){
    this.loguedUserName = name;
  }
}
