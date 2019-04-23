import {Contract} from './Contract';
import {Notification} from './Notification';

export class User {
  username: string;
  password: string;
  email: string;
  usertype: 'ARTIST' | 'ADMIN' | 'ORGANIZER';
  image: string;
  contracts: Array<Contract>;
  notifications: Array<Notification>;

  constructor(object: any) {
    this.username = object.username;
    this.email = object.email;
    this.password = object.password;
    this.usertype = object.usertype;
    this.image = object.image;
    this.contracts = object.contracts;
    this.notifications = object.notifications;
  }
}
