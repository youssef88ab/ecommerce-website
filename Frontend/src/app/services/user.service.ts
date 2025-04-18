import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Roles {
  id :  number , 
  name : string
}

export interface User {
  id: number;
  username: string;
  email: string;
  roles: Roles[];
  address: string ;
  phone : string;
  birthDate : string;
  gender : string;
  dateAdded : string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:8080/api/users'; // User API

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  addUser(User: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/add`, User);
  }

  updateUser(User: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/update/${User.id}`,User);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  searchUser(keyword: string) : Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/search/keyword/${keyword}`);
  }
}
