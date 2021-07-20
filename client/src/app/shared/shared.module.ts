import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PaginationHeaderComponent } from './model/components/pagination-header/pagination-header.component';
import { PaginationComponent } from './model/components/pagination/pagination.component';
import { OrderTotalsComponent } from './model/components/order-totals/order-totals.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TextInputComponent } from './model/components/text-input/text-input.component';



@NgModule({
  declarations: [
    PaginationHeaderComponent,
    PaginationComponent,
    OrderTotalsComponent,
    TextInputComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    PaginationModule,
    PaginationComponent,
    PaginationHeaderComponent,
    OrderTotalsComponent,
    ReactiveFormsModule,
    BsDropdownModule,
    TextInputComponent

  ]
})
export class SharedModule { }
