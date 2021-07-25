using System;
using System.Linq.Expressions;
using Core.Entities.Order;

namespace Core.Specifications
{
  public class OrdersWithItemsByDateSpecification : BaseSpecification<Order>
  {
    public OrdersWithItemsByDateSpecification(string shopperEmail) : base(o => o.ShopperEmail == shopperEmail)
    {
      AddInclude(o => o.OrderItems);
      AddInclude(o => o.DeliveryMethod);
      AddOrderByDesc(o => o.OrderDate);
    }

    public OrdersWithItemsByDateSpecification(int id, string shopperEmail)
      : base(o => o.Id == id && o.ShopperEmail == shopperEmail)
    {
      AddInclude(o => o.OrderItems);
      AddInclude(o => o.DeliveryMethod);
    }
  }
}