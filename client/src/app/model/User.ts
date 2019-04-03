import {Contract} from './Contract';

export class User {
  username: string;
  password: string;
  email: string;
  usertype: 'ARTIST' | 'ADMIN' | 'ORGANIZER';
  image: string;
  contracts: Array<Contract>;

  User(object: any) {
    this.username = object.username;
    this.email = object.email;
    this.password = object.password;
    this.usertype = object.usertype;
    this.image = object.image;
  }
}
