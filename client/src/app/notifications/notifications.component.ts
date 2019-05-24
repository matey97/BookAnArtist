import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LoginService} from '../shared/loginService/login.service';
import {User} from '../model/User';
import {Notification} from '../model/Notification';
import {NotificationService} from '../shared/notification/notification.service';
import {Observable, EMPTY} from 'rxjs';
import {MatSnackBar} from '@angular/material';

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
  refreshing = false;

  notificationSorter = (n1, n2) => {
    return n2.date - n1.date;
  }

  constructor(private loginService: LoginService,
              private notificationService: NotificationService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.newNotifications = new Array<Notification>();
    this.seenNotifications = new Array<Notification>();
    this.recentySeen = new Array<Notification>();
    this.loginService.getLoguedUser(this).subscribe(user => {
      this.user = user;
      this.seenNotifications = this.user.notifications.filter(notification => notification.seen);
      this.newNotifications = this.user.notifications.filter(notification => !notification.seen);

      this.seenNotifications.sort(this.notificationSorter);
      this.newNotifications.sort(this.notificationSorter);
      // console.log(this.user);
    });
  }

  public onLoguedUserChanged(user: User) {
    this.user = user;
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
    // console.log(this.recentySeen);
    if (this.recentySeen.length !== 0) {
       // console.log(this.recentySeen.length);
       this.notificationService.seenNotificationBatch(this.recentySeen).subscribe(() => {
         this.recentySeen = new Array<Notification>();
       });
    }
  }

  public refreshNotifications() {
    this.refreshing = true;
    if (this.recentySeen.length !== 0) {
      this.notificationService.seenNotificationBatch(this.recentySeen).subscribe(() => {
        this.recentySeen = new Array<Notification>();
        this.doRefresh();
      });
    } else {
      this.doRefresh();
    }
  }

  private doRefresh() {
    let updated = false;
    this.notificationService.getUserNotifications(this.user.username).subscribe(notifications => {
      notifications.filter(n => n.seen === false).forEach(n => {
        if (this.newNotifications.findIndex( elem => elem.id === n.id) === -1) {
          this.newNotifications.push(n);
          updated = true;
        }
      });
      if (updated) {
        this.newNotifications.sort(this.notificationSorter);
      }
      this.refreshing = false;
    }, error1 => {
      this.refreshing = false;
      this.snackBar.open('Ha ocurrido un error', 'Cerrar', {duration: 3000});
    });
  }
}
