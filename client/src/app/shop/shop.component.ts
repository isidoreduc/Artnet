import { Component, OnInit } from '@angular/core';
import { IPagination, IProduct } from '../shared/model/product';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  products: IProduct[];
  

  constructor(public shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getProductById(3);
  }

  getProducts = () => this.shopService.getProducts()
    .subscribe((response: IPagination) => this.products = response.data, error => console.log(error));

  getProductById = (id: number) => this.shopService.getProductById(id)
    .subscribe((response: IProduct) => console.log(response), error => console.log(error));

}
