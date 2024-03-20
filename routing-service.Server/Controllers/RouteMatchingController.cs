using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using routing_service.Server.Data;
using routing_service.Server.Models;

namespace routing_service.Server.Controllers
{
    public class RouteMatchingController : Controller
    {
        RoutingContext db;

        public RouteMatchingController(RoutingContext context)
        {
            db = context;
        }

        public async Task<IActionResult> Create(int routeId, RoutePoint rpoint)
        {
            RoutePoint routePoint = await db.RoutePoints.SingleOrDefaultAsync(r => r.routePointName == rpoint.routePointName);
            if (routePoint != null) 
            {
                RouteMatching rmatch = new RouteMatching();
                rmatch.routeId = routeId;
                rmatch.routePointId = routePoint.routePointId;
                db.RouteMatches.Add(rmatch);
                return View("Index");
            }
            else
            {
                RedirectToAction("/RoutePoint/Create");
                routePoint = await db.RoutePoints.SingleOrDefaultAsync(r => r.routePointName == rpoint.routePointName);
                RouteMatching rmatch = new RouteMatching();
                rmatch.routeId = routeId;
                rmatch.routePointId = routePoint.routePointId;
                db.RouteMatches.Add(rmatch);
                return View("Index");
            }
        }

        public async Task<IActionResult> Delete(int id)
        {
            RouteMatching rmatchToDelete = await db.RouteMatches.SingleOrDefaultAsync(p => p.routeId == id);
            db.RouteMatches.Remove(rmatchToDelete);
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
        }
    }
}
