import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Payment} from '../../model/Payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  doPayment(payment: Payment): Observable<any> {
    return this.http.post('api/payment/pay' , payment);
  }

  doReceipt(payment: Payment): Observable<any> {
    return this.http.post('api/payment/receipt' , payment);
  }

  doDevolution(payment: Payment): Observable<any> {
    return this.http.post('api/payment/devolution' , payment);
  }


}
