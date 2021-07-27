import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../account/account.service';
import { BasketService } from '../basket/basket.service';
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

  constructor(private fb: FormBuilder, private accountService: AccountService, private toastrService: ToastrService,
    private checkoutService: CheckoutService, private basketService: BasketService) { }

  ngOnInit(): void {
    this.createCheckoutForm();
    this.getUserAddress();
    this.getDeliveryMethods();
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


  getUserAddress = () => this.accountService.getUserAddress().subscribe(
    (a: IUserAddress) => {
      if (a) this.checkoutForm.get("addressForm").patchValue(a);
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
      this.deliveryMethods = result, err => console.log(err) );


    updateDeliveryCost = (event: IDeliveryMethod) =>
      this.basketService.setShippingCost(event);
}
