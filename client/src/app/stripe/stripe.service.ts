import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BasketService } from '../basket/basket.service';
import { IBasket } from '../shared/model/basket';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private basketService: BasketService) { }


  createOrUpdateIntent = (basketId: string) => this.http.post<IBasket>(this.baseUrl + `stripe/${basketId}`, {})
    .pipe(map(result => {
      this.basketService.createOrUpdateBasket(result);
    }));
}
