import {Inject, Injectable} from '@angular/core';
import {User} from '../../model/User';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

import {HttpClient} from '@angular/common/http';
import { Location} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  model: any = {};
  loguedUserName: string;
  user: User = null;
  data: any = [];

  constructor(private http: HttpClient,
              private location: Location,
              @Inject(LOCAL_STORAGE) private storage: WebStorageService) {
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
          this.location.back(); // Permite volver a la página anterior
        } else {
          alert('Authentication failed.');
        }
      } else {
        alert('Authentication failed.');
      }
    });
  }

  public getLoguedUser() {
    return this.user;
  }
}
