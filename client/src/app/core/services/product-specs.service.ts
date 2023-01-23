import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductSpecification } from '../models/product.model';
import { ServerResponse } from '../models/server-response.model';

const domain = environment.api;
const getProductSpecsEndpoint = domain + 'specs/product/';
const getCategorySpecsEndpoint = domain + 'specs/category/';
const createProductSpecsEndpoint = domain + 'specs/add';
const editProductSpecsEndpoint = domain + 'specs/edit/';
const deleteProductSpecsEndpoint = domain + 'specs/delete/';

@Injectable({
  providedIn: 'root'
})
export class ProductSpecsService {

  constructor(private http: HttpClient) { }

  getProductSpecs(productId: string): Observable<ServerResponse<ProductSpecification[]>> {
    return this.http.get<ServerResponse<ProductSpecification[]>>(getProductSpecsEndpoint  + productId);
  }

  getCategoriesSpecs(category: string): Observable<ServerResponse<ProductSpecification[]>> {
    return this.http.get<ServerResponse<ProductSpecification[]>>(getCategorySpecsEndpoint + category);
  }

  createProductSpecs(payload: ProductSpecification): Observable<ServerResponse<ProductSpecification>> {
    return this.http.post<ServerResponse<ProductSpecification>>(createProductSpecsEndpoint, payload);
  }

  editProductSpecs(id: string, payload: ProductSpecification): Observable<ServerResponse<ProductSpecification>> {
    return this.http.put<ServerResponse<ProductSpecification>>(editProductSpecsEndpoint + id, payload);
  }

  deleteProductSpecs(id: string): Observable<ServerResponse<ProductSpecification>> {
    return this.http.delete<ServerResponse<ProductSpecification>>(deleteProductSpecsEndpoint + id);
  }
}
