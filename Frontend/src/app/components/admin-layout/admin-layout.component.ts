import { Component } from '@angular/core';
import { SidebarComponent } from '../admin-sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  imports: [SidebarComponent , RouterModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {

}
