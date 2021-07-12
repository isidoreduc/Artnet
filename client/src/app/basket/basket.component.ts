import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Basket, IBasket, IBasketItem } from '../shared/model/basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  basket$: Observable<IBasket>;
  constructor(private basketService: BasketService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  // deleteItem = (item: IBasketItem) => this.basketService.deleteItemFromBasket(item);
}
