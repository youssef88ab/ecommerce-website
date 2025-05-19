import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';

export interface Category {
  id: number;
  name: string;
}

export interface SubCategory {
  idSubCat: number;
  name: string;
  imgUrl: string;
  categoryId: number;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoriesUrl = 'http://localhost:8080/api/categories';
  private subcategoriesUrl = 'http://localhost:8080/api/subcategories';
  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl);
  }
  getSubcategories(): Observable<SubCategory[]> {
    return this.http.get<SubCategory[]>(this.subcategoriesUrl);
  } 
 
}
