namespace Core.Entities
{
    public class BasketItem : BaseEntity
    {
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string PictureUrl { get; set; }
        public string Type { get; set; }
        public string Current { get; set; }
        public string Author { get; set; }
        
    }
}