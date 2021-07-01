
namespace API.Controllers
{
    using System.Threading.Tasks;
    using Infrastructure.Data;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;

    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly StoreContext _context;
        public ProductsController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts() =>
            Ok(await _context.Products.ToListAsync());


        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id) =>
            Ok(await _context.Products.FindAsync(id)); 

    }
}
