// profile.component.ts
import { Component, OnInit } from '@angular/core';
import { ProfileSidebarComponent } from '../../profile-sidebar/profile-sidebar.component';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [ProfileSidebarComponent, CommonModule]
})
// profile.component.ts
export class ProfileComponent {
  userData: any;
  isLoading = false;
  error: string | null = null;
  usernameAvailable = false;

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData(): void {
    const username = localStorage.getItem('username');
    
    if (!username) {
      this.usernameAvailable = false;
      return;
    }

    this.usernameAvailable = true;
    this.isLoading = true;
    this.error = null;

    this.profileService.getUserData(username).subscribe({
      next: (data) => {
        this.userData = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load user data';
        this.isLoading = false;
        console.error('Error loading user data:', err);
      }
    });
  }
}