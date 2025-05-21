import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { Order } from '../../services/order.service';
import { OrderService } from '../../services/order.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faEnvelope, 
  faPhone, 
  faLocationDot, 
  faVenusMars, 
  faCalendarDays,
  faCircleCheck,
  faCalendarCheck,
  faLock,
  faCartShopping,
  faCalendarDay,
  faDollarSign,
  faCircleExclamation,
  faEye, 
  faBox
} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-user-details',
  imports: [RouterModule , CommonModule , SidebarComponent , AdminNavbarComponent , FormsModule , FontAwesomeModule ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
})
export class UserDetailsComponent implements OnInit {

   // Font Awesome Icons
   faEnvelope = faEnvelope;
   faPhone = faPhone;
   faLocationDot = faLocationDot;
   faVenusMars = faVenusMars;
   faCalendarDays = faCalendarDays;
   faCircleCheck = faCircleCheck;
   faCalendarCheck = faCalendarCheck;
   faLock = faLock;
   faCartShopping = faCartShopping;
   faCalendarDay = faCalendarDay;
   faDollarSign = faDollarSign;
   faCircleExclamation = faCircleExclamation;
   faEye = faEye;
   faBox = faBox;

  UserId!: number;

  Roles = [
    { id: 0, name: '' }
  ];

  User: User = {
    id: 0,
    email: '',
    role: '',
    username: '',
    phone: '',
    address: '' , 
    gender: '', 
    birthDate: '', 
    dateAdded: '',
    password: ''
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
      next: (data: User) => {
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

  formateDate(date :string): string {
    let arr = date.split('-');
    let year = arr[0]; 
    let monthnum : number = parseInt(arr[1],10); 
    let day = arr[2]; 
    let month = '' ;
    
    switch (monthnum) {
      case 1: 
        month = 'January';
        break;
      case 2: 
        month = 'February';
        break;
      case 3: 
        month = 'March';
        break;
      case 4: 
        month = 'April';
        break;
      case 5: 
        month = 'May';
        break;
      case 6: 
        month = 'June';
        break;
      case 7: 
        month = 'July';
        break;
      case 8: 
        month = 'August';
        break;
      case 9: 
        month = 'September';
        break;
      case 10: 
        month = 'October';
        break;
      case 11: 
        month = 'November';
        break;
      case 12: 
        month = 'December';
        break;
      default: 
        month = 'Invalid month'; 
    }

    return(`${day} ${month} ${year}`);
    
  }

  formatDate(fulldate: string): string {
    var date: string[] = fulldate.split('T');
    return `${this.formatDate1(date[0])}, ${date[1]}`;
  }

  formatDate1(fulldate: string): string {
    var arr: string[] = fulldate.split('T');
    var date = arr[0].split('-');
    var year = date[0];  
    var monthnum : number = parseInt(date[1],10);
    var day = date[2];
    var monthstr : string = '' ;

    switch (monthnum) {
      case 1: 
        monthstr = 'January';
        break;
      case 2: 
        monthstr = 'February';
        break;
      case 3: 
        monthstr = 'March';
        break;
      case 4: 
        monthstr = 'April';
        break;
      case 5: 
        monthstr = 'May';
        break;
      case 6: 
        monthstr = 'June';
        break;
      case 7: 
        monthstr = 'July';
        break;
      case 8: 
        monthstr = 'August';
        break;
      case 9: 
        monthstr = 'September';
        break;
      case 10: 
        monthstr = 'October';
        break;
      case 11: 
        monthstr = 'November';
        break;
      case 12: 
        monthstr = 'December';
        break;
      default: 
        monthstr = 'Invalid month'; 
    }
    

    return (`${year}, ${monthstr}, ${day}`);
  }
}