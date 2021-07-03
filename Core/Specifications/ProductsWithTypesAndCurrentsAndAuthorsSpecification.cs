using System;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductsWithTypesAndCurrentsAndAuthorsSpecification : BaseSpecification<Product>
    {
        // specification to get all products
        public ProductsWithTypesAndCurrentsAndAuthorsSpecification(string sortByprice)
        {
            AddInclude(p => p.ProductType);
            AddInclude(p => p.ProductCurrent);
            AddInclude(p => p.Author);
            AddOrderBy(p => p.Name);
            
            if (!string.IsNullOrEmpty(sortByprice))
            {
                switch (sortByprice)
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