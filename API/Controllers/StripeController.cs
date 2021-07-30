using System.Threading.Tasks;
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
      return await _stripeService.CreateOrUpdatePaymentIntent(basketId);
    }
  }
}