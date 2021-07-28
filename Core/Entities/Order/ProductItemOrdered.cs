namespace Core.Entities.Order
{
  // a snapshot of what was ordered, with the OrderItem structure at that time, in case OrderItem changes sometime in the future
  public class ProductItemOrdered // value object, part of the OrderItem table
  {
    public ProductItemOrdered()
    {
    }

    public ProductItemOrdered(int productItemId, string productName, string pictureUrl, string type, string current, string author)
    {
      ProductItemId = productItemId;
      ProductName = productName;
      PictureUrl = pictureUrl;
      Type = type;
      Current = current;
      Author = author;
    }

    public int ProductItemId { get; set; }
    public string ProductName { get; set; }
    public string PictureUrl { get; set; }
    public string Type { get; set; }
    public string Current { get; set; }
    public string Author { get; set; }

  }
}