import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Basket, IBasket, IBasketItem } from '../shared/model/basket';
import { IProduct } from '../shared/model/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBasket>({ id: '', items: [] });
  basket$ = this.basketSource.asObservable();

  constructor(private http: HttpClient) { }

  getBasket = (id: string) =>
    this.http.get<IBasket>(this.baseUrl + `basket?basketId=${id}`)
      .pipe(
        map((basket: IBasket) =>
          this.basketSource.next(basket)
        ));

  createOrUpdateBasket = (basket: IBasket) => this.http.post<IBasket>(this.baseUrl + "basket", basket)
    .subscribe(response => {
      this.basketSource.next(response);
      console.log(response)
    }, err => console.log(err));


  deleteBasket = (id: string) => this.http.delete<boolean>(this.baseUrl + `basket?basketid=${id}`);

  getCurrentBasketValue = () => this.basketSource.value;

  addItemToBasket = (item: IProduct, quantity = 1) => {
    const itemToAdd: IBasketItem = this.mapProductToBasketItem(item, quantity);
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    const index = basket.items.findIndex(item => item.id === itemToAdd.id);
    if (index >= 0) {
      basket.items[index].quantity += quantity;
    }
    else {
      basket.items.push(itemToAdd);
    }
    this.createOrUpdateBasket(basket);
  }




  private mapProductToBasketItem = (item: IProduct, quantity: number): IBasketItem => {
    const mapped = {
      id: item.id,
      name: item.name,
      price: item.price,
      pictureUrl: item.pictureUrl,
      quantity,
      author: item.author,
      type: item.productType,
      current: item.productCurrent
    };
    return mapped;
  }

  private createBasket = (): IBasket => {
    const basket = new Basket();
    localStorage.setItem("basket_id", basket.id);
    return basket;
  }
}