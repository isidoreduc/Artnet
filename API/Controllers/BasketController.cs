using System.Threading.Tasks;
using API.DTOs;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly IBasketRepository _basketRepository;
        private readonly IMapper _mapper;
        public BasketController(IBasketRepository basketRepository, IMapper mapper)
        {
            _mapper = mapper;
            _basketRepository = basketRepository;
        }


        [HttpGet]
        public async Task<ActionResult<BasketDto>> GetBasketAsync(string basketId) =>
            Ok(await _basketRepository.GetBasketAsync(basketId) ?? new Basket(basketId)); // if the client returns after 30 days, his basket expired, so we create a new, empty one with same id

        [HttpPost]
        public async Task<ActionResult<Basket>> CreateOrUpdateBasketAsync(BasketDto basketDto) =>
            Ok(await _basketRepository.CreateOrUpdateBasketAsync(_mapper.Map<BasketDto, Basket>(basketDto)));

        [HttpDelete]
        public async Task<bool> DeleteBasketAsync(string basketId) =>
            await _basketRepository.DeleteBasketAsync(basketId);
    }
}