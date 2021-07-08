import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/model/product';
import { ShopParams } from 'src/app/shared/model/shop-params';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  products: IProduct[];
  shopParams = new ShopParams();
  selection: IProduct[] = [];

  constructor(private shopService: ShopService, private routeActive: ActivatedRoute) { }

  ngOnInit(): void {
    this.shopParams.pageSize = 50;
    this.getProductById();
    this.getProducts();
    // this.getRandomProds();
  }

  getProductById = () => this.shopService.getProductById(Number(this.routeActive.snapshot.paramMap.get('id')))
    .subscribe(p => this.product = p, err => console.log(err));

  getProducts = () => this.shopService.getProducts(this.shopParams)
    .subscribe(p => this.products = p.data, err => console.log(err));

  //  getRandomProds = async () => {
  //   var prods = await this.shopService.getProducts(this.shopParams).toPromise();
  //   for (let index = 0; index < 4; index++) {
  //     let random = prods.data[Math.floor(Math.random()*prods.data.length)].id;
  //     const element: IProduct = prods.data[random];
  //     this.selection.push(element);
  //   }
  //   return this.selection;
  // }
}
