import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js';
import { ProductService, Product } from '../../services/product.service';
import { AnalyticsService } from '../../services/analytics.service';

interface SalesSummary {
  revenue: number;
  orders: number;
  avgOrderValue: number;
  conversionRate: number;
}

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, CommonModule],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent implements OnInit, AfterViewInit {
  constructor(
    private productService: ProductService,
    private AnalyticsService: AnalyticsService
  ) { }

  salesSummary: SalesSummary = {
    revenue: 152490,
    orders: 1842,
    avgOrderValue: 82.78,
    conversionRate: 3.2
  };

  topProducts: Product[] = [];

  revenueChart: Chart<'line'> | null = null;
  categoryChart: Chart<'doughnut'> | null = null;

  revenueData: {
    labels: string[],
    datasets: {
      label: string,
      data: number[],
      backgroundColor: string,
      borderColor: string,
      borderWidth: number
    }[]
  } = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [{
        label: 'Revenue',
        data: [],
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

  ngOnInit(): void {
    this.fetchTopProducts();
    this.fetchYearlySales();
  }

  ngAfterViewInit(): void {
    this.initCharts();
  }

  fetchYearlySales() {
    this.AnalyticsService.getYearlySales().subscribe({
      next: (data) => {
        this.revenueData.datasets[0].data = data;

        // ✅ Update chart with new data
        if (this.revenueChart) {
          this.revenueChart.update();
        }
      },
      error: (err) => {
        console.error('Failed to fetch yearly sales:', err);
      }
    });
  }

  initCharts(): void {
    const revenueCanvas = document.getElementById('revenueChart') as HTMLCanvasElement;

    if (revenueCanvas && !this.revenueChart) {
      this.revenueChart = new Chart(revenueCanvas, {
        type: 'line',
        data: this.revenueData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }

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

  fetchTopProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.topProducts = data.slice(0, 3);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
