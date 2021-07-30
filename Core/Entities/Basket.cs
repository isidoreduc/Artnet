using System.Collections.Generic;

namespace Core.Entities
{
    public class Basket
    {
        public Basket() //Redis needs it badly
        {
        }

        public Basket(string id)
        {
            Id = id;
        }

        public string Id { get; set; }
        public int? DeliveryMethodId { get; set; }
        public decimal DeliveryPrice { get; set; }
        public string ClientSecret { get; set; }
        public string PaymentIntentId { get; set; }
        public IEnumerable<BasketItem> Items { get; set; } = new List<BasketItem>();

    }
}