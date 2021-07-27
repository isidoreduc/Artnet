import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { IUserAddress } from 'src/app/shared/model/user';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss']
})
export class CheckoutAddressComponent implements OnInit {
  @Input() checkoutForm: FormGroup;
  navigationSubscription: Subscription;

  constructor(private accountService: AccountService, private toastrService: ToastrService) {}

  ngOnInit(): void {
    this.getUserAddress();

  }

  getUserAddress = () => this.accountService.getUserAddress().subscribe(
    (a: IUserAddress) => {
      if (a) this.checkoutForm.get("addressForm").patchValue(a);
    }, err => console.log(err));

  updateUserAddress = () => this.accountService.updateUserAddress(this.checkoutForm.get("addressForm").value)
    .subscribe(
      () => {
        this.toastrService.success("User address successfully updated", "Update success");
      },
      err => {
        console.log(err);
        this.toastrService.error(err.message, "Update error");
      }
    );





}
