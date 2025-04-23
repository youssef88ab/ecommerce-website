import { Component } from '@angular/core';
import { DelivrerSidebarComponent } from '../delivrer-sidebar/delivrer-sidebar.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-deliverer-layout',
  imports: [DelivererLayoutComponent, RouterModule, SidebarComponent],
  templateUrl: './deliverer-layout.component.html',
  styleUrl: './deliverer-layout.component.css'
})
export class DelivererLayoutComponent {

}
