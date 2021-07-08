import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPagination, IProduct } from '../shared/model/product';
import { IType } from '../shared/model/product-details';
import { ShopParams } from '../shared/model/shop-params';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseurl = 'https://localhost:5001/api/'

  constructor(private http: HttpClient) { }

  getProducts = (shopParams: ShopParams) => {
    let params = new HttpParams();
    params = shopParams.typeId !== 0 ? params.append('typeId', shopParams.typeId.toString()) : params;
    params = shopParams.currentId !== 0 ? params.append('currentId', shopParams.currentId.toString()) : params;
    params = shopParams.authorId !== 0 ? params.append('authorId', shopParams.authorId.toString()) : params;
    params = shopParams.sort ? params.append('sort', shopParams.sort) : params;
    params = shopParams.search ? params.append('search', shopParams.search) : params;
    params = params.append("pageIndex", shopParams.pageIndex.toString());
    params = params.append("pageSize", shopParams.pageSize.toString());
    return this.http.get<IPagination>(this.baseurl + "products", { params: params })
  };

  getProductById = (id: number) => this.http.get<IProduct>(this.baseurl + `products/${id}`);

  getProductTypes = () => this.http.get<IType[]>(this.baseurl + 'products/types');
  getProductAuthors = () => this.http.get<IType[]>(this.baseurl + 'products/authors');
  getProductCurrents = () => this.http.get<IType[]>(this.baseurl + 'products/currents');
}
