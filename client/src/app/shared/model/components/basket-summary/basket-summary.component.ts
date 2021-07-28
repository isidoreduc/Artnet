import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket, IBasketItem } from '../../basket';
import { IOrderItem } from '../../order';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss']
})
export class BasketSummaryComponent implements OnInit {
  @Input() isSummary = true;
  @Input() isOrderSummary = false;
  @Input('ngModel') quantity: number;

  @Input() items: any[];
  @Output() updateQuantityEvent = new EventEmitter<object>();
  @Output() deleteItemEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  updateQuantity = (data: any) => {
    this.updateQuantityEvent.emit(data);
  };
  deleteItem = (item: IBasketItem) => this.deleteItemEvent.emit(item);
}
