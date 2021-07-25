using API.DTOs;
using AutoMapper;
using Core.Entities;
using Microsoft.Extensions.Configuration;

namespace API.Helpers
{
  public class ProductImageUrlResolver : IValueResolver<Product, ProductToReturnDto, string>
  {
    private readonly IConfiguration _config;
    public ProductImageUrlResolver(IConfiguration config) // need IConfiguration injected to get the url from appsettings.json
    {
      _config = config;
    }

    public string Resolve(Product source, ProductToReturnDto destination, string destMember, ResolutionContext context) => _config["ApiUrl"] + source.PictureUrl ?? null;

  }
}