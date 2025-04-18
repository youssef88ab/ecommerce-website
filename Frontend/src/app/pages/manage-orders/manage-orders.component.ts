import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { OrderService, Order } from '../../services/order.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-manage-orders',
  imports: [
    CommonModule,
    SidebarComponent,
    NavbarComponent,
    FormsModule,
    RouterModule,
    MatButtonModule , 
    MatIconModule , 
    MatMenuModule
  ],
  templateUrl: './manage-orders.component.html',
  styleUrl: './manage-orders.component.css',
})
export class ManageOrdersComponent implements OnInit {

  ordersCount: number = 0 ;

  Orders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.fetchOrders();
    this.getOrdersCount();
  }

  fetchOrders(): void {
    this.orderService.getOrders().subscribe({
      next: (data) => {
        this.Orders = data;
        console.log('Fetched Orders:', data); // Log the response data
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  CancelOrder(id: number): void {
    if (confirm('Are You Sure You Want To Cancel This Order')) {
      this.orderService.cancelOrder(id).subscribe({
        error: (err) => {
          console.error(err);
        },
      });
    }
  }

  getOrdersCount(): void {
    this.orderService.getOrdersCount().subscribe({
      next: (data) => {
        this.ordersCount = data ;
      },
      error: (err) => {
        console.error(err);
      } 
    })
  }

  formatDate(fulldate: string): string {
    var date: string[] = fulldate.split('T');
    return `${this.formatDate1(date[0])} , ${date[1]}`;
  }

  formatDate1(fulldate: string): string {
    var arr: string[] = fulldate.split('T');
    var date = arr[0].split('-');
    var year = date[0];  
    var monthnum : number = parseInt(date[1],10);
    var day = date[2];
    var monthstr : string = '' ;

    switch (monthnum) {
      case 1: 
        monthstr = 'January';
        break;
      case 2: 
        monthstr = 'February';
        break;
      case 3: 
        monthstr = 'March';
        break;
      case 4: 
        monthstr = 'April';
        break;
      case 5: 
        monthstr = 'May';
        break;
      case 6: 
        monthstr = 'June';
        break;
      case 7: 
        monthstr = 'July';
        break;
      case 8: 
        monthstr = 'August';
        break;
      case 9: 
        monthstr = 'September';
        break;
      case 10: 
        monthstr = 'October';
        break;
      case 11: 
        monthstr = 'November';
        break;
      case 12: 
        monthstr = 'December';
        break;
      default: 
        monthstr = 'Invalid month'; 
    }
    

    return (`${year}, ${monthstr}, ${day}`);
  }

  
}
