import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  constructor(private authService: AuthService, private router: Router, private location: Location) {}

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); 
    localStorage.clear();
    };
  
  goBack(): void {
    this.location.back();
  }

}
