import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface ShippingDetails {
  id : number , 
  address	: string , 
	city : string , 
	country	: string , 
	delivered_at : string , 
	estimated_delivery_date	: string , 
	postal_code	: number , 
	recipient_phone : string 
}

@Injectable({
  providedIn: 'root'
})
export class ShippingDetailsService {

  private apiUrl = "'http://127.0.0.1:8080/api/shippingDetails" ; 

  constructor(private http: HttpClient) { }

}
