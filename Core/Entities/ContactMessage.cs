using System;

namespace Core.Entities
{
    public class ContactMessage : BaseEntity
    {
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public string Message { get; set; }
        public DateTimeOffset TimeAdded { get; set; } = DateTimeOffset.Now;
    }
}