import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../services/product.service';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
  imports: [FormsModule, CommonModule, RouterModule, SidebarComponent, NavbarComponent],
  standalone: true
})
export class EditProductComponent implements OnInit {
  productId!: number;
  
  product: Product = {
    productId: 0,
    name: '',
    description: '',
    price: 0,
    stockStatus: '',
    imageUrl: ''
  };


  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = parseInt(params.get('productId') || '0', 10);
      console.log('Extracted productId from route:', this.productId); // Debug
      if (this.productId) {
        this.fetchProduct(this.productId);
      } else {
        console.log('No valid productId found in route');
      }
    });
  }

  fetchProduct(productId: number): void {
    this.productService.getProduct(productId).subscribe({
      next: (data) => {
        this.product = data;
        console.log('Fetched product:', this.product); // Debug
      },
      error: (err) => {
        console.error('Error fetching product:', err);
      }
    });
  }

  onSubmit(): void {
    this.productService.updateProduct(this.product).subscribe({
      next: (response) => {
        console.log('Product updated:', response);
        window.location.href = '/';
      },
      error: (error) => {
        console.error('Update error:', error);
        alert('Error updating product.');
      }
    });
  }
}