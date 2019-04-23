import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LoginService} from '../shared/loginService/login.service';
import {User} from '../model/User';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotificationsComponent implements OnInit {

  user: User;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.user = this.loginService.getLoguedUser();
    console.log(this.user);
  }

  public getDate(timestamp: number): string{
    return new Date(timestamp).toLocaleString();
  }
}
