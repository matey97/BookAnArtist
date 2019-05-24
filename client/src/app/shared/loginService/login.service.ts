import {Inject, Injectable} from '@angular/core';
import {User} from '../../model/User';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

import {HttpClient} from '@angular/common/http';
import { Location} from '@angular/common';
import {UserService} from '../user/user.service';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  model: any = {};
  loguedUserName: string;
  user: User = null;
  data: any = [];
  client: Array<any> = new Array<any>();

  constructor(private http: HttpClient,
              private location: Location,
              @Inject(LOCAL_STORAGE) private storage: WebStorageService,
              private userService: UserService) {
}

  login(username, password) {
    const url = 'http://localhost:8080/login';
    this.http.post(url, {
      username,
      password
    }).subscribe(user => {
      if (user !== null) {
        if (user['usertype'] !== null) {
          sessionStorage.setItem('token', btoa(username + ':' + password));
          this.loguedUserName = user['username'];
          this.user = new User(user);
          // this.userService.setUserName(this.user.username);
          this.client.forEach(client => {
            client.onLoguedUserChanged(this.user);
          });
          this.location.back(); // Permite volver a la página anterior
        } else {
          alert('Authentication failed.');
        }
      } else {
        alert('Authentication failed.');
      }
    });
  }

  public getLoguedUser(client: any): Observable<any> {
    const presentClient = this.client.filter(c => c.constructor.name === client.constructor.name);
    if (presentClient.length === 0) {
      this.client = this.client.concat(client);
    }
    // console.log(this.client);
    const userDetails = atob(window.sessionStorage.getItem('token')).split(':', 2);
    if (this.user === null) {
      if (userDetails !== null && userDetails[0].length > 0) {
        return this.userService.getUserByUsername(userDetails[0]);
      } else {
        return of(null);
      }
    } else {
      return of(this.user);
    }
  }

  public setLoguedUser(user) {
    this.user = user;
    this.client.forEach(client => {
      client.onLoguedUserChanged(this.user);
    });
  }
}
