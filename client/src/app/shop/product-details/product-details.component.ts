import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/model/product';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;

  constructor(private shopService: ShopService, private routeActive: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.getProductById();
  }
  getProductById = () => this.shopService.getProductById(Number(this.routeActive.snapshot.paramMap.get('id')))
    .subscribe(p => this.product = p, err => console.log(err));
}
