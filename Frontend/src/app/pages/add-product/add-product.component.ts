import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient for API calls
import { Router } from '@angular/router'; // Import Router for navigation
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  imports: [FormsModule, SidebarComponent, NavbarComponent] ,
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  newProduct = {
    name: '',
    description: '',
    price: null
  };

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  // Handle form submission to add product
  onSubmit(): void {
    // Send POST request to add product
    this.http.post('http://127.0.0.1:8080/products/add', this.newProduct)
      .subscribe(
        response => {
          alert('Product added successfully!');
          this.router.navigate(['/']); // Redirect to the home page or another page after success
        },
        error => {
          console.error('Error adding product:', error);
          alert('An error occurred while adding the product.');
        }
      );
  }
}
