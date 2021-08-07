using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;

namespace Infrastructure.Repositories
{
  public class ContactMessageRepository : IContactMessageRepository
  {
    private readonly IUnitOfWork _unitOfWork;
    public ContactMessageRepository(IUnitOfWork unitOfWork)
    {
      _unitOfWork = unitOfWork;
    }

    public async Task<ContactMessage> CreateMessage(ContactMessage message)
    {
      _unitOfWork.Repository<ContactMessage>().Add(message);
      var result = await _unitOfWork.Complete();

      if (result <= 0) return null;
      return message;
    }

    public async Task<ContactMessage> GetMessageById(int messageId)
    {
      return await _unitOfWork.Repository<ContactMessage>().GetById(messageId);
    }

    public async Task<IReadOnlyList<ContactMessage>> GetMessages()
    {
      return await _unitOfWork.Repository<ContactMessage>().GetAllAsync();
    }
  }
}