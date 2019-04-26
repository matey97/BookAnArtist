import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LoginService} from '../shared/loginService/login.service';
import {User} from '../model/User';
import {Notification} from '../model/Notification';
import {NotificationService} from '../shared/notification/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotificationsComponent implements OnInit {

  user: User;

  newNotifications: Array<Notification>;
  recentySeen: Array<Notification>;
  seenNotifications: Array<Notification>;

  showSeenNotifications = false;

  notificationSorter = (n1, n2) => {
    return n1.date - n2.date;
  }

  constructor(private loginService: LoginService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.user = this.loginService.getLoguedUser();
    this.recentySeen = new Array<Notification>();
    this.seenNotifications = this.user.notifications.filter(notification => notification.seen);
    this.newNotifications = this.user.notifications.filter(notification => !notification.seen);

    this.seenNotifications.reverse();
    this.newNotifications.reverse();
    console.log(this.user);
  }

  public getDate(timestamp: number): string {
    return new Date(timestamp).toLocaleString();
  }

  public newNotificationSeen(notification: Notification) {
    notification.seen = true;
    this.newNotifications = this.newNotifications.filter(n => n !== notification);
    this.recentySeen.push(notification);
    this.seenNotifications.push(notification);
    this.seenNotifications.sort(this.notificationSorter);
  }

  public notificationBoxClosed() {
    this.showSeenNotifications = false;
    this.notificationService.seenNotificationBatch(this.recentySeen).subscribe(value => {
      console.log('Exito');
    });
    this.recentySeen = new Array<Notification>();
  }
}
