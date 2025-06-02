import { Component, OnInit } from '@angular/core';
import { CartService } from '../../cart.service';
import { CartItem } from '../../cart.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.loadCartItems().subscribe({
      next: (items) => {
        this.cartItems = items;  // Local component items
        console.log(this.cartItems);
      },
      error: (err) => {
        console.error('Failed to load cart items:', err);
      }
    });
  }
  

  getCartTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  removeItem(productId: number): void {
    console.log('Removing item with productId:', productId);
    console.log('Before removal:', this.cartItems);
  
    this.cartService.removeItem(productId).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter(item => {
          const keep = item.productId !== productId;
          if (!keep) console.log('Removing from local cart:', item);
          return keep;
        });
        console.log('After removal:', this.cartItems);
      },
      error: (err) => {
        console.error('Failed to remove item:', err);
      }
    });
  }
  
  
  
}
