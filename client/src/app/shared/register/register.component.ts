import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from '../../model/User';
import {LoginService} from '../loginService/login.service';
import {AppComponent} from '../../app.component';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  loggedUser: User;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private http: HttpClient,
      private loginService: LoginService,
      private appComponent: AppComponent
  ) { }

  ngOnInit() {
      sessionStorage.setItem('token', '');
  }

  SignUp() {
      const url = 'http://localhost:8080/register';
      this.http.post<Observable<boolean>>(url, {
          username: this.model.username,
          password: this.model.password,
          email: this.model.email,
          usertype: this.model.usertype
      }).subscribe(user => {
          if (user !== null) {
            sessionStorage.setItem('token', btoa(this.model.username + ':' + this.model.password));
            this.router.navigate(['user/' + this.model.username]);
            this.loginService.getLoguedUser(this).subscribe(userddbb => {
              this.loggedUser = userddbb;
              this.appComponent.onLoguedUserChanged(userddbb);
            });
          } else {
              alert('Authentication failed.');
          }
      });
  }

  public onLoguedUserChanged(user: User) {
    this.loggedUser = user;
  }

}
