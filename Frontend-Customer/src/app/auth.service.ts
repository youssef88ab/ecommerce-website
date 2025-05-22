// auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, {email, password})
    .subscribe({
      next: (response) => {
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('user_role', response.role);
        localStorage.setItem('username', response.username);
        this.redirectBasedOnRole(response.role);
      },
      error: (error) => {
        console.error('Login failed:', error);
      }
    });
  }
  private redirectBasedOnRole(role: number) {
    switch(role) {
      case 1:
        this.router.navigate(['/']);
        break;
      case 2:
        this.router.navigate(['/shop']);
        break;
      case 3:
        this.router.navigate(['/livrer']);
        break;
      default:
        this.router.navigate(['/']);
    }
  }

  register(userData: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.apiUrl}/register`, userData, { observe: 'response' })
        .subscribe({
          next: (response) => {
            this.router.navigate(['/login']);
            resolve(true);
          },
          error: (err) => {
            console.error('Registration failed:', err.error);
            reject(err.error);
          }
        });
    });
  }
}
