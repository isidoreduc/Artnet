using System.Threading.Tasks;
using API.ErrorHandling;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class StripeController : BaseApiController
  {
    private readonly IStripeService _stripeService;

    public StripeController(IStripeService stripeService)
    {
      _stripeService = stripeService;
    }

    [Authorize]
    [HttpPost("{basketId}")]
    public async Task<ActionResult<Basket>> CreateOrUpdateIntent(string basketId)
    {
      var basket = await _stripeService.CreateOrUpdatePaymentIntent(basketId);
      return  basket == null ? BadRequest(new ApiException(400, "Problems with your basket")) : basket;
    }
  }
}