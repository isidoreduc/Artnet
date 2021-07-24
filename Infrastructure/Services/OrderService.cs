using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.Identity;
using Core.Entities.Order;
using Core.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Services
{
  public class OrderService : IOrderService
  {
    private readonly UserManager<User> _userManager;

    private readonly IBasketRepository _basketRepo;
    private readonly IUnitOfWork _unitOfWork;
    public OrderService(IUnitOfWork unitOfWork, IBasketRepository basketRepo, UserManager<User> userManager)
    {
      _userManager = userManager;
      _unitOfWork = unitOfWork;
      _basketRepo = basketRepo;
    }

    public async Task<IEnumerable<DeliveryMethod>> GetDeliveryMethodsAsync() =>
      await _unitOfWork.Repository<DeliveryMethod>().GetAllAsync();

    public async Task<Order> CreateOrderAsync(string shopperEmail, int deliveryMethodId, string basketId, Core.Entities.Order.Address deliveryAddress)
    {
      // get basket from repo
      var basket = await _basketRepo.GetBasketAsync(basketId);

      // get items from the product repo
      var items = new List<OrderItem>();
      foreach (var item in basket.Items)
      {
        var productItem = await _unitOfWork.Repository<Product>().GetById(item.Id);
        var itemOrdered = new ProductItemOrdered(productItem.Id, productItem.Name, productItem.PictureUrl);
        var orderItem = new OrderItem(itemOrdered, productItem.Price, item.Quantity);
        items.Add(orderItem);
      }

      // get delivery method from repo
      var deliveryMethod = await _unitOfWork.Repository<DeliveryMethod>().GetById(deliveryMethodId);

      // calc subtotal
      var subtotal = items.Sum(item => item.Price * item.Quantity);

      // create order
      var order = new Order(items, shopperEmail, deliveryAddress, deliveryMethod, subtotal);


      // TODO: save to db
      _unitOfWork.Repository<Order>().Add(order);
      var result = await _unitOfWork.Complete();

      if (result <= 0) return null;
      // delete basket
      await _basketRepo.DeleteBasketAsync(basketId);

      // return order
      return order;
    }

    public async Task<Order> GetOrderByIdAsync(int id, string shopperEmail) =>
      await _unitOfWork.Repository<Order>().GetById(id);

    public async Task<IEnumerable<Order>> GetOrdersForUserAsync(string shopperEmail)
    {
      // var user = await _userManager.FindByEmailAsync(shopperEmail);
      // return await _unitOfWork.Repository<Order>().GetById(user.Id);;
      return null;
    }
  }
}