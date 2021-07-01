using System;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductsWithTypesAndCurrentsAndAuthorsSpecification : BaseSpecification<Product>
    {
        // specification to get all products
        public ProductsWithTypesAndCurrentsAndAuthorsSpecification()
        {
            AddInclude(p => p.ProductType);
            AddInclude(p => p.ProductCurrent);
            AddInclude(p => p.Author);
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