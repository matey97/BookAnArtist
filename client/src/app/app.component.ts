import {Component, OnInit} from '@angular/core';
import {UserService} from './shared/user/user.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private title = 'BookAnArtist';

  private loguedUser = null;
  private isArtist = false;

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.userService.getMockLoguedUser().subscribe(user => {
      this.loguedUser = user;
      if (this.loguedUser.userType === 2) {
        this.isArtist = true;
      }
      console.log(this);
    });
  }

}
