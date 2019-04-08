import { Injectable } from '@angular/core';
import {User} from '../../model/User';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../user/user.service';
import {Observable} from "rxjs";
import { Location} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  model: any = {};
  loguedUserName: string;
  user: User;

  constructor(private http: HttpClient,
              private location: Location) { }

  login(username, password) {
    const url = 'http://localhost:8080/login';
    this.http.post(url, {
      username,
      password
    }).subscribe(user => {
      if (user !== null) {
        if (user['usertype'] !== null) {
          sessionStorage.setItem('token', btoa(this.model.username + ':' + this.model.password));
          this.loguedUserName = user['username'];
          this.user = new User(user);
          console.log(this.user);
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
