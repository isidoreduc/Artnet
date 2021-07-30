using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class BasketDto
    {
        [Required]
        public string Id { get; set; }
        public IEnumerable<BasketItemDto> Items { get; set; }
        public int? DeliverymethodId { get; set; }
        public string ClientSecret { get; set; }
        public string PaymentIntentId { get; set; }
    }
}