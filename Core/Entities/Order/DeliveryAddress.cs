namespace Core.Entities.Order
{
    public class DeliveryAddress
    {
        public DeliveryAddress()
        {
        }

        public DeliveryAddress(string firstName, string lastName, string street, string city, string country, string zipCode)
        {
            FirstName = firstName;
            LastName = lastName;
            Street = street;
            City = city;
            Country = country;
            ZipCode = zipCode;
        }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string ZipCode { get; set; }
    }
}