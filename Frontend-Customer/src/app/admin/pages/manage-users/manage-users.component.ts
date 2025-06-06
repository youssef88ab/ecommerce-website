import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/admin-sidebar/admin-sidebar.component';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService , User } from '../../services/user.service';
import {Component} from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    FontAwesomeModule,
    AdminNavbarComponent,
    SidebarComponent
  ],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css'
})
export class ManageUsersComponent implements OnInit {
  // Font Awesome icons
  faMagnifyingGlass = faMagnifyingGlass;
  faPlus = faPlus;

    Users: User[] = [];
    paginatedUsers: User[] = [];  // <-- this will hold users for current page
    UserNumber: number = this.Users.length;
    keyword: string = '';
    selectedRole: string = '';
    originalUsers: User[] = [];  // Store original list of users

    // Pagination variables
    currentPage: number = 1;
    itemsPerPage: number = 10;  // choose how many items per page
    totalPages: number = 0;
    Math = Math;
  
    constructor(private UserService: UserService) {}
  
    ngOnInit(): void {
      console.log("Ng OnInite");
      this.fetchUsers();
    }
  
    fetchUsers(): void {
      this.UserService.getUsers().subscribe({
        next: (data) => {
          this.originalUsers = data;  // Store original list
          this.Users = data;
          this.UserNumber = this.Users.length;
          this.totalPages = Math.ceil(this.Users.length / this.itemsPerPage);
          this.updatePaginatedUsers();
          console.log('Fetched Users:', data);
        },
        error: (err) => {
          console.error(err);
        },
      });
    }

    updatePaginatedUsers(): void {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.paginatedUsers = this.Users.slice(startIndex, endIndex);
    }

    changePage(page: number): void {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.updatePaginatedUsers();
      }
    }

    onSearch(keyword: string): void {
      if (keyword == '') {
        this.Users = [...this.originalUsers];  // Reset to original list
        this.applyRoleFilter();
      }
      else {
        this.UserService.searchUser(keyword).subscribe({
          next: (data) => {
            this.Users = data;
            this.applyRoleFilter();
          },
          error: (err) => {
            console.error('Error Searching User');
          }
        })
      }
    }

    onRoleChange(): void {
      this.Users = [...this.originalUsers];  // Reset to original list
      if (this.keyword) {
        this.onSearch(this.keyword);  // Re-apply search if there's a keyword
      } else {
        this.applyRoleFilter();  // Just apply role filter
      }
    }

    applyRoleFilter(): void {
      if (this.selectedRole) {
        this.Users = this.Users.filter(user => user.role === this.selectedRole);
      }
      this.UserNumber = this.Users.length;
      this.totalPages = Math.ceil(this.Users.length / this.itemsPerPage);
      this.currentPage = 1;
      this.updatePaginatedUsers();
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
   /*
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
    */
   return fulldate ;
  }
  
}