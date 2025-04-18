import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

interface SalesSummary {
  revenue: number;
  orders: number;
  avgOrderValue: number;
  conversionRate: number;
}

interface TopProduct {
  id: string;
  name: string;
  sales: number;
  revenue: number;
  image: string;
}

@Component({
  selector: 'app-analytics',
  imports: [SidebarComponent , NavbarComponent],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent implements OnInit  {

  salesSummary: SalesSummary = {
    revenue: 152490,
    orders: 1842,
    avgOrderValue: 82.78,
    conversionRate: 3.2
  };

  topProducts: TopProduct[] = [
    { id: 'P001', name: 'Wireless Headphones', sales: 142, revenue: 7100, image: 'assets/products/headphones.jpg' },
    { id: 'P002', name: 'Smart Watch', sales: 98, revenue: 12740, image: 'assets/products/watch.jpg' },
    { id: 'P003', name: 'Bluetooth Speaker', sales: 87, revenue: 4350, image: 'assets/products/speaker.jpg' },
    { id: 'P004', name: 'Laptop Backpack', sales: 76, revenue: 3040, image: 'assets/products/backpack.jpg' }
  ];

  revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Revenue',
      data: [65000, 59000, 80000, 81000, 56000, 152490],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  };

  salesByCategory = {
    labels: ['Electronics', 'Clothing', 'Home & Kitchen', 'Books', 'Beauty'],
    datasets: [{
      data: [45, 25, 15, 10, 5],
      backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'
      ]
    }]
  };

  constructor() { }

  ngOnInit(): void {
    this.initCharts();
  }

  initCharts(): void {
    // Revenue trend chart
    const revenueCanvas = document.getElementById('revenueChart') as HTMLCanvasElement;
    if (revenueCanvas) {
      new Chart(revenueCanvas, {
        type: 'line',
        data: this.revenueData,
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }

    // Sales by category chart
    const categoryCanvas = document.getElementById('categoryChart') as HTMLCanvasElement;
    if (categoryCanvas) {
      new Chart(categoryCanvas, {
        type: 'doughnut',
        data: this.salesByCategory,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'right'
            }
          }
        }
      });
    }
  }

  getGrowthClass(value: number): string {
    return value >= 0 ? 'positive-growth' : 'negative-growth';
  }
}
