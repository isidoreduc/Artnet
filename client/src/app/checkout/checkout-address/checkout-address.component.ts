import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AccountService } from 'src/app/account/account.service';
import { IUserAddress } from 'src/app/shared/model/user';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss']
})
export class CheckoutAddressComponent implements OnInit {
  @Input() checkoutForm: FormGroup;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.getUserAddress();

  }

  getUserAddress = () => this.accountService.getUserAddress().subscribe(
    (a: IUserAddress) => {
      if(a) this.checkoutForm.get("addressForm").patchValue(a);
    }, err => console.log(err));

  updateUserAddress = () => this.accountService.updateUserAddress(this.checkoutForm.get("addressForm").value);

}
