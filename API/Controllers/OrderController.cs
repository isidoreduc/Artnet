using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.ErrorHandling;
using API.ExtensionMethods;
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

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
    {
      var order = await _orderService.GetOrdersForUserAsync(User.GetUserEmail());
      return order != null ? Ok(order) : NotFound(new ApiException(404));
    }


    [HttpGet("{id}")]
    public async Task<ActionResult<Order>> GetOrderById(int id) =>
      Ok(await _orderService.GetOrderByIdAsync(id, User.GetUserEmail()));

    [HttpPost]
    public async Task<ActionResult<Order>> CreateOrder(OrderDto orderDto)
    {
      var order = await _orderService.CreateOrderAsync(User.GetUserEmail(), orderDto.DeliveryMethodId, orderDto.BasketId,
        _mapper.Map<AddressDto, Core.Entities.Order.Address>(orderDto.DeliveryAddress));
      return order != null ? Ok(order) : BadRequest(new ApiException(400));
    }
  }
}