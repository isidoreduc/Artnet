import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket, IBasketItem } from '../../basket';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss']
})
export class BasketSummaryComponent implements OnInit {
  @Input() isSummary = true;
  @Input('ngModel') quantity: number;

  basket$: Observable<IBasket>;
  @Output() updateQuantityEvent = new EventEmitter<object>();
  @Output() deleteItemEvent = new EventEmitter();

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  updateQuantity = (data: any) => {
    this.updateQuantityEvent.emit(data);
  };
  deleteItem = (item: IBasketItem) => this.deleteItemEvent.emit(item);
}
