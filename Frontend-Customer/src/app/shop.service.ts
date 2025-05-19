import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SubCategory {
  idSubCat: number;
  name: string;
  imgUrl: string;
  CategoryId: string;
}

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private apiUrl = 'http://localhost:8080/api/subcategories';

  constructor(private http: HttpClient) {}

  getAllSubcategories(): Observable<SubCategory[]> {
    return this.http.get<SubCategory[]>(this.apiUrl);
  } 
}
