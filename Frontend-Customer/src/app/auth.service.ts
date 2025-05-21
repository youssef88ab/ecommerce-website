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
