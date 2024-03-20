using Microsoft.EntityFrameworkCore;
using routing_service.Server.Models;

namespace routing_service.Server.Data
{
    public class RoutingContext : DbContext
    {
        public DbSet<User> Users => Set<User>();
        public DbSet<Models.Route> Routes => Set<Models.Route>();
        public DbSet<RoutePoint> RoutePoints => Set<RoutePoint>();
        public DbSet<RouteMatching> RouteMatches => Set<RouteMatching>();
        public RoutingContext()
        {
            Database.EnsureCreated();
        }

        public RoutingContext(DbContextOptions options) : base(options)
        {
            Database.EnsureCreated();
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=routingDB;Username=postgres;Password=4221");
        }
    }

}
