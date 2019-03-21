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
}
