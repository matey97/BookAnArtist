import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  model: any = {};

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private http: HttpClient
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
          } else {
              alert('Authentication failed.');
          }
      });
  }

}
