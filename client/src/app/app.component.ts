import {Component, OnInit} from '@angular/core';
import {UserService} from './shared/user/user.service';
import {Observable} from 'rxjs';
import 'hammerjs';
import {LoginComponent} from "./shared/login/login.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent implements OnInit {
  private title = 'BookAnArtist';

  private loguedUser = null;
  private logincomponent: LoginComponent;

  constructor(private userService: UserService,
              private loginService: LoginComponent) {

  }

  ngOnInit() {
    this.userService.getLoguedUser().subscribe(user => {
      if (user !== null) {
        this.loguedUser = user;
      }
    });
    const user = this.loginService.getLoguedUser();
    if (user !== null) {
      this.loguedUser = user;
    }
  }

}
