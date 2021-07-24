using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.ErrorHandling;
using AutoMapper;
using Core.Entities.Order;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  [Authorize]
  public class OrderController : BaseApiController
  {
    private readonly IOrderService _orderService;
    private readonly IMapper _mapper;
    public OrderController(IOrderService orderService, IMapper mapper)
    {
      _mapper = mapper;
      _orderService = orderService;
    }

    [HttpPost]
    public async Task<ActionResult<Order>> CreateOrder(OrderDto orderDto)
    {
      var email = User.FindFirstValue(ClaimTypes.Email);
      var order = await _orderService.CreateOrderAsync(email, orderDto.DeliveryMethodId, orderDto.BasketId,
        _mapper.Map<AddressDto, Core.Entities.Order.Address>(orderDto.DeliveryAddress));
      return order != null ? Ok(order) : BadRequest(new ApiException(400));
    }
  }
}