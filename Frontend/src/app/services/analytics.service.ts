import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

   private apiUrl = 'http://127.0.0.1:8080/api/analytics';
  
    constructor(private http: HttpClient) { }
  
    getTotalSales(): Observable<number> {
      return this.http.get<number>(`${this.apiUrl}/totalSales`);
    }

    getTotalUsers(): Observable<number> {
      return this.http.get<number>(`${this.apiUrl}/totalUsers`);
    }

    getYearlySales(): Observable<number[]> {
      return this.http.get<number[]>(`${this.apiUrl}/yearlySales`);
    }
}
