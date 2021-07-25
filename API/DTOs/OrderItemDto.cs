using Core.Entities;

namespace API.DTOs
{
    public class OrderItemDto : BaseEntity
    {
        public string ProductPictureUrl { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }
}