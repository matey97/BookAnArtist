import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../user/user.service';
import {AppComponent} from 'src/app/app.component';
import {User} from "../../model/User";
import {Observable} from "rxjs";

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    
    model: any = {};
    loguedUserName: string;
    user: User;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient,
        private userService: UserService,
        private appComponent: AppComponent
    ) { }

    ngOnInit() {
        sessionStorage.setItem('token', '');
    }

  login() {
    let url = 'http://localhost:8080/login';
    this.http.post<Observable<boolean>>(url, {
      username: this.model.username,
      password: this.model.password
    }).subscribe(isValid => {
      if (isValid) {
        sessionStorage.setItem('token', btoa(this.model.username + ':' + this.model.password));
        this.router.navigate(['user']);

      } else {
        alert("Authentication failed.")
      }
    });
  }


    public getLoguedUser(){
        return this.loguedUserName;
    }

}
