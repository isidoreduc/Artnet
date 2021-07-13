import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PaginationHeaderComponent } from './model/components/pagination-header/pagination-header.component';
import { PaginationComponent } from './model/components/pagination/pagination.component';
import { OrderTotalsComponent } from './model/components/order-totals/order-totals.component';



@NgModule({
  declarations: [
    PaginationHeaderComponent,
    PaginationComponent,
    OrderTotalsComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot()
  ],
  exports: [PaginationModule, PaginationComponent, PaginationHeaderComponent, OrderTotalsComponent]
})
export class SharedModule { }
