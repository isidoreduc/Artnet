import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPagination, IProduct } from '../shared/model/product';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseurl = 'https://localhost:5001/api/'

  constructor(private http: HttpClient) { }

  getProducts = () => this.http.get<IPagination>(this.baseurl + "products?pagesize=50");

  getProductById = (id: number) => this.http.get<IProduct>(this.baseurl + `products/${id}`);
}
