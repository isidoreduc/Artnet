namespace Core.Entities.Order
{
    public class OrderItem : BaseEntity
    {
        public OrderItem()
        {
        }

        public OrderItem(ProductItemOrdered productItemOrdered, decimal price, int quantity)
        {
            ProductItemOrdered = productItemOrdered;
            Price = price;
            Quantity = quantity;
        }

        public ProductItemOrdered ProductItemOrdered { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }




    }
}