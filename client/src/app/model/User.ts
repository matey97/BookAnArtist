export class User {
  username: string;
  password: string;
  email: string;
  userType: 'ARTIST' | 'ADMIN' | 'ORGANIZER';
  image: string;
}