using System;
using System.Collections.Generic;

namespace Core.Entities.Order
{
    public class Order : BaseEntity
    {
    public Order()
    {
    }

    public Order(string shopperEmail, DeliveryAddress deliveryAddress, DeliveryMethod deliveryMethod, IReadOnlyList<OrderItem> orderItems, decimal subtotal, string orderStatus, string paymentIntentId)
    {
      ShopperEmail = shopperEmail;
      DeliveryAddress = deliveryAddress;
      DeliveryMethod = deliveryMethod;
      OrderItems = orderItems;
      Subtotal = subtotal;
      OrderStatus = orderStatus;
      PaymentIntentId = paymentIntentId;
    }

    public string ShopperEmail { get; set; }
        public DateTimeOffset OrderDate { get; set; } = DateTimeOffset.Now;
        public DeliveryAddress DeliveryAddress { get; set; }
        public DeliveryMethod DeliveryMethod { get; set; }
        public IReadOnlyList<OrderItem> OrderItems { get; set; }
        public decimal Subtotal { get; set; }
        public string OrderStatus { get; set; }
        public string PaymentIntentId { get; set; }

        public decimal GetTotal() => Subtotal + DeliveryMethod.Price;

    }
}