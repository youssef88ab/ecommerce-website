import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/admin-sidebar/admin-sidebar.component';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { CommonModule } from '@angular/common';
import { OrderService, Order } from '../../services/order.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-manage-orders',
  imports: [
    CommonModule,
    SidebarComponent,
    AdminNavbarComponent,
    FormsModule,
    RouterModule,
    MatButtonModule , 
    MatIconModule , 
    MatMenuModule,
    FontAwesomeModule
  ],
  templateUrl: './manage-orders.component.html',
  standalone: true,
  styleUrl: './manage-orders.component.css',
})
export class ManageOrdersComponent implements OnInit {

  keyword: string = '';
  selectedStatus: string = '';
  originalOrders: any[] = [];  // Store original list of orders

  ordersCount: number = 0 ;

  Orders: Order[] = [];

  paginatedOrders: Order[] = [];  // <-- this will hold orders for current page

  // Pagination variables
  currentPage: number = 1;
  itemsPerPage: number = 10;  // choose how many items per page
  totalPages: number = 0;
  Math = Math;

  faMagnifyingGlass = faMagnifyingGlass;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.fetchOrders();
    this.getOrdersCount();
  }

  fetchOrders(): void {
    this.orderService.getOrders().subscribe({
      next: (data) => {
        this.originalOrders = data;  // Store original list
        this.Orders = data;
        this.totalPages = Math.ceil(this.Orders.length / this.itemsPerPage);
        this.updatePaginatedOrders();
        console.log('Fetched Orders:', data);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  updatePaginatedOrders(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedOrders = this.Orders.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedOrders();
    }
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

  onSearch(keyword: string): void {
    if (keyword == '') {
      this.Orders = [...this.originalOrders];  // Reset to original list
      this.applyStatusFilter();
    }
    else {
      this.orderService.searchOrders(keyword).subscribe({
        next: (data: Order[]) => {
          this.Orders = data;
          this.applyStatusFilter();
        },
        error: (err: any) => {
          console.error('Error Searching Orders');
        }
      });
    }
  }

  onStatusChange(): void {
    this.Orders = [...this.originalOrders];  // Reset to original list
    if (this.keyword) {
      this.onSearch(this.keyword);  // Re-apply search if there's a keyword
    } else {
      this.applyStatusFilter();  // Just apply status filter
    }
  }

  applyStatusFilter(): void {
    if (this.selectedStatus) {
      this.Orders = this.Orders.filter(order => order.status === this.selectedStatus);
    }
    this.ordersCount = this.Orders.length;
    this.totalPages = Math.ceil(this.Orders.length / this.itemsPerPage);
    this.currentPage = 1;
    this.updatePaginatedOrders();
  }

  deleteOrder(id: number): void {
    if (confirm('Are You Sure You Want To Delete This Order')) {
      this.orderService.deleteOrder(id).subscribe({
        error: (err) => {
          console.error(err);
        },
      });
    }
  }
}