using System;
using System.Linq.Expressions;
using Core.Entities.Order;

namespace Core.Specifications
{
  public class OrderByPaymentIntentSpecification : BaseSpecification<Order>
  {
    public OrderByPaymentIntentSpecification(string paymentIntentId) : base(p => p.PaymentIntentId == paymentIntentId)
    {
    }
  }
}