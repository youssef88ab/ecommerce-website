import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/admin-sidebar/sidebar.component';
import { NavbarComponent } from '../../components/admin-navbar/navbar.component';

@Component({
  selector: 'app-settings',
  imports: [SidebarComponent , NavbarComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

}
