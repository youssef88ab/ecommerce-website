import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ProductListingDTO {
  productId: number;
  productName: string;
  rating: number;
  description: string;
  originalPrice: number;
  price: number;
  mainImgUrl: string;
}

interface PageResponse<T> {
  content: any[];
  totalElements: number;
  number: number;
  totalPages: number;
  size: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {}

  getProducts(page: number = 0, size: number = 10): Observable<PageResponse<ProductListingDTO>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    
    return this.http.get<PageResponse<ProductListingDTO>>(this.apiUrl, { params });
  }
  getProductById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
