import { IBaseModel } from "./base-model";
import { IUserAddress } from "./user";

export interface IDeliveryMethod extends IBaseModel {
  deliveryTime: string;
  description: string;
  price: number;
}


export interface IOrder {
  basketId: string;
  deliveryMethodId: number;
  deliveryAddress: IUserAddress;
  orderStatus: string;
}

export interface IServerOrder extends IBaseModel{
  shopperEmail: string;
  orderDate: string;
  deliveryAddress: IUserAddress;
  deliveryMethod: string;
  deliveryPrice: number;
  orderItems: IOrderItem[];
  subtotal: number;
  total: number;
  orderStatus: string;
}

export interface IOrderItem extends IBaseModel{
  productPictureUrl: string;
  price: number;
  quantity: number;
  type: string,
  current: string,
  author: string;
}

