import { IUserAddress } from "./user";

export interface IDeliveryMethod {
  id: number;
  name: string;
  deliveryTime: string;
  description: string;
  price: number;
}


export interface IOrder {
  basketId: string;
  deliveryMethodId: number;
  deliveryAddress: IUserAddress;
}

export interface IServerOrder {
  id: number;
  name: string;
  shopperEmail: string;
  orderDate: string;
  deliveryAddress: IUserAddress;
  deliveryMethod: string;
  deliveryPrice: number;
  orderItems: OrderItem[];
  subtotal: number;
  total: number;
  orderStatus: string;
}

export interface OrderItem {
  id: number;
  name: string;
  productPictureUrl: string;
  price: number;
  quantity: number;
}

