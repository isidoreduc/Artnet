using System;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductsWithFiltersForCountSpecification : BaseSpecification<Product>
    {
        public ProductsWithFiltersForCountSpecification(ProductSpecParams productSpecParams) 
            : base(p => 
            // searching based on name, author, type, current
                (
                    (string.IsNullOrEmpty(productSpecParams.Search) || p.Name.ToLower().Contains(productSpecParams.Search)) ||
                    (string.IsNullOrEmpty(productSpecParams.Search) || p.Author.Name.ToLower().Contains(productSpecParams.Search)) ||
                    (string.IsNullOrEmpty(productSpecParams.Search) || p.ProductType.Name.ToLower().Contains(productSpecParams.Search)) ||
                    (string.IsNullOrEmpty(productSpecParams.Search) || p.ProductCurrent.Name.ToLower().Contains(productSpecParams.Search))
                ) &&
            // filtering based on type, current, author
                (!productSpecParams.TypeId.HasValue || p.ProductTypeId == productSpecParams.TypeId) && 
                (!productSpecParams.CurrentId.HasValue || p.ProductCurrentId == productSpecParams.CurrentId) &&
                (!productSpecParams.AuthorId.HasValue || p.AuthorId == productSpecParams.AuthorId))
        {
        }
    }
}