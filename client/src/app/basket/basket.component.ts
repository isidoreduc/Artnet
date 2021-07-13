import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { takeLast } from 'rxjs/operators';
import { Basket, IBasket, IBasketItem } from '../shared/model/basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  basket$: Observable<IBasket>;
  @Input('ngModel') quantity: number;
  constructor(private basketService: BasketService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  deleteItem = (item: IBasketItem) => this.basketService.deleteItemFromBasket(item);

  updateQuantity = (event: number, basketItemId: number) => {
    // event = event < 0 ? 1 : event;

    let basket = this.basketService.getCurrentBasketValue();
    let basketItem = basket.items.filter(i => i.id === basketItemId)[0];
    basketItem.quantity = event;
    if (basketItem.quantity === 0)
      this.basketService.deleteItemFromBasket(basketItem);
    else
      this.basketService.createOrUpdateBasket(basket);
  };

  no_backspaces = (event: any) => {
    if (event.keyCode == 8) event.preventDefault();
  };
}
