import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet,NavbarComponent,FooterComponent],
  standalone: true,
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

}
