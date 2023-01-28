import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ItemImage } from '../models/image';
import { Product } from '../models/product.model';
import { ServerResponse } from '../models/server-response.model';

const domain = environment.api;
const getSingleProductEndpoint = domain + 'product/details/';
const createProductEndpoint = domain + 'product/add';
const editProductEndpoint = domain + 'product/edit/';
const deleteProductEndpoint = domain + 'product/delete/';
const rateProductEndpoint = domain + 'product/rate/';
const searchProductEndpoint = domain + 'product/search';

const saveImageEndpoint = domain + 'product/gallery';
const deleteImageEndpoint = domain + 'product/gallery/';
const saveMainImageEndpoint = domain + 'product/picture';
const deleteMainImageEndpoint = domain + 'product/picture/';
const getImageEndpoint = domain + 'picture/';

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

  saveImage(product: Product, payload: ItemImage): Observable<ServerResponse<string>> {
    const profileData = new FormData();
    profileData.append('productId', product._id);
    profileData.append('name', payload.name);
    profileData.append('image', payload.image);

    return this.http.post<ServerResponse<string>>(saveImageEndpoint, profileData);
  }

  deleteImage(pictureId: string): Observable<ServerResponse<any>> {
    return this.http.delete<ServerResponse<any>>(deleteImageEndpoint + pictureId);
  }

  saveMainImage(product: Product, payload: ItemImage): Observable<ServerResponse<any>> {
    const profileData = new FormData();
    profileData.append('productId', product._id);
    profileData.append('name', payload.name);
    profileData.append('image', payload.image);
    return this.http.post<ServerResponse<any>>(saveMainImageEndpoint, profileData);
  }

  deleteMainImage(product: Product): Observable<ServerResponse<any>> {
    return this.http.delete<ServerResponse<any>>(deleteMainImageEndpoint + product._id);
  }

  getImage(imageId: string): Observable<ServerResponse<ItemImage>> {
    return this.http.get<ServerResponse<ItemImage>>(getImageEndpoint + imageId);
  }

  search(query: string): Observable<ServerResponse<string[]>> {
    return this.http.get<ServerResponse<string[]>>(searchProductEndpoint + query);
  }
}
