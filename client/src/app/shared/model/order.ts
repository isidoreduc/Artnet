// import { IUserAddress } from "./user";

export interface IDeliveryMethod {
  id: number;
  name: string;
  deliveryTime: string;
  description: string;
  price: number;
}

// export interface IOrder {
//   id: number;
//   shopperEmail: string;
//   orderDate: string;
//   deliveryAddress: IUserAddress;
//   deliveryMethod: string;
//   deliveryPrice: number;
//   orderItems: IOrderItem[];
//   subtotal: number;
//   total: number;
//   orderStatus: string;
// }

// export interface IOrderItem {
//   id: number;
//   name:	string;
//   productPictureUrl:	string;
//   price:	number;
//   quantity:	number;
// }