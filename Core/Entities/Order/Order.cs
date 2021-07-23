using System;
using System.Collections.Generic;

namespace Core.Entities.Order
{
    public class Order : BaseEntity
    {
    public Order()
    {
    }

    public Order(IReadOnlyList<OrderItem> orderItems, string shopperEmail, Address deliveryAddress, DeliveryMethod deliveryMethod, decimal subtotal)
        {
            OrderItems = orderItems;
            ShopperEmail = shopperEmail;
            DeliveryAddress = deliveryAddress;
            DeliveryMethod = deliveryMethod;
            Subtotal = subtotal;
        }

        public string ShopperEmail { get; set; }
        public DateTimeOffset OrderDate { get; set; } = DateTimeOffset.Now;
        public Address DeliveryAddress { get; set; }
        public DeliveryMethod DeliveryMethod { get; set; }
        public IReadOnlyList<OrderItem> OrderItems { get; set; }
        public decimal Subtotal { get; set; }
        public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;
        public string PaymentIntentId { get; set; }

        public decimal GetTotal() => Subtotal + DeliveryMethod.Price;

    }
}