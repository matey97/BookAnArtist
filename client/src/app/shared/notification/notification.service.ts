import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Notification} from '../../model/Notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  public seenNotificationBatch(notifications: Array<Notification>): Observable<any> {
    return this.http.post('api/notification/seen', notifications);
  }
}
