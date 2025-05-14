import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Order, OrderItems, OrderService } from '../../services/order.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ShippingDetails, ShippingDetailsService } from '../../services/shipping-details.service';
import { DelivrerSidebarComponent } from '../../components/delivrer-sidebar/delivrer-sidebar.component';

@Component({
  selector: 'app-delivrer',
  standalone: true, // Added standalone flag
  imports: [SidebarComponent, NavbarComponent, FormsModule, CommonModule, RouterModule, MatButtonModule, MatMenuModule, MatIconModule, DelivrerSidebarComponent],
  templateUrl: './delivrer.component.html',
  styleUrl: './delivrer.component.css'
})
export class DelivrerComponent implements OnInit {
  keyword: string = '';
  orders: Order[] = []; // Added orders array to store fetched orders

  ordersNumber: number = 0 ; 

  // Fixed order type declaration
  order: Order = {
    orderId: 0,
    userId: 0,
    username: '',
    email: '',
    totalPrice: 0,
    status: '',
    orderDate: '',
    orderItems: [],
    shippingDetails: {
      id: 0,
      address: '',
      city: '',
      country: '',
      delivered_at: '',
      estimated_delivery_date: '',
      postal_code: 0,
      recipient_phone: ''
    },
    paymentId: 0
  };

  constructor(
    private orderService: OrderService,
    private shippingDetailsService: ShippingDetailsService
  ) { }

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void { // Added return type and implementation
    this.orderService.findByStatus('SHIPPED').subscribe({
      next: (orders) => {
        console.log(orders);
        this.orders = orders;
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
      }
    });
  }

  onSearch(keyword: string) {

  }

  livraison(id : number): void {
    this.orderService.livraison(id).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.error("Error Livraison");
      }
    })
  }

}