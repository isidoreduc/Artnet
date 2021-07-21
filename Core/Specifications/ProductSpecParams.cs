namespace Core.Specifications
{
    public class ProductSpecParams
    {
        private int _pageSize = 6;
        private const int MaxPageSize = 50;
        public int PageIndex { get; set; } = 1;
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = value > 50 ? MaxPageSize : value;
        }

        public int? TypeId { get; set; }
        public int? CurrentId { get; set; }
        public int? AuthorId { get; set; }
        public string Sort { get; set; }

        private string _search;
        public string Search // we want to evaluate on lower case always
        {
            get => _search;
            set => _search = value.ToLower();
        }



    }
}