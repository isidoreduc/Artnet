using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly IBasketRepository _basketRepository;
        public BasketController(IBasketRepository basketRepository)
        {
            _basketRepository = basketRepository;
        }


        [HttpGet]
        public async Task<ActionResult<Basket>> GetBasketAsync(string basketId) => 
            Ok(await _basketRepository.GetBasketAsync(basketId) ?? new Basket(basketId)); // if the client returns after 30 days, his basket expired, so we create a new, empty one with same id

        [HttpPost]
        public async Task<ActionResult<Basket>> CreateOrUpdateBasketAsync(Basket basket) => 
            Ok(await _basketRepository.CreateOrUpdateBasketAsync(basket));

        [HttpDelete]
        public async Task<bool> DeleteBasketAsync(string basketId) => 
            await _basketRepository.DeleteBasketAsync(basketId);
    }
}