import { Component, Input, OnInit } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from 'src/app/shared/model/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product: IProduct;
  
  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    
  }

  addItemToBasket = () => this.basketService.addItemToBasket(this.product);
}
