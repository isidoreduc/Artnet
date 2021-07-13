import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from 'src/app/shared/model/product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  quantity = 1;


  constructor(private shopService: ShopService, private routeActive: ActivatedRoute,
    private breadcrumbService: BreadcrumbService, private basketService: BasketService, private toastr: ToastrService) {
    this.breadcrumbService.set("@productDetails", " "); // space, not empty string - show nothing under spinner
  }

  ngOnInit(): void {
    this.getProductById();
  }

  getProductById = () => this.shopService.getProductById(Number(this.routeActive.snapshot.paramMap.get('id')))
    .subscribe(p => {
      this.product = p;
      this.breadcrumbService.set("@productDetails", this.product.name);
    }, err => console.log(err));

  addItemToBasket = (item: IProduct, quantity: number) => {
    this.basketService.addItemToBasket(item, quantity);
    this.toastr.success(`Added ${this.quantity} copies to the basket`, "Success!");
  };

  updateQuantity = (event: number) => this.quantity = event;
}
