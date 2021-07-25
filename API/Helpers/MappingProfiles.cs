using API.DTOs;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;
using Core.Entities.Order;
using Core.Interfaces;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        private readonly ITokenService _tokenService;

        public MappingProfiles(ITokenService tokenService)
        {
            _tokenService = tokenService;
        }
        public MappingProfiles()
        {
            CreateMap<Product, ProductToReturnDto>()
                .ForMember(destinationMember => destinationMember.ProductType, memberOptions => memberOptions.MapFrom(sourceMember => sourceMember.ProductType.Name))
                .ForMember(destinationMember => destinationMember.ProductCurrent, memberOptions => memberOptions.MapFrom(sourceMember => sourceMember.ProductCurrent.Name))
                .ForMember(destinationMember => destinationMember.Author, memberOptions => memberOptions.MapFrom(sourceMember => sourceMember.Author.Name))
                .ForMember(destinationMember => destinationMember.PictureUrl, memberOptions => memberOptions.MapFrom<ProductImageUrlResolver>());

            CreateMap<Address, AddressDto>().ReverseMap();
            CreateMap<DeliveryAddress, AddressDto>().ReverseMap();
            CreateMap<Basket, BasketDto>().ReverseMap();
            CreateMap<BasketItem, BasketItemDto>().ReverseMap();
            CreateMap<OrderItem, OrderItemDto>()
              .ForMember(destinationMember => destinationMember.Id, memberOptions => memberOptions.MapFrom(sourceMember => sourceMember.ProductItemOrdered.ProductItemId))
              .ForMember(destinationMember => destinationMember.Name, memberOptions => memberOptions.MapFrom(sourceMember => sourceMember.ProductItemOrdered.ProductName))
              .ForMember(destinationMember => destinationMember.ProductPictureUrl, memberOptions => memberOptions.MapFrom<OrderImageUrlResolver>());
            CreateMap<Order, OrderForFrontendDto>()
              .ForMember(destinationMember => destinationMember.DeliveryMethod, memberOptions => memberOptions.MapFrom(sourceMember => sourceMember.DeliveryMethod.Name))
              .ForMember(destinationMember => destinationMember.DeliveryPrice, memberOptions => memberOptions.MapFrom(sourceMember => sourceMember.DeliveryMethod.Price))
              // .ForMember(destinationMember => destinationMember.Total, memberOptions => memberOptions.MapFrom(sourceMember => sourceMember.GetTotal())) - automapper convention based mapping: it looks for a property name and if it has "Get" in front it does map it: example prop Total gets mapped from method GetTotal()

            ;

        }
    }
}
