import { SidebarComponent } from '../../components/admin-sidebar/sidebar.component';
import { NavbarComponent } from '../../components/admin-navbar/navbar.component';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, ChartConfiguration } from 'chart.js';
import { ProductService, Product } from '../../services/product.service';
import { AnalyticsService } from '../../services/analytics.service';

interface SalesSummary {
  revenue: number;
  revenueGrowth: number;
  orders: number;
  orderGrowth: number;
  avgOrderValue: number;
  avgOrderValueGrowth: number;
  conversionRate: number;
  conversionRateGrowth: number;
}

interface TopProduct {
  name: string;
  category: string;
  image: string;
  quantitySold: number;
  revenue: number;
  growth: number;
}

interface CustomerInsights {
  newCustomers: number;
  newCustomerGrowth: number;
  repeatCustomers: number;
  repeatCustomerGrowth: number;
  avgCustomerValue: number;
  avgCustomerValueGrowth: number;
}

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, CommonModule, FormsModule],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent implements OnInit, AfterViewInit {
  selectedDateRange: string = '30';
  chartPeriod: 'day' | 'week' | 'month' = 'week';
  productSort: 'revenue' | 'quantity' = 'revenue';

  salesSummary: SalesSummary = {
    revenue: 24500,
    revenueGrowth: 12.5,
    orders: 1250,
    orderGrowth: 8.2,
    avgOrderValue: 196,
    avgOrderValueGrowth: 3.1,
    conversionRate: 3.2,
    conversionRateGrowth: 1.2
  };

  topProducts: TopProduct[] = [
    {
      name: 'Product 1',
      category: 'Electronics',
      image: 'assets/images/product1.png',
      quantitySold: 150,
      revenue: 15000,
      growth: 12.5
    },
    {
      name: 'Product 2',
      category: 'Clothing',
      image: 'assets/images/product2.png',
      quantitySold: 200,
      revenue: 10000,
      growth: 8.2
    },
    {
      name: 'Product 3',
      category: 'Home & Kitchen',
      image: 'assets/images/product3.png',
      quantitySold: 100,
      revenue: 5000,
      growth: -3.1
    }
  ];

  customerInsights: CustomerInsights = {
    newCustomers: 250,
    newCustomerGrowth: 15.2,
    repeatCustomers: 1000,
    repeatCustomerGrowth: 8.5,
    avgCustomerValue: 245,
    avgCustomerValueGrowth: 5.3
  };

  private revenueChart: Chart | null = null;
  private categoryChart: Chart | null = null;

  constructor(
    private productService: ProductService,
    private AnalyticsService: AnalyticsService
  ) { }

  ngOnInit(): void {
    this.fetchTopProducts();
    this.fetchYearlySales();
    this.initializeCharts();
  }

  ngAfterViewInit(): void {
    this.initCharts();
  }

  fetchYearlySales() {
    this.AnalyticsService.getYearlySales().subscribe({
      next: (data) => {
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
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Revenue',
            data: [12000, 19000, 15000, 25000, 22000, 30000],
            borderColor: '#4f46e5',
            backgroundColor: 'rgba(79, 70, 229, 0.1)',
            tension: 0.4,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          }
        }
      });
    }

    const categoryCanvas = document.getElementById('categoryChart') as HTMLCanvasElement;
    if (categoryCanvas) {
      new Chart(categoryCanvas, {
        type: 'doughnut',
        data: {
          labels: ['Electronics', 'Clothing', 'Home & Kitchen', 'Books', 'Other'],
          datasets: [{
            data: [30, 25, 20, 15, 10],
            backgroundColor: [
              '#4f46e5',
              '#10b981',
              '#f59e0b',
              '#3b82f6',
              '#6b7280'
            ]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom'
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
        this.topProducts = data.slice(0, 3).map(product => ({
          name: product.name,
          category: product.category,
          image: product.image,
          quantitySold: 0,
          revenue: 0,
          growth: 0
        }));
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  onDateRangeChange(): void {
    // Implement date range change logic
    console.log('Date range changed to:', this.selectedDateRange);
    this.updateCharts();
  }

  exportData(): void {
    // Implement export logic
    console.log('Exporting data...');
  }

  setChartPeriod(period: 'day' | 'week' | 'month'): void {
    this.chartPeriod = period;
    this.updateCharts();
  }

  setProductSort(sort: 'revenue' | 'quantity'): void {
    this.productSort = sort;
    this.sortProducts();
  }

  private sortProducts(): void {
    this.topProducts.sort((a, b) => {
      if (this.productSort === 'revenue') {
        return b.revenue - a.revenue;
      } else {
        return b.quantitySold - a.quantitySold;
      }
    });
  }

  private initializeCharts(): void {
    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart') as HTMLCanvasElement;
    const revenueConfig: ChartConfiguration = {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Revenue',
          data: [12000, 19000, 15000, 25000, 22000, 30000],
          borderColor: '#4f46e5',
          backgroundColor: 'rgba(79, 70, 229, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    };

    // Category Chart
    const categoryCtx = document.getElementById('categoryChart') as HTMLCanvasElement;
    const categoryConfig: ChartConfiguration = {
      type: 'doughnut',
      data: {
        labels: ['Electronics', 'Clothing', 'Home & Kitchen', 'Books', 'Other'],
        datasets: [{
          data: [30, 25, 20, 15, 10],
          backgroundColor: [
            '#4f46e5',
            '#10b981',
            '#f59e0b',
            '#3b82f6',
            '#6b7280'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    };

    this.revenueChart = new Chart(revenueCtx, revenueConfig);
    this.categoryChart = new Chart(categoryCtx, categoryConfig);
  }

  private updateCharts(): void {
    // Implement chart update logic based on selected period
    if (this.revenueChart) {
      // Update revenue chart data
    }
    if (this.categoryChart) {
      // Update category chart data
    }
  }

  getAbsoluteValue(value: number): number {
    return Math.abs(value);
  }
}
