namespace Core.Entities.Order
{
    public class OrderItem : BaseEntity
    {
        public OrderItem()
        {
        }

        public OrderItem(ProductItemOrdered productItemOrdered, decimal price, int qunantity)
        {
            ProductItemOrdered = productItemOrdered;
            Price = price;
            Qunantity = qunantity;
        }

        public ProductItemOrdered ProductItemOrdered { get; set; }
        public decimal Price { get; set; }
        public int Qunantity { get; set; }




    }
}