import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient for API calls
import { Router } from '@angular/router'; // Import Router for navigation
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add-user',
  imports: [FormsModule , SidebarComponent , NavbarComponent],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {

  Roles = [
    { id: 0, name: '' }
  ];

  checkPass :string = '';

  newUser = {
    id: 0, 
    username: '',
    email: '',
    roles: this.Roles, 
    password: '', 
    address: '' , 
    phone: '', 
    gender: '', 
    birthDate: '',
    dateAdded: ''
  };

  Street: string = '' ; 
  City: string = '' ; 
  State: string = ''; 
  ZIP: string = ''; 
  Country: string = '';

  constructor(private http: HttpClient, private router: Router , private userService: UserService) {}

  ngOnInit(): void {}

  // Handle form submission to add product
  onSubmit(): void {
    // Send POST request to add product
    this.userService.addUser(this.newUser).subscribe({
      next: (data) => {
        console.log('User Added :', this.newUser); // Debug
      },
      error: (err) => {
        console.error('Error Adding User:', err);
      }
    });
  }

  onReset() {
    this.newUser = {id :0 ,  username: '', email: '', password: '', gender: '' , phone: '' , address: '' , dateAdded: '' ,  birthDate: '' ,  roles: [{ id: 0 , name: '' }] };
}

}
