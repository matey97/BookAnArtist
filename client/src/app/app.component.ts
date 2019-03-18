import {Component, OnInit} from '@angular/core';
import {UserService} from './shared/user/user.service';
import {Observable} from 'rxjs';
import 'hammerjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private title = 'BookAnArtist';

  private loguedUser = null;

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.userService.getLoguedUser().subscribe(user => {
      this.loguedUser = user;
    });
  }

}
