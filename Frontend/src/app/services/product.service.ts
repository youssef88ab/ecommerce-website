// product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stockQuantity: number;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://127.0.0.1:8080/products'; // Product API

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/add`, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/update/${product.id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  searchProduct(keyword: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/search/keyword/${keyword}`);
  }

  getProductsCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }
}