
namespace API.Controllers
{
    using System.Threading.Tasks;
    using Core.Entities;
    using Core.Interfaces;
    using Core.Specifications;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;

    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IGenericRepository<Product> _productRepository;
        private readonly IGenericRepository<ProductType> _typeRepository;
        private readonly IGenericRepository<Author> _authorRepository;
        private readonly IGenericRepository<ProductCurrent> _currentRepository;
        public ProductsController(IGenericRepository<Product> productRepository, IGenericRepository<ProductType> typeRepository,
        IGenericRepository<ProductCurrent> currentRepository, IGenericRepository<Author> authorRepository)
        {
            _currentRepository = currentRepository;
            _authorRepository = authorRepository;
            _typeRepository = typeRepository;
            _productRepository = productRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts() 
        {
            var spec = new ProductsWithTypesAndCurrentsAndAuthorsSpecification();
            return Ok(await _productRepository.GetAllWithSpecification(spec));
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var spec = new ProductsWithTypesAndCurrentsAndAuthorsSpecification(id);
            return Ok(await _productRepository.GetEntityWithSpecification(spec));
        }


        [HttpGet("types")]
        public async Task<IActionResult> GetProductTypes() =>
            Ok(await _typeRepository.GetAllAsync());


        [HttpGet("types/{id}")]
        public async Task<IActionResult> GetProductType(int id) =>
            Ok(await _typeRepository.GetById(id));


        [HttpGet("currents")]
        public async Task<IActionResult> GetProductCurrents() =>
            Ok(await _currentRepository.GetAllAsync());


        [HttpGet("currents/{id}")]
        public async Task<IActionResult> GetProductCurrent(int id) =>
            Ok(await _currentRepository.GetById(id));


        [HttpGet("authors")]
        public async Task<IActionResult> GetAuthors() =>
            Ok(await _authorRepository.GetAllAsync());


        [HttpGet("authors/{id}")]
        public async Task<IActionResult> GetAuthor(int id) =>
            Ok(await _authorRepository.GetById(id));
    }
}
