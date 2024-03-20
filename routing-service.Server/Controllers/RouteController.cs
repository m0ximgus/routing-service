using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using routing_service.Server.Data;
using routing_service.Server.Models;

namespace routing_service.Server.Controllers
{
    public class RouteController : Controller
    {
        RoutingContext db;

        public RouteController(RoutingContext context)
        {
            db = context;
        }

        [HttpGet("Route/GetByUserId")]
        public async Task<IResult> GetByUserId(int userId)
        {
            var routes = await db.Routes.Where(r => r.userId == userId).ToListAsync();
            return Results.Json(routes);
        }

        [HttpGet("Route/GetById")]
        public async Task<IResult> GetById(int id)
        {
            var route = await db.Routes.SingleOrDefaultAsync(r => r.routeId == id);
            return Results.Json(route);
        }

        [HttpPost("Route/Create")]
        public async Task<IResult> Create(routing_service.Server.Models.Route route)
        {
            db.Routes.Add(route);
            await db.SaveChangesAsync();
            return Results.Json(route);
        }

        [HttpDelete("Route/Delete")]
        public async Task<IResult> Delete(int id)
        {
            routing_service.Server.Models.Route routeToDelete = await db.Routes.SingleOrDefaultAsync(p => p.routeId == id);
            db.Routes.Remove(routeToDelete);
            await db.SaveChangesAsync();
            return Results.Ok("Маршрут удалён.");
        }

        [HttpPost("Route/Edit")]
        public async Task<IResult> Edit(routing_service.Server.Models.Route route)
        {
            db.Routes.Update(route);
            await db.SaveChangesAsync();
            return Results.Json(route);
        }
    }
}
