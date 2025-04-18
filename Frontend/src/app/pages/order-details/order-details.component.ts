import { Component } from '@angular/core';
import { Order , OrderService , OrderItems } from '../../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { faCalendar} from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faCreditCard} from '@fortawesome/free-solid-svg-icons';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { ShippingDetails } from '../../services/shipping-details.service';

@Component({
  selector: 'app-order-details',
  imports: [FormsModule, CommonModule , RouterModule, SidebarComponent, NavbarComponent , FontAwesomeModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent {

  // Icons ;
  faBagShopping = faBagShopping;
  faCalendar = faCalendar;
  faCreditCard = faCreditCard;
  faUser = faUser;
  faTruck = faTruck;
  faDollarSign = faDollarSign;

    orderId!: number;

    OrderItems = {
      id : 0 ,
      quantity : 0 ,
      price : 0 ,
      productName: ''
    }

    // Initialize with proper types
  shippingDetails: ShippingDetails = {
    id: 0, 
    address: '', 
    city: '', 
    country: '', 
    delivered_at: '', 
    estimated_delivery_date: '', 
    postal_code: 0, 
    recipient_phone: '' 
  };
  
  order: Order = {
    orderId: 0, 
    userId: 0, 
    totalPrice: 0, 
    email: '', 
    username: '',
    status: 'PENDING', 
    orderDate: '', 
    orderItems: [], 
    shippingDetails: this.shippingDetails, 
    paymentId: 0 
  };
  
  
    constructor(
      private route: ActivatedRoute,
      private orderService: OrderService
    ) {}
  
    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        this.orderId = parseInt(params.get('orderId') || '0', 10);
        console.log('Extracted orderId from route:', this.orderId); // Debug
        if (this.orderId) {
          this.fetchorder(this.orderId);
        } else {
          console.log('No valid orderId found in route');
        }
      });
    }
  
    fetchorder(orderId: number): void {
      this.orderService.getOrder(orderId).subscribe({
        next: (data) => {
          this.order = data;
          console.log('Fetched order:', this.order); // Debug
        },
        error: (err) => {
          console.error('Error fetching order:', err);
        }
      });
    }

    cancelorder(id : number) : void {
      this.orderService.cancelOrder(this.orderId).subscribe({
        next: (data) => {
          console.log("Canceled Order : " , data);
        },
        error: (err) => {
          console.error("Error Canceleing Order :" , err);
        }
    })

      

    }
}
