import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductReportService {

  productFormData: Product = new Product();
  readonly baseURL = 'http://localhost:7040/api/Products';
  list!: Product[];

  constructor(private http: HttpClient) { }

  createProduct() {
    return this.http.post('this.baseURL', this.productFormData);
  }
  updateProduct() {
    return this.http.put('${this.baseURL}/${this.productFormData.productId}', this.productFormData);
  }
  deleteProduct(id: number) {
    return this.http.delete('${this.baseURL}/${id}');
  }

  refreshList() {
    lastValueFrom(this.http.get(this.baseURL))
      .then(res =>this.list = res as Product[]);
  }
  
}
