using System.ComponentModel.DataAnnotations;

namespace Core.Entities.Identity
{
    public class Address // value object, part of the User table
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string ZipCode { get; set; }

        [Required]
        public string UserId { get; set; }
        public User User { get; set; }




    }
}