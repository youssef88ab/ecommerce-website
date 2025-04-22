import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-signup',
  imports: [CommonModule , FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  user: User = {
    id: 0,
    username: '',
    email: '',
    roles: [ { id: 2 , name : 'CUSTOMER'} ] , 
    address: '',
    phone: '',
    birthDate: '',
    gender: '',
    dateAdded: '',
    password: ''
  }

  password2 : string = '' ;

  constructor(private userService : UserService ) {}

  ngOnInit(): void {
    
  }

  signUp(user : User): void {
    this.userService.signUp(this.user).subscribe({
      next:(data) => {
        console.log(data);
      },
      error:(err) => {
        console.error(err);
      }
    })
  }
  

}