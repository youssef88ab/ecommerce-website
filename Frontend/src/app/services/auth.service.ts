import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from './user.service';

@Injectable({
  providedIn: 'root' // Makes this service available throughout the app
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8080/api/auth'; // Replace with your backend API

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<{ token: string , username: string , role: string}>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('username', response.username);
          localStorage.setItem('role' , response.role);
          this.router.navigate([`/${this.getRole()?.toLocaleLowerCase()}`]) ;
        })
      );
  }

  signUp(User : User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/signUp`, User);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  hasRole(role: string | undefined | null): boolean {
    if (!role) return false;
  
    const storedRoles = localStorage.getItem('role'); 
    if (!storedRoles) return false;
  
    return storedRoles.toUpperCase().includes(role.toUpperCase());
  }
  

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  isAdmin(): boolean {
    return this.hasRole('ADMIN');
  }

  isCustomer(): boolean {
    return this.hasRole('CUSTOMER');
  }

  isDelivrer(): boolean {
    return this.hasRole('DELIVERER');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }


}
