import { IBaseModel } from "./base-model";
import { v4 as uuidv4 } from 'uuid';


export interface IBasketItem extends IBaseModel {
    price: number,
    quantity: number,
    pictureUrl: string,
    type: string,
    current: string,
    author: string;
}

export interface IBasket {
    id: string,
    items: IBasketItem[];
}

export interface IBasketTotals {
    shipping: number,
    subtotal: number,
    total: number;
}


export class Basket implements IBasket {
    id = uuidv4();
    items: IBasketItem[] = [];

}