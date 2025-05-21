import { Injectable } from '@angular/core';
import { Order } from './order.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Payment {
id : number , 
paymentDate : string , 
paymentMethod : string , 
paymentStatus : string , 
transactionId : number , 
order : Order
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'http://127.0.0.1:8080/api/payments'; 

  constructor(private http: HttpClient ) { }

  getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.apiUrl);
  }

  getPayment(id : number): Observable<Payment> {
    return this.http.get<Payment>(`${this.apiUrl}/${id}`);
  }
}
