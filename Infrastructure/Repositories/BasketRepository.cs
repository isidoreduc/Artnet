using System;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using StackExchange.Redis;

namespace Infrastructure.Repositories
{
    public class BasketRepository : IBasketRepository
    {
        private readonly IDatabase _redis;
        public BasketRepository(IConnectionMultiplexer redis)
        {
            _redis = redis.GetDatabase();
        }

        public async Task<Basket> GetBasketAsync(string basketId)
        {
            var data = await _redis.StringGetAsync(basketId);
            return !string.IsNullOrEmpty(data) ? JsonSerializer.Deserialize<Basket>(data) : null;
        }  

        public async Task<Basket> CreateOrUpdateBasketAsync(Basket basket)
        {
            var data = JsonSerializer.Serialize<Basket>(basket);
            var created = await _redis.StringSetAsync(basket.Id, data, TimeSpan.FromDays(30)); // set expiry date of 30 days
            return created ? await GetBasketAsync(basket.Id) : null;
        }

        public async Task<bool> DeleteBasketAsync(string basketId) => await _redis.KeyDeleteAsync(basketId);

    }
}