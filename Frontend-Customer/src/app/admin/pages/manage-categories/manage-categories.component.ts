import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { SidebarComponent } from '../../components/admin-sidebar/admin-sidebar.component';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../services/category.service';

@Component({
  selector: 'app-manage-categories',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    AdminNavbarComponent,
    SidebarComponent
  ],
  templateUrl: './manage-categories.component.html',
  styleUrl: './manage-categories.component.css'
})
export class ManageCategoriesComponent implements OnInit {
  categories: Category[] = [];
  paginatedCategories: Category[] = [];
  categoriesCount: number = 0;
  keyword: string = '';
  originalCategories: Category[] = [];
  Math = Math;

  // Pagination variables
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.originalCategories = [...data];
        this.categoriesCount = data.length;
        this.updatePaginatedCategories();
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
  }

  updatePaginatedCategories(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedCategories = this.categories.slice(startIndex, endIndex);
    this.totalPages = Math.ceil(this.categories.length / this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedCategories();
    }
  }

  onSearch(): void {
    if (this.keyword.trim()) {
      this.categories = this.originalCategories.filter(category =>
        category.name.toLowerCase().includes(this.keyword.toLowerCase()) ||
        category.description.toLowerCase().includes(this.keyword.toLowerCase())
      );
    } else {
      this.categories = [...this.originalCategories];
    }
    this.currentPage = 1;
    this.updatePaginatedCategories();
  }

  deleteCategory(categoryId: number): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(categoryId).subscribe({
        next: () => {
          this.categories = this.categories.filter(cat => cat.id !== categoryId);
          this.originalCategories = this.originalCategories.filter(cat => cat.id !== categoryId);
          this.categoriesCount = this.categories.length;
          this.updatePaginatedCategories();
        },
        error: (error) => {
          console.error('Error deleting category:', error);
        }
      });
    }
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }
} 