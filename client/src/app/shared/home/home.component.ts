import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap} from 'rxjs/operators';
import {LoginService} from '../loginService/login.service';
import {User} from '../../model/User';
import {UserService} from '../user/user.service';
import {AppComponent} from '../../app.component';
@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

    selectedFile = null;
    username: string;
    loggedUser: User;
    image: any;

    constructor(private http: HttpClient,
                private loginService: LoginService,
                private appComponent: AppComponent
               ) { }

    ngOnInit() {
        const url = 'http://localhost:8080/user';

        const headers: HttpHeaders = new HttpHeaders({
            Authorization: 'Basic ' + sessionStorage.getItem('token')
        });
        console.log(sessionStorage.getItem('token'));
        const options = { headers };
        this.http.post<Observable<object>>(url, {}, options).
            subscribe(principal => {
              console.log(principal);
                this.username = principal['name'];
                this.loginService.getLoguedUser(this).subscribe(user => {
                  this.loggedUser = user;
                });
            },
            error => {
                if (error.status == 401) {
                    alert('Unauthorized');
                }
            }
        );
    }

    logout() {
        sessionStorage.setItem('token', '');
        this.loginService.setLoguedUser(null);
    }
    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          console.error('An error occurred:', error.error.message);
        } else {
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        return throwError(
          'Something bad happened; please try again later.');
    }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
     const uploadData = new FormData();
     uploadData.append('myFile' , this.selectedFile, this.selectedFile.name);
     this.http.post('api/' + this.username + '/uploadusrimg', uploadData)
      .subscribe(image => {
        this.loggedUser.image = image['raw'];
        this.appComponent.onLoguedUserChanged(this.loggedUser);
      });
  }
}
