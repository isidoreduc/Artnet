using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.ErrorHandling;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class ContactMessageController : BaseApiController
  {
    private readonly IContactMessageRepository _messageRepository;
    private readonly IMapper _mapper;
    public ContactMessageController(IContactMessageRepository messageRepository, IMapper mapper)
    {
      _mapper = mapper;
      _messageRepository = messageRepository;
    }

    [HttpPost]
    public async Task<ActionResult<ContactMessage>> CreateMessage(ContactMessageDto message)
    {
      return message == null ? BadRequest(new ApiException(400)) :
        Ok(await _messageRepository.CreateMessage(_mapper.Map<ContactMessageDto, ContactMessage>(message)));
    }

    [HttpGet("{id}")] //the route argument should be named the same as the action argument for the route /controller/id
    public async Task<ActionResult<ContactMessageDto>> GetMessageById(int id)
    {
      var message = await _messageRepository.GetMessageById(id);
      return Ok(_mapper.Map<ContactMessage, ContactMessageDto>(message));
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<ContactMessageDto>>> GetMessages()
    {
      var messages = await _messageRepository.GetMessages();
      return Ok(_mapper.Map<IReadOnlyList<ContactMessage>, IReadOnlyList<ContactMessageDto>>(messages));
    }
  }
}