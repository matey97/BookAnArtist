import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from './shared/user/user.service';
import {Observable} from 'rxjs';
import 'hammerjs';
import {LoginService} from './shared/loginService/login.service';
import {Location} from '@angular/common';
import {HttpHeaders} from '@angular/common/http';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent implements OnInit {
  private title = 'BookAnArtist';

  private loguedUser = null;
  private userImage = null;

  constructor(private userService: UserService,
              private loginService: LoginService,
              private location: Location,
              @Inject(LOCAL_STORAGE) private storage: WebStorageService
  ) {

  }

  ngOnInit() {

    this.location.subscribe(() => this.loguedUser = this.loginService.getLoguedUser());
    const user = this.loginService.getLoguedUser();
    //const session = this.loginService.data['token'];
    // const session = this.storage.get('token;');
    //console.log('AppComponent --> ' + session);

    console.log(window.sessionStorage.getItem('token'));
    console.log(atob(window.sessionStorage.getItem('token')));
    const userDetails = atob(window.sessionStorage.getItem('token')).split(':', 2);
    console.log('userdetails ---->' + userDetails);
    this.loginService.login(userDetails[0], userDetails[1]);
    if (user !== null  ) {
      this.loguedUser = user;
      // this.userImage = user.images[0].image;
     // console.log(userImage);
    }
  }
}
