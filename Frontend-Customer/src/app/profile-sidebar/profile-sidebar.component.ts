import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile-sidebar',
  templateUrl: './profile-sidebar.component.html',
  standalone: true,
  imports: [RouterModule],
  styleUrls: ['./profile-sidebar.component.css']
})
export class ProfileSidebarComponent {
  username: string | null = localStorage.getItem('username');
  userRole: string | null = localStorage.getItem('user_role');
  userProfileImage: string | null = localStorage.getItem('profileImg');

  constructor(private router: Router) {}

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}