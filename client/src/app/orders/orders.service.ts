import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IServerOrder } from '../shared/model/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getOrders = () => this.http.get<IServerOrder[]>(this.baseUrl + "order").pipe(map(
    orders => orders.sort(
      (a: IServerOrder, b: IServerOrder) => Number(b.orderDate) - Number(a.orderDate))));

  getOrderById = (id: number) => this.http.get<IServerOrder>(this.baseUrl + "order/" + id);
}
