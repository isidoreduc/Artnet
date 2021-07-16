using API.DTOs;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;
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

        }
    }
}
