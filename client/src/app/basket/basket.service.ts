import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  getBasket = (id: string) =>
    this.http.get<IBasket>(this.baseUrl + `basket?basketId=${id}`)
      .pipe(
        map((basket: IBasket) =>
          this.basketSource.next(basket)
        ));

  createOrUpdateBasket = (basket: IBasket) => this.http.post<IBasket>(this.baseUrl + "basket", basket)
    .subscribe(response => {
      this.basketSource.next(response);
      console.log(response);
    }, err => console.log(err));


  deleteBasket = (id: string) => this.http.delete<boolean>(this.baseUrl + `basket?basketid=${id}`)
    .subscribe(() => {
      this.basketSource.next(null);
      localStorage.removeItem("basket_id");
    }, err => console.log(err));

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
  };

  deleteItemFromBasket = (item: IBasketItem) => {
    let basket = this.basketSource.value;
    basket.items = basket.items.some(i => i.id === item.id) ? basket.items.filter(i => i.id !== item.id) : basket.items;
    if (basket.items.length > 0) {
      this.createOrUpdateBasket(basket);
      // this.router.navigateByUrl("/");
      // window.onbeforeunload = () => "";
    }
    else {
      this.deleteBasket(basket.id);
      this.router.navigateByUrl("/");
    }
  };




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
  };

  private createBasket = (): IBasket => {
    const basket = new Basket();
    localStorage.setItem("basket_id", basket.id);
    return basket;
  };
}
