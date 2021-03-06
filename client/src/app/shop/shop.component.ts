import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IPagination, IProduct } from '../shared/model/product';
import { IAuthor, ICurrent, IType } from '../shared/model/product-details';
import { ShopParams } from '../shared/model/shop-params';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search') searchTerm: ElementRef;
  products: IProduct[];
  types: IType[];
  currents: ICurrent[];
  authors: IAuthor[];
  sortOptions = [
    { name: 'A-Z', value: 'name' },
    { name: 'Price asc.', value: 'priceAsc' },
    { name: 'Price desc', value: 'priceDesc' }
  ]
  shopParams = new ShopParams();
  totalCount = 0;

  constructor(public shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getProductTypes();
    this.getProductCurrents();
    this.getProductAuthors();
  }

  getProducts = () => this.shopService.getProducts(this.shopParams)
    .subscribe((response: IPagination) => {
      this.products = response.data;
      this.shopParams.pageIndex = response.pageIndex;
      this.shopParams.pageSize = response.pageSize;
      this.totalCount = response.count;
    }, error => console.log(error));


  getProductTypes = () => this.shopService.getProductTypes()
    .subscribe((response: IType[]) => this.types = [{ id: 0, name: 'All Types' }, ...response], error => console.log(error));

  getProductCurrents = () => this.shopService.getProductCurrents()
    .subscribe((response: ICurrent[]) => this.currents = [{ id: 0, name: 'All Currents' }, ...response], error => console.log(error));

  getProductAuthors = () => this.shopService.getProductAuthors()
    .subscribe((response: IAuthor[]) => this.authors = [{ id: 0, name: 'All Artists' }, ...response], error => console.log(error));

  onTypeSelected = (typeId: number) => {
    this.shopParams.typeId = typeId;
    this.shopParams.pageIndex = 1; //reset index
    this.getProducts();
  }

  onCurrentSelected = (currentId: number) => {
    this.shopParams.currentId = currentId;
    this.shopParams.pageIndex = 1;
    this.getProducts();
  }


  onSortSelected = (sort: string) => {
    this.shopParams.sort = sort;
    this.getProducts();
  }

  onSearch = () => {
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageIndex = 1;
    this.getProducts();
  }

  onSearchReset = () => {
    this.searchTerm.nativeElement.value = '';
    this.shopParams.search = '';
    this.getProducts();
  }

  onPageChanged = (event: any) => {
    this.shopParams.pageIndex = event;
    this.getProducts();
  }
}
