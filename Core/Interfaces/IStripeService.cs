using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
  public interface IStripeService
  {
    Task<Basket> CreateOrUpdatePaymentIntent(string basketId);

  }
}