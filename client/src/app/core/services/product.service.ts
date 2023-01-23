import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';
import { ServerResponse } from '../models/server-response.model';

const domain = environment.api;
const getSingleProductEndpoint = domain + 'product/details/';
const createProductEndpoint = domain + 'product/add';
const editProductEndpoint = domain + 'product/edit/';
const deleteProductEndpoint = domain + 'product/delete/';
const rateProductEndpoint = domain + 'product/rate/';
const searchProductEndpoint = domain + 'product/search';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getSingleProduct(id: string): Observable<ServerResponse<Product>> {
    return this.http.get<ServerResponse<Product>>(getSingleProductEndpoint + id);
  }

  createProduct(payload: Product): Observable<ServerResponse<Product>> {
    return this.http.post<ServerResponse<Product>>(createProductEndpoint, payload);
  }

  editProduct(id: string, payload: Product): Observable<ServerResponse<Product>> {
    return this.http.put<ServerResponse<Product>>(editProductEndpoint + id, payload);
  }

  deleteProduct(id: string): Observable<ServerResponse<Product>> {
    return this.http.delete<ServerResponse<Product>>(deleteProductEndpoint + id);
  }

  rateProduct(id: string, payload: object): Observable<ServerResponse<Product>> {
    return this.http.post<ServerResponse<Product>>(rateProductEndpoint + id, payload);
  }

  search(query: string): Observable<ServerResponse<Product[]>> {
    return this.http.get<ServerResponse<Product[]>>(searchProductEndpoint + query);
  }
}
