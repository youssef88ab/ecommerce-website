import { Component , OnInit } from '@angular/core';
import { User  , UserService} from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { 
  faUser, 
  faEnvelope, 
  faPhone, 
  faCalendarAlt, 
  faVenusMars, 
  faUserTag, 
  faCamera, 
  faCalendar, 
  faChevronLeft, 
  faTimes, 
  faSave,
  faShieldAlt,
  faChartLine
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-edit-user',
  imports: [FormsModule , CommonModule , SidebarComponent , RouterModule , AdminNavbarComponent , FontAwesomeModule ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css',
  standalone: true
})
export class EditUserComponent {

   // Font Awesome Icons
   faUser = faUser;
   faEnvelope = faEnvelope;
   faPhone = faPhone;
   faCalendarAlt = faCalendarAlt;
   faVenusMars = faVenusMars;
   faUserTag = faUserTag;
   faCamera = faCamera;
   faCalendar = faCalendar;
   faChevronLeft = faChevronLeft;
   faTimes = faTimes;
   faSave = faSave;
   faShieldAlt = faShieldAlt;
   faChartLine = faChartLine;

   UserId!: number;
    
    Roles = [
      { id: 0, name: '' }
    ];

    User: User = {
      id: 0,
      username: '',
      email: '',
      role: '',
      phone: '',
      address: '' , 
      gender: '', 
      birthDate: '',
      dateAdded: '',
      password: ''
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
        next: (data: User) => {
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