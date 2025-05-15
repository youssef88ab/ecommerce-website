import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarComponent } from "./components/admin-sidebar/sidebar.component";



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, FontAwesomeModule, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecommerce-app';
}
