using System.Linq;
using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions<StoreContext> options) : base(options)
        {
            
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Author> Authors { get; set; }
        public DbSet<ProductType> ProductTypes { get; set; }
        public DbSet<ProductCurrent> ProductCurrents { get; set; }


        // converting secimal types to double to accommodate Sqlite
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            if(Database.ProviderName == "Microsoft.EntityFrameworkCore.Sqlite")
            {
                foreach (var entityType in modelBuilder.Model.GetEntityTypes())
                {
                    var decimals = entityType.ClrType.GetProperties().Where(t => t.PropertyType == typeof(decimal));
                    foreach (var dec in decimals)
                    {
                        modelBuilder.Entity(entityType.Name).Property(dec.Name).HasConversion<double>();
                    }
                }
            }
        }
        
    }
}
