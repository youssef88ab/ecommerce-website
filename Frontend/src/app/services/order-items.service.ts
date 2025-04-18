import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderItems } from './order.service';


@Injectable({
  providedIn: 'root'
})
export class OrderItemsService {

  private apiUrl = "http://127.0.0.1:8080/api/orderItems" ;

  constructor(private http: HttpClient) { }
  
    getOrders(): Observable<OrderItems[]> {
      return this.http.get<OrderItems[]>(this.apiUrl);
    }

}
