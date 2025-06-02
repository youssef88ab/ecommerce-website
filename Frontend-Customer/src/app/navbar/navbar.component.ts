import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryService, SubCategory,  Category} from '../category.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  categories: any[] = [];
  username: string | null = null;
  userProfileImage: string | null = null;
  userRole: string | null = null;
  cartCount = 0;

  constructor(private categoryService: CategoryService, private cartService: CartService) {}

  hasToken(): boolean {
    return localStorage.getItem('auth_token') !== null;
  }
  isLoggedIn() : boolean {
    if(this.hasToken()) {
      this.checkLoginStatus();
      return true;
    }
    else {
      return false;
    }
  }
  checkLoginStatus(): void {
      this.username = localStorage.getItem('username');
      this.userRole = localStorage.getItem('user_role');
      this.userProfileImage = localStorage.getItem('profileImg');
    
  }

  ngOnInit(): void {
  this.cartService.cartCount$.subscribe(count => {
    this.cartCount = count;
  });
  this.categoryService.getCategories().subscribe(cats => {
    this.categories = cats; })
  // Trigger loading cart count early on app/navbar init
  this.cartService.loadCartCount();
}


}
