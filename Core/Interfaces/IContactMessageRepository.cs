using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IContactMessageRepository
    {
        Task<ContactMessage> CreateMessage(ContactMessage message);
        Task<ContactMessage> GetMessageById(int messageId);
        Task<IReadOnlyList<ContactMessage>> GetMessages();

    }
}