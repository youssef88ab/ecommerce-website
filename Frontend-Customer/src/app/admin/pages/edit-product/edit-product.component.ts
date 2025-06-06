import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../services/product.service';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../components/admin-sidebar/admin-sidebar.component';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUpload, faTimes, faSave, faDollarSign, faBox, faTag } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
  imports: [FormsModule, CommonModule, RouterModule, SidebarComponent, AdminNavbarComponent, FontAwesomeModule],
  standalone: true
})
export class EditProductComponent implements OnInit {
  // Font Awesome icons
  faUpload = faUpload;
  faTimes = faTimes;
  faSave = faSave;
  faDollarSign = faDollarSign;
  faBox = faBox;
  faTag = faTag;

  productId!: number;
  
  product: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    stockQuantity: 0,
    imageUrl: '',
    category: '',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  constructor(
    private http: HttpClient,
    private router: Router,
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

  formatDate(fulldate: string): string {
    var arr: string[] = fulldate.split('T');
    var date = arr[0].split('-');
    var year = date[0];  
    var monthnum : number = parseInt(date[1],10);
    var day = date[2];
    var monthstr : string = '' ;

    switch (monthnum) {
      case 1: 
        monthstr = 'January';
        break;
      case 2: 
        monthstr = 'February';
        break;
      case 3: 
        monthstr = 'March';
        break;
      case 4: 
        monthstr = 'April';
        break;
      case 5: 
        monthstr = 'May';
        break;
      case 6: 
        monthstr = 'June';
        break;
      case 7: 
        monthstr = 'July';
        break;
      case 8: 
        monthstr = 'August';
        break;
      case 9: 
        monthstr = 'September';
        break;
      case 10: 
        monthstr = 'October';
        break;
      case 11: 
        monthstr = 'November';
        break;
      case 12: 
        monthstr = 'December';
        break;
      default: 
        monthstr = 'Invalid month'; 
    }
    

    return (`${year}, ${monthstr}, ${day}`);
  }
}