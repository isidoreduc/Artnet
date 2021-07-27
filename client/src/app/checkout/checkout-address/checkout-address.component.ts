import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() updateAddressClickEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void { }

  updateUserAddress = (event: any) =>
    this.updateAddressClickEvent.emit(event);





}
