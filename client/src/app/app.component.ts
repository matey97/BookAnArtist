import {Component, OnInit} from '@angular/core';
import {UserService} from './shared/user/user.service';
import {Observable} from 'rxjs';
import 'hammerjs';
import {LoginService} from './shared/loginService/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent implements OnInit {
  private title = 'BookAnArtist';

  private loguedUser = null;

  constructor(private userService: UserService,
              private loginService: LoginService) {

  }

  ngOnInit() {
    const user = this.loginService.getLoguedUser();
    console.log(user);
    if (user !== null) {
      this.loguedUser = user;
    }
  }

}
