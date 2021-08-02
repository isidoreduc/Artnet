using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.Identity;
using Core.Entities.Order;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Services
{
  public class OrderService : IOrderService
  {
    private readonly UserManager<User> _userManager;
    private readonly IStripeService _stripeService;

    private readonly IBasketRepository _basketRepo;
    private readonly IUnitOfWork _unitOfWork;
    public OrderService(IUnitOfWork unitOfWork, IBasketRepository basketRepo, UserManager<User> userManager, IStripeService stripeService)
    {
      _stripeService = stripeService;
      _userManager = userManager;
      _unitOfWork = unitOfWork;
      _basketRepo = basketRepo;
    }

    public async Task<IEnumerable<DeliveryMethod>> GetDeliveryMethodsAsync() =>
      await _unitOfWork.Repository<DeliveryMethod>().GetAllAsync();



    public async Task<Order> CreateOrderAsync(string shopperEmail, int deliveryMethodId, string basketId, DeliveryAddress deliveryAddress, string orderStatus)
    {
      // get basket from repo
      var basket = await _basketRepo.GetBasketAsync(basketId);

      // get items from the product repo
      var items = new List<OrderItem>();
      foreach (var item in basket.Items)
      {
        var productItem = await _unitOfWork.Repository<Product>().GetById(item.Id);
        var itemOrdered = new ProductItemOrdered(productItem.Id, productItem.Name, productItem.PictureUrl, item.Type, item.Current, item.Author);
        var orderItem = new OrderItem(itemOrdered, productItem.Price, item.Quantity);
        items.Add(orderItem);
      }

      // get delivery method from repo
      var deliveryMethod = await _unitOfWork.Repository<DeliveryMethod>().GetById(deliveryMethodId);

      // calc subtotal
      var subtotal = items.Sum(item => item.Price * item.Quantity);

      // create order
      var order = new Order(shopperEmail, deliveryAddress, deliveryMethod, items, subtotal, orderStatus, basket.PaymentIntentId);

      // check if there is already an order with same paymentIntentId and delete it; create a new intent for new order
      var orders = await _unitOfWork.Repository<Order>().GetAllAsync();
      var existingOrder = orders.FirstOrDefault(o => o.PaymentIntentId == order.PaymentIntentId);
      if (existingOrder != null)
      {
        _unitOfWork.Repository<Order>().Delete(existingOrder);
        await _stripeService.CreateOrUpdatePaymentIntent(basketId);
      }

      // TODO: save to db
      _unitOfWork.Repository<Order>().Add(order);
      var result = await _unitOfWork.Complete();

      if (result <= 0) return null;
      // // delete basket or not
      // if (orderStatus == "Payment Received")
      //   await _basketRepo.DeleteBasketAsync(basketId);

      // return order
      return order;
    }

    public async Task<Order> GetOrderByIdAsync(int id, string shopperEmail)
    {
      var spec = new OrdersWithItemsByDateSpecification(id, shopperEmail);
      return await _unitOfWork.Repository<Order>().GetEntityWithSpecification(spec);
    }

    public async Task<IEnumerable<Order>> GetOrdersForUserAsync(string shopperEmail)
    {
      var spec = new OrdersWithItemsByDateSpecification(shopperEmail);
      return await _unitOfWork.Repository<Order>().GetAllWithSpecification(spec);
    }
  }
}