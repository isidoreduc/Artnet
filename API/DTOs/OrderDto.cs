using Core.Entities.Order;

namespace API.DTOs
{
    public class OrderDto
    {
        public string BasketId { get; set; }
        public int DeliveryMethodId { get; set; }
        public AddressDto DeliveryAddress { get; set; }
        public string OrderStatus { get; set; }
        public string PaymentIntentId { get; set; }




    }
}