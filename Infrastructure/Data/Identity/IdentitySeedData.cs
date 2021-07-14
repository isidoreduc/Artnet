using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Data.Identity
{
    public class IdentitySeedData
    {
        public static async Task SeedUsersAsync(UserManager<User> manager)
        {
            if (!manager.Users.Any())
            {
                var user = new User
                {
                    Name = "Akiro Ishi",
                    Email = "ai@test.com",
                    UserName = "ai@test.com",
                    Address = new Address
                    {
                        FirstName = "Akiro",
                        LastName = "Ishi",
                        Street = "Sunset Bvd.",
                        City = "LA",
                        Country = "USA",
                        ZipCode = "928609"
                    },

                };
                await manager.CreateAsync(user, "Pa$$w0rd");
            }
        }
    }
}