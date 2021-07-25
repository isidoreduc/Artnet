using System;
using System.Collections.Generic;
using Core.Entities;

namespace API.DTOs
{
  public class OrderForFrontendDto : BaseEntity
  {
    public string ShopperEmail { get; set; }
    public DateTimeOffset OrderDate { get; set; }
    public AddressDto DeliveryAddress { get; set; }
    public string DeliveryMethod { get; set; }
    public decimal DeliveryPrice { get; set; }
    public IReadOnlyList<OrderItemDto> OrderItems { get; set; }
    public decimal Subtotal { get; set; }
    public decimal Total { get; set; }
    public string OrderStatus { get; set; }
  }
}