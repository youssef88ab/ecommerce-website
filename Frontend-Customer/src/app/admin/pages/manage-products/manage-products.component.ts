import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../services/product.service';
import { SidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-manage-products',
  imports: [FormsModule, CommonModule, RouterModule, SidebarComponent, AdminNavbarComponent , MatMenuModule , MatIconModule , MatButtonModule ],
  templateUrl: './manage-products.component.html',
  styleUrl: './manage-products.component.css' ,
  
})
export class ManageProductsComponent implements OnInit {
  keyword: string = '';

  productsNumber: number = 0;

  products: Product[] = [];
  paginatedProducts: Product[] = [];  // <-- this will hold products for current page

  // Pagination variables
  currentPage: number = 1;
  itemsPerPage: number = 5;  // choose how many items per page
  totalPages: number = 0;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.productsNumber = this.products.length;
        this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
        this.updatePaginatedProducts();
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
    if (!keyword) {
      this.fetchProducts();
    } else {
      this.productService.searchProduct(keyword).subscribe({
        next: (data) => {
          this.products = data;
          this.productsNumber = this.products.length;
          this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
          this.currentPage = 1;
          this.updatePaginatedProducts();
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }
}
