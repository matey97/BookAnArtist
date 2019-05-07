import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Reclamation} from '../../model/Reclamation';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  constructor(private http: HttpClient) { }

  postReclamation(reclamation: Reclamation): Observable<any> {
    return this.http.post('api/reclamation/', reclamation);
  }
}
