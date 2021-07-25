using System;
using System.Linq;
using System.Reflection;
using Core.Entities;
using Core.Entities.Order;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions<StoreContext> options) : base(options){}

        public DbSet<Product> Products { get; set; }
        public DbSet<Author> Authors { get; set; }
        public DbSet<ProductType> ProductTypes { get; set; }
        public DbSet<ProductCurrent> ProductCurrents { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<DeliveryMethod> DeliveryMethods { get; set; }


        // converting secimal types to double to accommodate Sqlite
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // gets the configurations for entities from Data/Configuration
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            if(Database.ProviderName == "Microsoft.EntityFrameworkCore.Sqlite")
            {
                foreach (var entityType in modelBuilder.Model.GetEntityTypes())
                {
                    var decimals = entityType.ClrType.GetProperties().Where(t => t.PropertyType == typeof(decimal));
                    foreach (var dec in decimals)
                    {
                        modelBuilder.Entity(entityType.Name).Property(dec.Name).HasConversion<double>();
                    }
                    var dateTimeOffset = entityType.ClrType.GetProperties().Where(t => t.PropertyType == typeof(DateTimeOffset));
                    foreach (var dec in dateTimeOffset)
                    {
                        modelBuilder.Entity(entityType.Name).Property(dec.Name).HasConversion<string>();
                    }
                }
            }
        }

    }
}
