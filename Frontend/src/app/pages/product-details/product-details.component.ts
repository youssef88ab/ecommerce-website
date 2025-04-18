import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService , Product } from '../../services/product.service';

@Component({
  selector: 'app-product-details',
  imports: [NavbarComponent , SidebarComponent  , RouterModule , FormsModule , CommonModule ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  productId: number = 0 ;

    constructor(
      private route: ActivatedRoute,
      private productService : ProductService
    ) {}

  product : Product = {
    productId: 0 , 
    name: '' , 
    description: '' , 
    price: 0 , 
    stockStatus: '' , 
    imageUrl: '' , 
  }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => { this.productId = parseInt(params.get('productId') || '0', 10)}) ; 
    this.fetchProduct(this.productId);
  }

  fetchProduct(id : number): void {
    this.productService.getProduct(id).subscribe({
      next: (data) => {
        console.log("Product Details :" , data);
        this.product = data ;
      } ,
      error: (err) => {
        console.error(err);
      }
    })
  }

}
