using System;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductsWithFiltersForCountSpecification : BaseSpecification<Product>
    {
        public ProductsWithFiltersForCountSpecification(ProductSpecParams productSpecParams) 
            : base(p => // filtering based on type, current, author
                (!productSpecParams.TypeId.HasValue || p.ProductTypeId == productSpecParams.TypeId) && 
                (!productSpecParams.CurrentId.HasValue || p.ProductCurrentId == productSpecParams.CurrentId) &&
                (!productSpecParams.AuthorId.HasValue || p.AuthorId == productSpecParams.AuthorId))
        {
        }
    }
}