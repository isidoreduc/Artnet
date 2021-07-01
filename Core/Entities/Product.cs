namespace Core.Entities
{
    public class Product : BaseEntity
    {
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string PictureUrl { get; set; }
        public Author Author { get; set; }
        public int AuthorId { get; set; }
        public ProductType ProductType { get; set; }
        public int ProductTypeId { get; set; }
        public ProductCurrent ProductCurrent { get; set; }
        public int ProductCurrentId { get; set; }
           
    }
}