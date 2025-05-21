import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'admin-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }

  logout() {
    // Add your logout logic here
    this.router.navigate(['/login']);
  }
}
