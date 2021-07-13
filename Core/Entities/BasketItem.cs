namespace Core.Entities
{
    public class BasketItem : BaseEntity
    {
        private int _quantity = 1;
        public decimal Price { get; set; }
        public int Quantity { get => _quantity; set => _quantity = value < 0 ? 1 : value; }
        public string PictureUrl { get; set; }
        public string Type { get; set; }
        public string Current { get; set; }
        public string Author { get; set; }

    }
}