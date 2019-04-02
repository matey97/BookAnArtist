import {Contract} from './Contract';

export class User {
  username: string;
  password: string;
  email: string;
  role: 'ARTIST' | 'ADMIN' | 'ORGANIZER';
  image: string;
  contracts: Array<Contract>;
}
