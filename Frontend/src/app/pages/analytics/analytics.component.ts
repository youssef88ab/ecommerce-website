import { SidebarComponent } from '../../components/admin-sidebar/sidebar.component';
import { NavbarComponent } from '../../components/admin-navbar/navbar.component';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
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
    revenue: 0,
    revenueGrowth: 0,
    orders: 0,
    orderGrowth: 0,
    avgOrderValue: 0,
    avgOrderValueGrowth: 0,
    conversionRate: 0,
    conversionRateGrowth: 0
  };

  topProducts: TopProduct[] = [];
  customerInsights: CustomerInsights = {
    newCustomers: 0,
    newCustomerGrowth: 0,
    repeatCustomers: 0,
    repeatCustomerGrowth: 0,
    avgCustomerValue: 0,
    avgCustomerValueGrowth: 0
  };

  private revenueChart: Chart | null = null;
  private categoryChart: Chart | null = null;
  yearlySales: number[] = [];

  constructor(
    private productService: ProductService,
    private analyticsService: AnalyticsService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.fetchAnalyticsData();
  }

  ngAfterViewInit(): void {
    this.initCharts();
  }

  private fetchAnalyticsData(): void {
    // Fetch total sales
    this.analyticsService.getTotalSales().subscribe(
      (totalSales) => {
        this.salesSummary.revenue = totalSales;
        this.updateSalesSummary();
      }
    );

    // Fetch yearly sales for charts
    this.analyticsService.getYearlySales().subscribe(
      (sales) => {
        this.yearlySales = sales;
        this.updateCharts();
      }
    );

    // Fetch total users for customer insights
    this.analyticsService.getTotalUsers().subscribe(
      (totalUsers) => {
        this.customerInsights.newCustomers = totalUsers;
        this.updateCustomerInsights();
      }
    );
  }

  private updateSalesSummary(): void {
    // Calculate growth rates and other metrics based on the fetched data
    // This is a simplified example - you would need to implement proper calculations
    this.salesSummary.revenueGrowth = 12.5; // Example growth rate
    this.salesSummary.orders = Math.floor(this.salesSummary.revenue / 100); // Example calculation
    this.salesSummary.orderGrowth = 8.2;
    this.salesSummary.avgOrderValue = this.salesSummary.revenue / this.salesSummary.orders;
    this.salesSummary.avgOrderValueGrowth = 3.1;
    this.salesSummary.conversionRate = 3.2;
    this.salesSummary.conversionRateGrowth = 1.2;
  }

  private updateCustomerInsights(): void {
    // Calculate customer-related metrics
    // This is a simplified example - you would need to implement proper calculations
    this.customerInsights.newCustomerGrowth = 15.2;
    this.customerInsights.repeatCustomers = Math.floor(this.customerInsights.newCustomers * 0.4);
    this.customerInsights.repeatCustomerGrowth = 8.5;
    this.customerInsights.avgCustomerValue = this.salesSummary.revenue / this.customerInsights.newCustomers;
    this.customerInsights.avgCustomerValueGrowth = 5.3;
  }

  private initCharts(): void {
    this.initRevenueChart();
    this.initCategoryChart();
  }

  private initRevenueChart(): void {
    const ctx = document.getElementById('revenueChart') as HTMLCanvasElement;
    if (!ctx) return;

    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Revenue',
          data: this.yearlySales,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Monthly Revenue'
          }
        }
      }
    };

    this.revenueChart = new Chart(ctx, config);
  }

  private initCategoryChart(): void {
    const ctx = document.getElementById('categoryChart') as HTMLCanvasElement;
    if (!ctx) return;

    const config: ChartConfiguration = {
      type: 'doughnut',
      data: {
        labels: ['Electronics', 'Clothing', 'Home & Kitchen', 'Others'],
        datasets: [{
          data: [30, 25, 20, 25],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)'
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Sales by Category'
          }
        }
      }
    };

    this.categoryChart = new Chart(ctx, config);
  }

  private updateCharts(): void {
    if (this.revenueChart) {
      this.revenueChart.data.datasets[0].data = this.yearlySales;
      this.revenueChart.update();
    }
  }

  setChartPeriod(period: 'day' | 'week' | 'month'): void {
    this.chartPeriod = period;
    this.updateCharts();
  }

  exportData(): void {
    // Implement export logic
    console.log('Exporting data...');
  }
}
