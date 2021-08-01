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
    public async Task<ActionResult<IEnumerable<OrderForFrontendDto>>> GetOrders() =>
      Ok(_mapper.Map<IEnumerable<Order>, IEnumerable<OrderForFrontendDto>>(
        await _orderService.GetOrdersForUserAsync(
          User.GetUserEmail())));



    [HttpGet("{id}")]
    public async Task<ActionResult<OrderForFrontendDto>> GetOrderById(int id)
    {
      var order = await _orderService.GetOrderByIdAsync(id, User.GetUserEmail());
      if(order == null) return NotFound(new ApiException(404));
      var mappedOrder = _mapper.Map<Order, OrderForFrontendDto>(order);
      return Ok(mappedOrder);
    }




    [HttpGet("deliveryMethods")]
    public async Task<ActionResult<IEnumerable<DeliveryMethod>>> GetDeliveryMethods() =>
      Ok(await _orderService.GetDeliveryMethodsAsync());



    [HttpPost]
    public async Task<ActionResult<Order>> CreateOrder(OrderDto orderDto)
    {
      var deliveryAddress = _mapper.Map<AddressDto, DeliveryAddress>(orderDto.DeliveryAddress);
      var order = await _orderService.CreateOrderAsync(User.GetUserEmail(), orderDto.DeliveryMethodId,
        orderDto.BasketId, deliveryAddress, orderDto.OrderStatus);
      return order != null ? Ok(order) : BadRequest(new ApiException(400));
    }
  }
}