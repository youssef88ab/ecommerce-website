import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-signup',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  user: User = {
    id: 0,
    username: '',
    email: '',
    roles: [{ id: 2, name: 'CUSTOMER' }],
    address: '',
    phone: '',
    birthDate: '',
    gender: '',
    dateAdded: '',
    password: ''
  }

  password2: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

  }

  getDate(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    const customString = `${year}-${month}-${day}`;
    return customString;
  }

  

  signUp(user: User): void {
    this.user.dateAdded = this.getDate();
    this.authService.signUp(this.user).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }


}