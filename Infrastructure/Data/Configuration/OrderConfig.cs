using System;
using Core.Entities.Order;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configuration
{
    // specifying the ownership of value object Address
    public class OrderConfig : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.OwnsOne(o => o.DeliveryAddress, a => a.WithOwner());
            // parsing enum value (int) to the set string
            // builder.Property(s => s.OrderStatus).HasConversion(
            //     o => o.ToString(),
            //     o => (OrderStatus)Enum.Parse(typeof(OrderStatus), o));
            builder.HasMany(o => o.OrderItems).WithOne()
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}