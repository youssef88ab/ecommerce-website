import { Component } from '@angular/core';
import { DelivrerSidebarComponent } from '../../pages/delivrer-sidebar/delivrer-sidebar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-deliverer-layout',
  standalone: true,
  imports: [
    DelivrerSidebarComponent,
    RouterModule
  ],
  templateUrl: './deliverer-layout.component.html',
  styleUrl: './deliverer-layout.component.css'
})
export class DelivererLayoutComponent {

}
