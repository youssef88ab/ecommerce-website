import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient for API calls
import { Router, RouterModule } from '@angular/router'; // Import Router for navigation
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from "../../components/admin-sidebar/sidebar.component";
import { NavbarComponent } from "../../components/admin-navbar/navbar.component";
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
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
  faLock,
  faSave,
  faShieldAlt,
  faChartLine,
  faUserPlus
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-add-user',
  imports: [FormsModule , SidebarComponent , NavbarComponent , FontAwesomeModule ,  RouterModule , CommonModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
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
     faLock = faLock;
     faUserPlus = faUserPlus;

  Roles = [
    { id: 0, name: '' }
  ];

  checkPass :string = '';

  newUser = {
    id: 0, 
    username: '',
    email: '',
    role: '',
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
    this.newUser = {id :0 ,  username: '', email: '', password: '', gender: '' , phone: '' , address: '' , dateAdded: '' ,  birthDate: '' ,  role: '' };
}

}
