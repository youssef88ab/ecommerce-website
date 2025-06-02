// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserData {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:8080/api/profile';

  constructor(private http: HttpClient) { }

  getUserData(username: string): Observable<UserData> {
    return this.http.get<UserData>(`http://localhost:8080/api/profile?username=${username}`);
  }
}