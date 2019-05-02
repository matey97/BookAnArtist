import {Contract} from './Contract';
import {Valoracion} from './Valoracion';
import {Notification} from './Notification';

export class User {
  username: string;
  password: string;
  email: string;
  usertype: 'ARTIST' | 'ADMIN' | 'ORGANIZER';
  image: Array<any>;
  contracts: Array<Contract>;
  notifications: Array<Notification>;
  puntuation: number;
  valoraciones: Array<Valoracion>;

  constructor(object: any) {
    this.username = object.username;
    this.email = object.email;
    this.password = object.password;
    this.usertype = object.usertype;
    this.image = object.image;
    this.contracts = object.contracts;
    this.notifications = object.notifications;
    this.puntuation = object.puntuacion;
    this.valoraciones = object.valoraciones;
  }
}
