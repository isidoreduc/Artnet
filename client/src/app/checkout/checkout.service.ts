import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IDeliveryMethod} from '../shared/model/order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getDeliveryMethods = () => this.http.get<IDeliveryMethod[]>(this.baseUrl + "order/deliverymethods")
    .pipe(map(methods => methods.sort((a, b) => a.price - b.price)));

  // createOrder = (order: IOrder) => this.http.post<IOrder>(this.baseUrl + "order", order);
}
