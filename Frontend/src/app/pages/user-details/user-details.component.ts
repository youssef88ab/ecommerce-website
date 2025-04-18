import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Order } from '../../services/order.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-user-details',
  imports: [RouterModule , CommonModule , SidebarComponent , NavbarComponent , FormsModule  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
})
export class UserDetailsComponent implements OnInit {

  envelopeIcon = faEnvelope;

  UserId!: number;

  Roles = [
    { id: 0, name: '' }
  ];

  User: User = {
    id: 0,
    email: '',
    roles: this.Roles ,
    username: '',
    phone: '',
    address: '' , 
    gender: '', 
    birthDate: '', 
    dateAdded: ''
  };

  Orders : Order[] = []; 

  constructor(
    private route: ActivatedRoute,
    private UserService: UserService , 
    private OrderService: OrderService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.UserId = parseInt(params.get('userId') || '0', 10);
      if (this.UserId) {
        this.fetchUser(this.UserId);
        this.fetchOrderByUserId(this.UserId);
      } else {
        console.log('No valid UserId found in route');
      }
    });
  }

  fetchUser(UserId: number): void {
    this.UserService.getUser(UserId).subscribe({
      next: (data) => {
        this.User = data;
      },
      error: (err) => {
        console.error('Error fetching User:', err);
      },
    });
  }

  fetchOrderByUserId(UserId : number): void {
    this.OrderService.findbyUserId(UserId).subscribe({
      next: (data) => {
        this.Orders = data;
      },
      error: (err) => {
        console.error('Error Finding Orders');
      }
    })
  }
}
