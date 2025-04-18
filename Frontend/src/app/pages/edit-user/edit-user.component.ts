import { Component } from '@angular/core';
import { User  , UserService} from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
  selector: 'app-edit-user',
  imports: [FormsModule , CommonModule , SidebarComponent , RouterModule , NavbarComponent ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {
   UserId!: number;
    
    Roles = [
      { id: 0, name: '' }
    ];

    User: User = {
      id: 0,
      username: '',
      email: '',
      roles: this.Roles ,
      phone: '',
      address: '' , 
      gender: '', 
      birthDate: '',
      dateAdded: ''
    };
  


    Street: string = '' ; 
    City: string = '' ; 
    State: string = ''; 
    ZIP: number = 0; 
    Country: string = '';
    Gender: string = '';
  

    constructor(
      private route: ActivatedRoute,
      private UserService: UserService
    ) {}
  
    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        this.UserId = parseInt(params.get('userId') || '0', 10);
        console.log('Extracted UserId from route:', this.UserId); // Debug
        if (this.UserId) {
          this.fetchUser(this.UserId);
        } else {
          console.log('No valid UserId found in route');
        }
      });
    }
  
    extractAddress(address: string): void {
      const arr: string[] = address.split(",");
      this.Street = arr[0] ; 
      this.City = arr[1];
      this.State = arr[2];
      this.ZIP = parseInt(arr[3],10);
      this.Country = arr[4];
    }

    fetchUser(UserId: number): void {
      this.UserService.getUser(UserId).subscribe({
        next: (data) => {
          this.User = data;
          this.extractAddress(this.User.address);
          console.log('Fetched User:', this.User); // Debug
        },
        error: (err) => {
          console.error('Error fetching User:', err);
        }
      });
    }

  
    onSubmit(): void {
      console.log("User Sended : " , this.User );
      this.UserService.updateUser(this.User).subscribe({
        next: (response) => {
          console.log('User updated:', response);
        },
        error: (error) => {
          console.error('Update error:', error);
          alert('Error updating User.');
        }
      });
    }

}
