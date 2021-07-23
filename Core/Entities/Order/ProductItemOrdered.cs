namespace Core.Entities.Order
{
    // a snapshot of what was ordered, with the OrderItem structure at that time, in case OrderItem changes sometime in the future
    public class ProductItemOrdered // value object, part of the OrderItem table
    {
        public ProductItemOrdered()
        {
        }

        public ProductItemOrdered(int productItemId, string productName, string pictureUrl)
        {
            ProductItemId = productItemId;
            ProductName = productName;
            PictureUrl = pictureUrl;
        }

        public int ProductItemId { get; set; }
        public string ProductName { get; set; }
        public string PictureUrl { get; set; }
    }
}