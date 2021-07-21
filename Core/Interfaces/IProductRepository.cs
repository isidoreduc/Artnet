using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IProductRepository
    {
        Task<Product> GetProductByIdAsync(int id);
        Task<IReadOnlyList<Product>> GetProductsAsync();

        Task<ProductType> GetProductTypeByIdAsync(int id);
        Task<IReadOnlyList<ProductType>> GetProductTypesAsync();

        Task<ProductCurrent> GetProductCurrentByIdAsync(int id);
        Task<IReadOnlyList<ProductCurrent>> GetProductCurrentsAsync();

        Task<Author> GetAuthorByIdAsync(int id);
        Task<IReadOnlyList<Author>> GetAuthorsAsync();

    }
}