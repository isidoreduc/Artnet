using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.Order;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Data
{
    public class StoreContextSeed
    {
      public static async Task SeedAsync(StoreContext context, ILoggerFactory loggerFactory)
      {
          try
          {

              if (!context.ProductCurrents.Any())
              {
                var productCurrentsData = File.ReadAllText("../Infrastructure/Data/SeedData/ProductCurrents.json");
                var productCurrents = JsonSerializer.Deserialize<IEnumerable<ProductCurrent>>(productCurrentsData);

                foreach (var item in productCurrents)
                {
                    context.ProductCurrents.Add(item);
                }
                await context.SaveChangesAsync();
              }
              if (!context.ProductTypes.Any())
              {
                var productTypesData = File.ReadAllText("../Infrastructure/Data/SeedData/ProductTypes.json");
                var productTypes = JsonSerializer.Deserialize<IEnumerable<ProductType>>(productTypesData);

                foreach (var item in productTypes)
                {
                    context.ProductTypes.Add(item);
                }
                await context.SaveChangesAsync();
              }
              if (!context.Authors.Any())
              {
                var authorsData = File.ReadAllText("../Infrastructure/Data/SeedData/Authors.json");
                var authors = JsonSerializer.Deserialize<IEnumerable<Author>>(authorsData);

                foreach (var item in authors)
                {
                    context.Authors.Add(item);
                }
                await context.SaveChangesAsync();
              }
              // should be last, so the foreign keys be populated
              if (!context.Products.Any())
              {
                var productsData = File.ReadAllText("../Infrastructure/Data/SeedData/Products.json");
                var products = JsonSerializer.Deserialize<IEnumerable<Product>>(productsData);

                foreach (var item in products)
                {
                    context.Products.Add(item);
                }
                await context.SaveChangesAsync();
              }

              if (!context.DeliveryMethods.Any())
              {
                var deliveryMethodData = File.ReadAllText("../Infrastructure/Data/SeedData/delivery.json");
                var deliveryMethods = JsonSerializer.Deserialize<IEnumerable<DeliveryMethod>>(deliveryMethodData);

                foreach (var item in deliveryMethods)
                {
                    context.DeliveryMethods.Add(item);
                }
                await context.SaveChangesAsync();
              }
          }
          catch (System.Exception ex)
          {
              var logger = loggerFactory.CreateLogger<StoreContextSeed>();
              logger.LogError(ex.Message, "There was a problem at seeding db while deserializing");
          }

      }
    }
}