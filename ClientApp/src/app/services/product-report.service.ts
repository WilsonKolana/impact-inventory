import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductReportService {

  productFormData: Product = new Product();
  readonly baseURL = 'https://localhost:7040/api/Products';

  readonly token = sessionStorage.getItem('token');
  readonly HeaderDict = {'Authorization': 'Bearer ' + this.token,     
                        'Content-Type': 'application/json',
                        'accept': 'text/plain'}

  readonly requestOptions = {                                                                                                                                                                                 
    headers: new HttpHeaders(this.HeaderDict), 
  };

  constructor(private http: HttpClient) { }

  createProduct() {
    return this.http.post(this.baseURL + '/CreateProduct', this.productFormData, this.requestOptions);
  }
  updateProduct() {
    return this.http.put(`${this.baseURL}/${this.productFormData.productId}`, this.productFormData, this.requestOptions);
  }
  deleteProduct(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`, this.requestOptions);
  }

  getAllProducts() {
    return this.http.get<Product[]>(this.baseURL, this.requestOptions);
  }
  
}
