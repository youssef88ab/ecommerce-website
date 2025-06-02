import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface CartItem {
  productId: number;
  productName: string;
  imageUrl: string;
  price: number;
  quantity: number;
}


@Injectable({
  providedIn: 'root'
})

export class CartService {

  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();
  private apiUrl = 'http://localhost:8080/cart/init';
  private cartItems: CartItem[] = [];

  constructor(private http: HttpClient) {}

  getCart(): Observable<any> {
    return this.http.get(`${this.apiUrl}`, {
      withCredentials: true 
    });
  }

  loadCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>('http://localhost:8080/cart/items', { withCredentials: true }).pipe(
      tap(items => {
        this.cartItems = items;              // Update local items
        this.cartCountSubject.next(items.length);  // Update count accordingly
      })
    );
  }

  // Replace previous loadCartCount with this one
  loadCartCount(): void {
    // Just call loadCartItems and subscribe internally (or you can just call loadCartItems from component)
    this.loadCartItems().subscribe();
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }
  
  removeItem(productId: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/cart/delete/${productId}`, { withCredentials: true }).pipe(
      tap(() => {
        // Update local cart items array
        this.cartItems = this.cartItems.filter(item => item.productId !== productId);
        // Update cart count
        this.cartCountSubject.next(this.cartItems.length);
      })
    );
  }
  
  
}
