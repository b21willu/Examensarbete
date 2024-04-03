import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3001/api/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getFilteredProducts(filterTerm?: string): Observable<any[]> {
    let apiUrlWithFilter = this.apiUrl;
    if (filterTerm) {
      apiUrlWithFilter += `?term=${filterTerm}`;
    }
    return this.http.get<any[]>(apiUrlWithFilter);
  }

  getProduct(sku: string): Observable<any> {
    const url = `${this.apiUrl}/${sku}`;
    return this.http.get<any>(url);
  }
}