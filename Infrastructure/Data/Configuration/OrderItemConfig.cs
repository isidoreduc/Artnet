using Core.Entities.Order;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configuration
{
    // specifying the ownership of value object ProductItemOrdered
    public class OrderItemConfig : IEntityTypeConfiguration<OrderItem>
    {
        public void Configure(EntityTypeBuilder<OrderItem> builder)
        {
            builder.OwnsOne(i => i.ProductItemOrdered, pio => pio.WithOwner());
            builder.Property(i => i.Price).HasColumnType("decimal(18,2)");
        }
    }
}