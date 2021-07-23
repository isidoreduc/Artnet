using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.Order;
using Core.Interfaces;

namespace Infrastructure.Services
{
  public class OrderService : IOrderService
  {
    private readonly IGenericRepository<Order> _orderRepo;
    private readonly IBasketRepository _basketRepo;
    private readonly IGenericRepository<Product> _productRepo;
    private readonly IGenericRepository<DeliveryMethod> _deliveryMethRepo;
    public OrderService(IGenericRepository<Order> orderRepo, IBasketRepository basketRepo,
    IGenericRepository<Product> productRepo, IGenericRepository<DeliveryMethod> deliveryMethRepo)
    {
      _deliveryMethRepo = deliveryMethRepo;
      _productRepo = productRepo;
      _basketRepo = basketRepo;
      _orderRepo = orderRepo;
    }

    public async Task<IEnumerable<DeliveryMethod>> GetDeliveryMethodsAsync() =>
      await _deliveryMethRepo.GetAllAsync();

    public async Task<Order> CreateOrderAsync(string shopperEmail, int deliveryMethodId, string basketId, Address deliveryAddress)
    {
      // get basket from repo
            var basket = await _basketRepo.GetBasketAsync(basketId);

            // get items from the product repo
            var items = new List<OrderItem>();
            foreach (var item in basket.Items)
            {
                var productItem = await _productRepo.GetById(item.Id);
                var itemOrdered = new ProductItemOrdered(productItem.Id, productItem.Name, productItem.PictureUrl);
                var orderItem = new OrderItem(itemOrdered, productItem.Price, item.Quantity);
                items.Add(orderItem);
            }

            // get delivery method from repo
            var deliveryMethod = await _deliveryMethRepo.GetById(deliveryMethodId);

            // calc subtotal
            var subtotal = items.Sum(item => item.Price * item.Quantity);

            // create order
            var order = new Order(items, shopperEmail, deliveryAddress, deliveryMethod, subtotal);


            // TODO: save to db


            // delete basket
            // await _basketRepo.DeleteBasketAsync(basketId);

            // return order
            return order;
    }

    public async Task<Order> GetOrderByIdAsync(int id, string shopperEmail) =>
      await _orderRepo.GetById(id);

    public Task<IEnumerable<Order>> GetOrdersForUserAsync(string shopperEmail)
    {
      return null;
    }
  }
}