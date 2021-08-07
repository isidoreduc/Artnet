import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PaginationHeaderComponent } from './model/components/pagination-header/pagination-header.component';
import { PaginationComponent } from './model/components/pagination/pagination.component';
import { OrderTotalsComponent } from './model/components/order-totals/order-totals.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TextInputComponent } from './model/components/text-input/text-input.component';
import {CdkStepperModule} from '@angular/cdk/stepper';
import { StepperComponent } from './model/components/stepper/stepper.component';
import { BasketSummaryComponent } from './model/components/basket-summary/basket-summary.component';



@NgModule({
  declarations: [
    PaginationHeaderComponent,
    PaginationComponent,
    OrderTotalsComponent,
    TextInputComponent,
    StepperComponent,
    BasketSummaryComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
    RouterModule,
    ReactiveFormsModule,
    CdkStepperModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    PaginationModule,
    PaginationComponent,
    PaginationHeaderComponent,
    OrderTotalsComponent,
    ReactiveFormsModule,
    BsDropdownModule,
    TextInputComponent,
    CdkStepperModule,
    StepperComponent,
    BasketSummaryComponent

  ]
})
export class SharedModule { }
