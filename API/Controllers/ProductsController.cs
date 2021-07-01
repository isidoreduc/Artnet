
namespace API.Controllers
{
    using System.Threading.Tasks;
    using Core.Interfaces;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;

    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _productRepository;
        public ProductsController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts() =>
            Ok(await _productRepository.GetProductsAsync());


        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id) =>
            Ok(await _productRepository.GetProductByIdAsync(id));


        [HttpGet("types")]
        public async Task<IActionResult> GetProductTypes() =>
            Ok(await _productRepository.GetProductTypesAsync());


        [HttpGet("types/{id}")]
        public async Task<IActionResult> GetProductType(int id) =>
            Ok(await _productRepository.GetProductTypeByIdAsync(id));

        
        [HttpGet("currents")]
        public async Task<IActionResult> GetProductCurrents() =>
            Ok(await _productRepository.GetProductCurrentsAsync());


        [HttpGet("currents/{id}")]
        public async Task<IActionResult> GetProductCurrent(int id) =>
            Ok(await _productRepository.GetProductCurrentByIdAsync(id));


        [HttpGet("authors")]
        public async Task<IActionResult> GetAuthors() =>
            Ok(await _productRepository.GetAuthorsAsync());


        [HttpGet("authors/{id}")]
        public async Task<IActionResult> GetAuthor(int id) =>
            Ok(await _productRepository.GetAuthorByIdAsync(id));
    }
}
