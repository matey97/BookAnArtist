import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { LoginComponent } from '../login/login.component';
import { AppComponent } from 'src/app/app.component';
import {User} from '../../model/User';
import {Valoracion} from '../../model/Valoracion';
import {Form} from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  loguedUserName: string;
  user: User;

  constructor(private http: HttpClient) { }

  getUserByUsername(username: string): Observable<any> {
    return this.http.get<any>('api/user/' + username);
  }

  getProfileImage(userName: string): Observable<any> {
    return this.http.get('api/user-image/' + userName);
  }

  public setUserName(name: string) {
    this.loguedUserName = name;
  }

  postAddValoration(valoration: Valoracion): Observable<any> {

    return this.http.post('api/user/' + valoration.valorado + '/valoration', valoration);
  }

  postDeleteValoracion(valoracion: Valoracion): Observable<any> {
    return this.http.delete('api/user/valoration/' + valoracion.id );
  }

  editUserData(user: User): Observable<any> {

    return this.http.post('api/user/' + user.username + '/updatedata', user);
  }

  postEditValoracion(valoracion: Valoracion): Observable<any> {
    return this.http.post('api/user/valoration/' + valoracion.id , valoracion);

  }
}
