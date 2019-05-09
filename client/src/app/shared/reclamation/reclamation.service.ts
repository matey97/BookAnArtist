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

  getReclamationByUser(username: string): Observable<any> {
    return this.http.get('api/reclamation/user/' + username);
  }

  getAllReclamations(): Observable<any> {
    return this.http.get('api/reclamation/all');
  }

  archiveReclamation(id: number): Observable<any> {
    return this.http.put('api/reclamation/' + id + '/archive', null);
  }

  cancelReclamation(id: number): Observable<any> {
    return this.http.put('api/reclamation/' + id + '/cancel', null);
  }

  acceptReclamation(id: number): Observable<any> {
    return this.http.put('api/reclamation/' + id + '/accept', null);
  }

  updateReclamation(reclamation: Reclamation): Observable<any> {
    return this.http.put('api/reclamation/' + reclamation.id + '/update', reclamation);
  }
}
