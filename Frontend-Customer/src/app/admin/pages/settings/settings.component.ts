import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/admin-sidebar/admin-sidebar.component';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';

@Component({
  selector: 'app-settings',
  imports: [SidebarComponent , AdminNavbarComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

}