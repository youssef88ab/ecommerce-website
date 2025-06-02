import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../../cart.service';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true
})
export class HomeComponent implements OnInit{
  hasCart: boolean = false;
  cartItems: any[] = [];

  constructor(private cartService: CartService) {}
  
  ngOnInit(): void {
    this.cartService.getCart().subscribe({
      next: (data) => {
        this.cartItems = data.items; // adapt to your actual API response
        this.hasCart = this.cartItems.length > 0;
      },
      error: (err) => {
        if (err.status === 401) {
          console.warn('User is not logged in.');
        } else {
          console.error('Error fetching cart:', err);
        }
        this.hasCart = false;
      }
    });
  
} }
