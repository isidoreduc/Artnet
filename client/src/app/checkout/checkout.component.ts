import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AccountService } from '../account/account.service';
import { BasketService } from '../basket/basket.service';
import { IBasketTotals } from '../shared/model/basket';
import { IDeliveryMethod } from '../shared/model/order';
import { IUserAddress } from '../shared/model/user';
import { CheckoutService } from './checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  deliveryCost: number;
  deliveryMethods: IDeliveryMethod[];
  deliveryAddress: IUserAddress;
  basketTotals$: Observable<IBasketTotals>;

  constructor(private fb: FormBuilder, private accountService: AccountService, private toastrService: ToastrService,
    private checkoutService: CheckoutService, private basketService: BasketService, private router: Router) { }

  ngOnInit(): void {
    this.createCheckoutForm();
    this.getUserAddress();
    this.getDeliveryMethods();
    this.getDeliveryMethodValue();
    this.basketTotals$ = this.basketService.basketTotals$;
  }

  createCheckoutForm = () => {
    this.checkoutForm = this.fb.group({
      addressForm: this.fb.group({
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        street: [null, Validators.required],
        city: [null, Validators.required],
        country: [null, Validators.required],
        zipCode: [null, Validators.required],
      }),

      deliveryForm: this.fb.group({
        deliveryMethod: [null, Validators.required],
      }),

      paymentForm: this.fb.group({
        nameOnCard: [null, Validators.required]
      })
    });
  };

  getDeliveryMethodValue = () => {
    const basket = this.basketService.getCurrentBasketValue();
    if(basket.deliveryMethodId)
      this.checkoutForm.get("deliveryForm").get("deliveryMethod").patchValue(basket.deliveryMethodId.toString());
  }

  getUserAddress = () => this.accountService.getUserAddress().subscribe(
    (a: IUserAddress) => {
      if (a) {
        this.checkoutForm.get("addressForm").patchValue(a);
        this.deliveryAddress = a;
      }
    }, err => console.log(err));


  updateUserAddress = (event: any) => this.accountService.updateUserAddress(this.checkoutForm.get("addressForm").value)
    .subscribe(
      () => {
        this.toastrService.success("User address successfully updated", "Update success");
      },
      err => {
        console.log(err);
        this.toastrService.error(err.message, "Update error");
      }
    );


  getDeliveryMethods = () => this.checkoutService.getDeliveryMethods().subscribe(result =>
    this.deliveryMethods = result, err => console.log(err));


  updateDeliveryCost = (event: IDeliveryMethod) => {
    this.basketService.setShippingCost(event);
  };

  createOrder = (event: any) => {
    const order = {
      basketId: localStorage.getItem("basket_id"),
      deliveryMethodId: this.basketService.getCurrentBasketValue().deliveryMethodId,
      deliveryAddress: this.deliveryAddress
    };
    this.checkoutService.createOrder(order).subscribe(
      () => {
        this.basketService.resetBasket();
        this.router.navigateByUrl("/shop");
        this.toastrService.success("Created order successfully", "Order submitted");
      },
      err => this.toastrService.error(err.message, "Order error")
    );
  };
}
