using API.DTOs;
using AutoMapper;
using Core.Entities.Order;
using Microsoft.Extensions.Configuration;

namespace API.Helpers
{
    public class OrderImageUrlResolver : IValueResolver<OrderItem, OrderItemDto, string>
    {
        private readonly IConfiguration _config;
    public OrderImageUrlResolver(IConfiguration config) // need IConfiguration injected to get the url from appsettings.json
    {
      _config = config;
    }

    public string Resolve(OrderItem source, OrderItemDto destination, string destMember, ResolutionContext context) => _config["ApiUrl"] + source.ProductItemOrdered.PictureUrl ?? null;
    }
}