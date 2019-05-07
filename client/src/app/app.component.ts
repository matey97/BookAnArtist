import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from './shared/user/user.service';
import {Observable} from 'rxjs';
import 'hammerjs';
import {LoginService} from './shared/loginService/login.service';
import {Location} from '@angular/common';
import {HttpHeaders} from '@angular/common/http';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {User} from './model/User';

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
    this.loginService.getLoguedUser(this).subscribe(user => {
      this.loguedUser = user;
      console.log(this.loguedUser);
    });
  }
  onLoguedUserChanged(user: User) {
    this.loguedUser = user;
  }
}
