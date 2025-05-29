import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import Chart from 'chart.js/auto';
import { SidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { OrderItems } from '../../services/order.service';
import { OrderItemsService } from '../../services/order-items.service';
import { Product, ProductService } from '../../services/product.service';
import { AnalyticsService } from '../../services/analytics.service';
import { error } from 'node:console';


@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, CommonModule, RouterModule, SidebarComponent, AdminNavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private orderItemsService: OrderItemsService , private productService: ProductService , private analyticsService : AnalyticsService ) { }

  username: string | null = localStorage.getItem("username");

  topSellingProducts: Product[] = [];

  recentOrders: Product[] = [];

  productsCount: number = 0 ;

  ordersCount: number = 0 ;

  totalSales: number = 0 ;

  totalUsers: number = 0 ;

  totalOrders: number = 0 ;


  xValues = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  yValues = [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0];

  categories = ["Electronics", "Fashion", "Furniture", "Sports", "Toys"];
  salesByCategory = [120, 90, 50, 30, 80];

  categoryColors = [
    "#6A5ACD", // Electronics
    "#FF69B4", // Fashion
    "#2E8B57", // Furniture
    "#FFD700", // Sports
    "#FF6347"  // Toys
  ];

  ngOnInit() {
    this.fetchRecentOrders();
    this.fetchTopProducts();
    this.fetchProductsCount();
    this.fetchOrdersCount();
    this.fetchTotalSales();
    this.fetchTotalUsers();
    this.fetchTotalOrders();
    this.fetchYearlySales();
  }
  
  fetchYearlySales(): void {
    this.analyticsService.getYearlySales().subscribe({
      next: (data) => {
        this.yValues = data;
        console.log(data);
        this.createChart(); // Create chart after data is loaded
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  
  createChart(): void {
    new Chart("myChart", {
      type: "line",
      data: {
        labels: this.xValues,
        datasets: [{
          label: 'Sales Trend',
          fill: false,
          borderColor: "rgba(0,0,255,1.0)",
          backgroundColor: "rgba(0,0,255,0.1)",
          data: this.yValues,
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            min: 0,
            max: Math.max(...this.yValues) + 100, // Dynamic max based on data
          }
        }
      }
    });
  }

  fetchRecentOrders(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.recentOrders = data.slice(0, 3);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  fetchTotalOrders(): void {
    this.analyticsService.getTotalOrders().subscribe({
      next: (data) => {
        this.totalOrders = data ; 
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  fetchTopProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.topSellingProducts = data.slice(0 , 5) ;
      }, 
      error: (err) => {
        console.error(err);
      }
    })
  }

  fetchProductsCount(): void {
    this.productService.getProductsCount().subscribe({
      next: (data) => {
        this.productsCount = data ;
      } ,
      error: (err) => {
        console.error(err);
      }
    })
  }

  fetchOrdersCount(): void {
    this.productService.getProductsCount().subscribe({
      next: (data) => {
        this.ordersCount = data ;
      }, 
      error: (err) => {
        console.error(err);
      }
    })
  }

  fetchTotalSales(): void {
    this.analyticsService.getTotalSales().subscribe({
      next: (data) => {
        this.totalSales = data ; 
      }, 
      error: (err) => {
        console.error(err);
      }
    })
  }

  fetchTotalUsers(): void {
    this.analyticsService.getTotalUsers().subscribe({
      next: (data) => {
        this.totalUsers = data; 
      },
      error: (err) => {
        console.error(err);
      }
    })
  }


}