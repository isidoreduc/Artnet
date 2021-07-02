using API.ErrorHandling;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("errors/{statuscode}")]
    [ApiExplorerSettings(IgnoreApi = true)]
    public class ErrorController : BaseApiController
    {
        public IActionResult Error(int statuscode)
        {
            return new ObjectResult(new ApiResponse(statuscode));
        }
    }
}