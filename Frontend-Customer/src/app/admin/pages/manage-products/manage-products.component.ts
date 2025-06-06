import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../services/product.service';
import { SidebarComponent } from '../../components/admin-sidebar/admin-sidebar.component';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-manage-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    FontAwesomeModule,
    AdminNavbarComponent,
    SidebarComponent
  ],
  templateUrl: './manage-products.component.html',
  styleUrl: './manage-products.component.css'
})
export class ManageProductsComponent implements OnInit {
  // Font Awesome icons
  faMagnifyingGlass = faMagnifyingGlass;

  keyword: string = '';
  selectedCategory: string = '';
  originalProducts: any[] = [];  // Store original list of products
  Math = Math;

  productsNumber: number = 0;

  products: Product[] = [];
  paginatedProducts: Product[] = [];  // <-- this will hold products for current page

  // Pagination variables
  currentPage: number = 1;
  itemsPerPage: number = 10;  // choose how many items per page
  totalPages: number = 0;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.originalProducts = data;  // Store original list
        this.products = data;
        this.productsNumber = this.products.length;
        this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
        this.updatePaginatedProducts();
        // Log unique categories
        const categories = [...new Set(data.map(p => p.category))];
        console.log('Available categories:', categories);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  updatePaginatedProducts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.products.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedProducts();
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 3;
    
    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.products = this.products.filter(p => p.id !== id);
          this.productsNumber = this.products.length;
          this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
          // Adjust currentPage if needed
          if (this.currentPage > this.totalPages) {
            this.currentPage = this.totalPages;
          }
          this.updatePaginatedProducts();
        },
        error: (err) => {
          console.error('Error deleting product:', err);
        }
      });
    }
  }

  onSearch(keyword: string): void {
    if (keyword == '') {
      this.products = [...this.originalProducts];  // Reset to original list
      this.applyCategoryFilter();
    }
    else {
      this.productService.searchProduct(keyword).subscribe({
        next: (data) => {
          this.products = data;
          this.applyCategoryFilter();
        },
        error: (err) => {
          console.error('Error Searching Product');
        }
      });
    }
  }

  onCategoryChange(): void {
    this.products = [...this.originalProducts];  // Reset to original list
    if (this.keyword) {
      this.onSearch(this.keyword);  // Re-apply search if there's a keyword
    } else {
      this.applyCategoryFilter();  // Just apply category filter
    }
  }

  applyCategoryFilter(): void {
    if (this.selectedCategory) {
      this.products = this.products.filter(product => product.category === this.selectedCategory);
    }
    this.productsNumber = this.products.length;
    this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
    this.currentPage = 1;
    this.updatePaginatedProducts();
  }
}
