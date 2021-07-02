using System.Threading.Tasks;
using API.ErrorHandling;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ErrorMockController : BaseApiController
    {
        private readonly StoreContext _context;
        public ErrorMockController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet("notfound")]
        public async Task<IActionResult> GetNotFoundRequest()
        {
            return await _context.Products.FindAsync(42) != null ? 
                Ok() : 
                NotFound(new ApiResponse(404));
        }

        [HttpGet("servererror")]
        public IActionResult GetServerError()
        {
            var product = _context.Products.Find(42);
            var nullexception = product.ToString();
            return Ok();
        }

        [HttpGet("badrequest")]
        public IActionResult GetBadRequest()
        {
            return BadRequest(new ApiResponse(400));
        }

        [HttpGet("badrequest/{id}")]
        public IActionResult GetNotFoundRequest(int id)
        {
            return Ok();
        }
    }
}