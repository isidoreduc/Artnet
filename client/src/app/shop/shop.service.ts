import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPagination, IProduct } from '../shared/model/product';
import { IType } from '../shared/model/product-details';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseurl = 'https://localhost:5001/api/'

  constructor(private http: HttpClient) { }

  getProducts = (typeId?: number, currentId?: number, authorId?: number, sort?: string) => {
    let params = new HttpParams();
    params = typeId ? params.append('typeId', typeId.toString()) : params;
    params = currentId ? params.append('currentId', currentId.toString()) : params;
    params = authorId ? params.append('authorId', authorId.toString()) : params;
    params = sort ? params.append('sort', sort) : params;
    return this.http.get<IPagination>(this.baseurl + "products", { params: params})
  };

  // getProductById = (id: number) => this.http.get<IProduct>(this.baseurl + `products/${id}`);

  getProductTypes = () => this.http.get<IType[]>(this.baseurl + 'products/types');
  getProductAuthors = () => this.http.get<IType[]>(this.baseurl + 'products/authors');
  getProductCurrents = () => this.http.get<IType[]>(this.baseurl + 'products/currents');
}
