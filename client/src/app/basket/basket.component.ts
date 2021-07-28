import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem, IBasketTotals } from '../shared/model/basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  basket$: Observable<IBasket>;
  basketTotals$: Observable<IBasketTotals>

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
    this.basketTotals$ = this.basketService.basketTotals$;
  }

  deleteItem = (item: IBasketItem) => this.basketService.deleteItemFromBasket(item);

  updateQuantity = (data: any) => {
    data.quantity = data.quantity < 0 ? 1 : data.quantity;
    let basket = this.basketService.getCurrentBasketValue();
    let basketItem = basket.items.filter(i => i.id === data.id)[0];
    basketItem.quantity = data.quantity;
    if (basketItem.quantity === 0)
      this.basketService.deleteItemFromBasket(basketItem);
    else
      this.basketService.createOrUpdateBasket(basket);
  };

}
