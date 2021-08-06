using System.IO;
using System.Threading.Tasks;
using API.ErrorHandling;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stripe;
using Order = Core.Entities.Order.Order;
using Microsoft.Extensions.Logging;
using Core.Specifications;
using Microsoft.Extensions.Configuration;

namespace API.Controllers
{
  public class StripeController : BaseApiController
  {
    private readonly IStripeService _stripeService;
    private readonly string _webHookSecret;
    // command in stripe-cli: stripe listen -f https://localhost:5001/api/stripe/webhook
    private readonly ILogger<StripeController> _logger;
    private readonly IUnitOfWork _unitOfWork;

    public StripeController(IStripeService stripeService, ILogger<StripeController> logger, IUnitOfWork unitOfWork, IConfiguration config)
    {
      _unitOfWork = unitOfWork;
      _logger = logger;
      _stripeService = stripeService;
      _webHookSecret = config["Stripe:WebHookSecret"];
    }

    [Authorize]
    [HttpPost("{basketId}")]
    public async Task<ActionResult<Basket>> CreateOrUpdateIntent(string basketId)
    {
      var basket = await _stripeService.CreateOrUpdatePaymentIntent(basketId);
      return basket == null ? BadRequest(new ApiException(400, "Problems with your basket")) : basket;
    }


    [HttpPost("webhook")]
    public async Task<IActionResult> StripeHook()
    {
      var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
      var stripeEvent = EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"], _webHookSecret);

      PaymentIntent intent = (PaymentIntent)stripeEvent.Data.Object;
      var specification = new OrderByPaymentIntentSpecification(intent.Id);
      Order order = await _unitOfWork.Repository<Order>().GetEntityWithSpecification(specification);

      switch (stripeEvent.Type)
      {
        case "payment_intent.succeeded":
          _logger.LogInformation($"Payment succeded with intent no.: {intent.Id}");
          order.OrderStatus = "Payment Succeded";
          break;

        case "payment_intent.payment_failed":
          _logger.LogInformation($"Payment failed with intent no.: {intent.Id}");
          order.OrderStatus = "Payment Failed";
          break;
      }
      _unitOfWork.Repository<Order>().Update(order);
      await _unitOfWork.Complete();
      // return confirmation of receiving to Stripe
      return new EmptyResult();

    }
  }
}