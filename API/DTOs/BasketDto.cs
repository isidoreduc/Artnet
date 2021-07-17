using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class BasketDto
    {
        [Required]
        public string Id { get; set; }
        public IEnumerable<BasketItemDto> Items { get; set; }
    }
}