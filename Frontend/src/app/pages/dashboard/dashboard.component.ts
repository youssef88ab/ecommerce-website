import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import Chart from 'chart.js/auto';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { OrderItems } from '../../services/order.service';
import { OrderItemsService } from '../../services/order-items.service';
import { Product, ProductService } from '../../services/product.service';


@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, CommonModule, RouterModule, SidebarComponent, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private orderItemsService: OrderItemsService , private productService: ProductService) { }

  username: string | null = localStorage.getItem("username");

  topSellingProducts: Product[] = [];

  recentOrders: OrderItems[] = [];

  productsCount: number = 0 ;

  ordersCount: number = 0 ;



  xValues = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  yValues = [200, 400, 550, 600, 300, 200, 250, 230, 500, 600, 400, 600];

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

    new Chart("myChart", {
      type: "line",
      data: {
        labels: this.xValues,
        datasets: [{
          label: 'Sales Trend',  // Add label for clarity
          fill: false,
          borderColor: "rgba(0,0,255,1.0)",
          backgroundColor: "rgba(0,0,255,0.1)",
          data: this.yValues,
          tension: 0.1 // Change from lineTension to tension
        }]
      },
      options: {
        responsive: true, // Ensure responsiveness
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            min: 0,
            max: 800,
          }
        }
      }
    });
  }


  fetchRecentOrders(): void {

    this.orderItemsService.getOrders().subscribe({
      next: (data) => {
        this.recentOrders = data.slice(0, 3);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  fetchTopProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.topSellingProducts = data.slice(0 , 3) ;
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

}
