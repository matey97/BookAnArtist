import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../user/user.service';
import {User} from "../../model/User";
import {Observable} from "rxjs";
import { Location} from '@angular/common';
import {LoginService} from '../loginService/login.service';

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
        private location: Location,
        private loginService: LoginService
    ) { }

    ngOnInit() {
        sessionStorage.setItem('token', '');
    }

  login() {
      this.loginService.login(this.model.username, this.model.password);
  }

}
