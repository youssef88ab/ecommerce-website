import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit{

  product: any;
  mainImage: string = '';
  selectedQuantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(id).subscribe({
        next: (product) => {
          this.product = product;
          this.mainImage = product.mainImgUrl;
        },
        error: (err) => {
          console.error('Error loading product', err);
        }
      });
    } else {
      // handle null case (redirect or show error)
    }
  }

  changeImage(imgUrl: string): void {
    this.mainImage = imgUrl;
  }

  addToCart(): void {
    alert(`Added ${this.selectedQuantity} ${this.product.productName} to cart`);
  }
}
