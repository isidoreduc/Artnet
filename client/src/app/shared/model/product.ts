import { IBaseModel } from "./base-model";

export interface IProduct extends IBaseModel{
    description: string;
    price: number;
    pictureUrl: string;
    author: string;
    productType: string;
    productCurrent: string;
}

export interface IPagination {
    pageIndex: number;
    pageSize: number;
    count: number;
    data: IProduct[];
}