import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService , User } from '../../services/user.service';
import {Component} from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-manage-users',
  imports: [FormsModule , NavbarComponent, SidebarComponent , CommonModule , RouterModule  , MatButtonModule , MatIconModule , MatMenuModule],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css'
})
export class ManageUsersComponent implements OnInit {

    Users: User[] = [];

    UserNumber: number = this.Users.length ;

    keyword: string = '';
  
    constructor(private UserService: UserService) {}
  
    ngOnInit(): void {
      this.fetchUsers();
    }
  
    fetchUsers(): void {
      this.UserService.getUsers().subscribe({
        next: (data) => {
          this.Users = data;
          this.UserNumber = this.Users.length;
          console.log('Fetched Users:', data); // Log the response data
        },
        error: (err) => {
          console.error(err);
        },
      });
    }

    onSearch(keyword: string): void {
      if (keyword == '') {
        this.fetchUsers();
      }
      else {
        this.UserService.searchUser(keyword).subscribe({
          next: (data) => {
            this.Users = data; 
          },
          error: (err) => {
            console.error('Error Searching User');
          }
        })
      }

    }

    deleteUser(id: number): void {
      if (confirm("Are You Sure You Want To Delete This User ?"))
      {
      this.UserService.deleteUser(id).subscribe({
        next: (data) => {
          this.fetchUsers(); 
        },
        error: (err) => {
          console.error(err);
        }
      })
    }
            
  }

  formatDate(fulldate: string): string {
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
