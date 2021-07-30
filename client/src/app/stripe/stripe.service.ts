import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IBasket } from '../shared/model/basket';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createOrUpdateIntent = (basketId: string) => this.http.post<IBasket>(this.baseUrl + `stripe/${basketId}`, {});
}
