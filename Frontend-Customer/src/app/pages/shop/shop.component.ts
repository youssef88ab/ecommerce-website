import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService, SubCategory,  Category} from '../../category.service';
import { ProductService } from '../../product.service';


@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shop.component.html',
  styleUrls: ['../home/home.component.css', './shop.component.css']
})
export class ShopComponent implements OnInit{

  categories: any[] = [];
  products: any[] = [];
  currentPage = 0;
  totalPages = 0;

  constructor(private categoryService: CategoryService, private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts(0);
    this.categoryService.getCategories().subscribe(cats => {
      this.categories = cats; }) }

      loadProducts(page: number = 0) {
        this.productService.getProducts(page, 12).subscribe({
          next: (response) => {
            this.products = response.content;
            this.totalPages = response.totalPages;
            this.currentPage = response.number;
            console.log(this.products);
          },
          error: (err) => {
            console.error('Error loading products', err);
          }
        });
      }
      isOnSale(product: any): boolean {
        return product.originalPrice && product.price < product.originalPrice;
      }
    
      // Calculate discount percentage
      getDiscount(product: any): number {
        if (!this.isOnSale(product)) return 0;
        return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
      }
     } 
  
