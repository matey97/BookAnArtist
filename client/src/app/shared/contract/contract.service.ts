import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Contract} from '../../model/Contract';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(private http: HttpClient) { }

  postContract(contract: Contract): Observable<any> {
    return this.http.post('api/contract/' + contract.artisticUsername + '_' + contract.organizerUsername, contract);
  }

  getOrganizerContracts(username: string): Observable<any> {
    return this.http.get('api/org-contract-list/' + username);
  }

  getArtistContracts(username: string): Observable<any> {
    return this.http.get('api/art-contract-list/' + username);
  }

  acceptContract(id: number): Observable<any> {
    return this.http.put('api/contract/accept/' + id, null);
  }

  declineContract(id: number): Observable<any> {
    return this.http.put('api/contract/decline/' + id, null);
  }

  cancelContract(id: number): Observable<any> {
    return this.http.put('api/contract/cancel/' + id, null);
  }
}
