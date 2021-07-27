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
