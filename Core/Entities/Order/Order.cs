using System;
using System.Collections.Generic;

namespace Core.Entities.Order
{
    public class Order : BaseEntity
    {
    public Order()
    {
    }

    public Order(IReadOnlyList<OrderItem> orderItems, string shopperEmail, DeliveryAddress deliveryAddress, DeliveryMethod deliveryMethod, decimal subtotal)
        {
            OrderItems = orderItems;
            ShopperEmail = shopperEmail;
            DeliveryAddress = deliveryAddress;
            DeliveryMethod = deliveryMethod;
            Subtotal = subtotal;
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