using System;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductsWithTypesAndCurrentsAndAuthorsSpecification : BaseSpecification<Product>
    {
        // specification to get all products
        public ProductsWithTypesAndCurrentsAndAuthorsSpecification(ProductSpecParams productSpecParams) 
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
            AddInclude(p => p.ProductType);
            AddInclude(p => p.ProductCurrent);
            AddInclude(p => p.Author);
            AddOrderBy(p => p.Name);
            AddPagination(productSpecParams.PageSize * (productSpecParams.PageIndex - 1), productSpecParams.PageSize);
            
            if (!string.IsNullOrEmpty(productSpecParams.Sort))
            {
                switch (productSpecParams.Sort)
                {
                    case "priceAsc":
                        AddOrderBy(p => p.Price);
                        break;
                    case "priceDesc":
                        AddOrderByDesc(p => p.Price);
                        break;
                    default:
                        AddOrderBy(p => p.Name);
                        break;
                }
            }

        }

        // specification to get product by id
        public ProductsWithTypesAndCurrentsAndAuthorsSpecification(int id) : base(p => p.Id == id)
        {
            AddInclude(p => p.ProductType);
            AddInclude(p => p.ProductCurrent);
            AddInclude(p => p.Author);
        }
    }
}