using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities.Order;

namespace Core.Interfaces
{
    public interface IOrderService
    {
      Task<Order> CreateOrderAsync(string shopperEmail, int deliveryMethod,
        string basketId, Address deliveryAddress);
      Task<IEnumerable<Order>> GetOrdersForUserAsync(string shopperEmail);
      Task<Order> GetOrderByIdAsync(int id, string shopperEmail);
      Task<IEnumerable<DeliveryMethod>> GetDeliveryMethodsAsync();
    }
}