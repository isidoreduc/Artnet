
namespace API.Controllers
{
  using System.Collections.Generic;
  using System.Threading.Tasks;
  using API.DTOs;
  using API.Helpers;
  using AutoMapper;
  using Core.Entities;
  using Core.Interfaces;
  using Core.Specifications;
  using Microsoft.AspNetCore.Mvc;

  public class ProductsController : BaseApiController
  {
    private readonly IGenericRepository<Product> _productRepository;
    private readonly IGenericRepository<ProductType> _typeRepository;
    private readonly IGenericRepository<Author> _authorRepository;
    private readonly IGenericRepository<ProductCurrent> _currentRepository;
    private readonly IMapper _mapper;
    public ProductsController(IGenericRepository<Product> productRepository, IGenericRepository<ProductType> typeRepository,
    IGenericRepository<ProductCurrent> currentRepository, IGenericRepository<Author> authorRepository, IMapper mapper)
    {
      _mapper = mapper;
      _currentRepository = currentRepository;
      _authorRepository = authorRepository;
      _typeRepository = typeRepository;
      _productRepository = productRepository;
    }

    [Cached(600)]
    [HttpGet]
    public async Task<ActionResult<Pagination<ProductToReturnDto>>> GetProducts([FromQuery] ProductSpecParams productSpecParams)
    {
      var spec = new ProductsWithTypesAndCurrentsAndAuthorsSpecification(productSpecParams);
      var countSpec = new ProductsWithFiltersForCountSpecification(productSpecParams);
      var totalItems = await _productRepository.CountAsync(countSpec);
      var products = await _productRepository.GetAllWithSpecification(spec);
      var data = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products);
      return Ok(new Pagination<ProductToReturnDto>(productSpecParams.PageIndex, productSpecParams.PageSize, totalItems, data));
    }

    [Cached(600)]
    [HttpGet("{id}")]
    public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
    {
      var spec = new ProductsWithTypesAndCurrentsAndAuthorsSpecification(id);
      var product = await _productRepository.GetEntityWithSpecification(spec);
      var productToReturn = _mapper.Map<Product, ProductToReturnDto>(product);
      return Ok(productToReturn);
    }

    [Cached(600)]
    [HttpGet("types")]
    public async Task<IActionResult> GetProductTypes() =>
    Ok(await _typeRepository.GetAllAsync());


    [Cached(600)]
    [HttpGet("types/{id}")]
    public async Task<IActionResult> GetProductType(int id) =>
    Ok(await _typeRepository.GetById(id));


    [Cached(600)]
    [HttpGet("currents")]
    public async Task<IActionResult> GetProductCurrents() =>
    Ok(await _currentRepository.GetAllAsync());


    [Cached(600)]
    [HttpGet("currents/{id}")]
    public async Task<IActionResult> GetProductCurrent(int id) =>
    Ok(await _currentRepository.GetById(id));


    [Cached(600)]
    [HttpGet("authors")]
    public async Task<IActionResult> GetAuthors() =>
    Ok(await _authorRepository.GetAllAsync());


    [Cached(600)]
    [HttpGet("authors/{id}")]
    public async Task<IActionResult> GetAuthor(int id) =>
    Ok(await _authorRepository.GetById(id));

  }
}
