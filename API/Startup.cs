using System.IO;
using API.ExtensionMethods;
using API.Helpers;
using API.Middleware;
using Infrastructure.Data;
using Infrastructure.Data.Identity;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using StackExchange.Redis;

namespace API
{
    public class Startup
    {
        private readonly IConfiguration _configuration;
        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();

            services.AddSwaggerService(); // extension method

            services.AddDbContext<StoreContext>(options =>
                options.UseSqlite(_configuration["ConnectionStrings:SqliteConnection"]));

            services.AddDbContext<IdentityContext>(options =>
                options.UseSqlite(_configuration["ConnectionStrings:SqliteIdentityConnection"]));

            services.AddSingleton<IConnectionMultiplexer>(c =>
            {
                var configuration = ConfigurationOptions.Parse(_configuration.GetConnectionString("Redis"));
                return ConnectionMultiplexer.Connect(configuration);
            });

            services.AddIdentityServices(_configuration); // extension method


            services.AddAutoMapper(typeof(MappingProfiles));
            services.AddCors(opt => opt.AddPolicy("AngularPolicy", policy => policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200")));
            services.AddOurServices(); // extension method

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<ExceptionMiddleware>();

            app.UseSwaggerElements();

            app.UseStatusCodePagesWithReExecute("/errors/{0}");

            app.UseHttpsRedirection(); // extension method

            app.UseRouting();

            app.UseStaticFiles();
            // for production, moved the pictures to Content folder, to let angular do its thing in wwwroot
            app.UseStaticFiles(new StaticFileOptions
            {
              FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "Content")),
              RequestPath = "/content"
            });

            app.UseCors("AngularPolicy");

            app.UseAuthentication(); // always before authorization
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapFallbackToController("Index", "Fallback");
            });

        }
    }
}
