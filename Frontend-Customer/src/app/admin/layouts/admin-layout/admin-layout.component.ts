import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/admin-sidebar/sidebar.component';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  imports: [SidebarComponent, RouterOutlet, RouterLink],
  standalone: true,
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {

}
