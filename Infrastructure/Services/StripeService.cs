using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.Extensions.Configuration;
using Stripe;
using Product = Core.Entities.Product;

namespace Infrastructure.Services
{
  public class StripeService : IStripeService
  {
    private readonly IBasketRepository _basketRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IConfiguration _config;

    public StripeService(IBasketRepository basketRepository, IUnitOfWork unitOfWork, IConfiguration config)
    {
      _config = config;
      _unitOfWork = unitOfWork;
      _basketRepository = basketRepository;
    }

    public async Task<Basket> CreateOrUpdatePaymentIntent(string basketId)
    {
      StripeConfiguration.ApiKey = _config["Stripe:SecretKey"];
      var basket = await _basketRepository.GetBasketAsync(basketId);
      if(basket == null) return null;

      var shippingPrice = basket.DeliveryPrice;

      foreach (var item in basket.Items)
      {
        var productItem = await _unitOfWork.Repository<Product>().GetById(item.Id);
        // make sure the server price has not been tampered clientside
        item.Price = productItem.Price;
      }

      var service = new PaymentIntentService();
      PaymentIntent paymentIntent = null;

      if (basket.PaymentIntentId == null)
      {
        var paymentIntentOptions = new PaymentIntentCreateOptions
        {
          Amount = (long)basket.Items.Sum(item => item.Quantity * item.Price * 100) + (long)shippingPrice * 100,
          Currency = "usd",
          PaymentMethodTypes = new List<string>() { "card" }
        };
        paymentIntent = await service.CreateAsync(paymentIntentOptions);
        basket.PaymentIntentId = paymentIntent.Id;
        basket.ClientSecret = paymentIntent.ClientSecret;
      }
      else
      {
        var paymentIntentOptions = new PaymentIntentUpdateOptions
        {
          Amount = (long)basket.Items.Sum(item => item.Quantity * item.Price * 100) + (long)shippingPrice * 100,
          Currency = "usd",
        };
        await service.UpdateAsync(basket.PaymentIntentId, paymentIntentOptions);
      }

      await _basketRepository.CreateOrUpdateBasketAsync(basket);
      return basket;
    }
  }
}