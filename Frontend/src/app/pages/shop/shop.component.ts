import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-shop',
  imports: [RouterModule , NavbarComponent],
  templateUrl: './shop.component.html',
  styleUrls: ['../home/home.component.css' ,'./shop.component.css']
})
export class ShopComponent {

}
