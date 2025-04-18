import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../services/product.service';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-manage-products',
  imports: [FormsModule, CommonModule, RouterModule, SidebarComponent, NavbarComponent , MatMenuModule , MatIconModule , MatButtonModule],
  templateUrl: './manage-products.component.html',
  styleUrl: './manage-products.component.css' ,
  
})
export class ManageProductsComponent implements OnInit{

    keyword : string = '';

    productsNumber : number = 0 ;

    products: Product[] = [] ; 
    
    constructor(private productService : ProductService) {

    }
  
    ngOnInit(): void {
        this.fetchProducts();
    }

    fetchProducts(): void {
        this.productService.getProducts()
      .subscribe({
        next: (data) => {
          this.products = data;
          this.productsNumber = this.products.length;
          console.log('Fetched products:', data);  // Log the response data

        },
        error: (err) => {
          console.error(err);
        }
      });
    }

    deleteProduct(id: number) : void {
        console.log('Deleting product with id:', id);  // Log the id
        if (confirm('Are you sure you want to delete this product?')) {
            this.productService.deleteProduct(id)
              .subscribe({
                next: () => {
                  this.products = this.products.filter(product => product.productId !== id);
                },
                error: (err) => {
                  console.error('Error deleting product:', err);
                }
              });
            }
        }

    onSearch(keyword: string) : void {
      if (keyword == ''){
        this.fetchProducts();
      }
      else {
        this.productService.searchProduct(keyword).subscribe({
          next: (data) => {
            this.products = data ;
            console.log("Searched Product : " , data);
          },
          error: (err) => {
            console.error(err);
          }
        })
      }


    }
}
