using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using routing_service.Server.Data;
using routing_service.Server.Models;

namespace routing_service.Server.Controllers
{
    public class RoutePointController : Controller
    {
        RoutingContext db;

        public RoutePointController(RoutingContext context)
        {
            db = context;
        }

        public async Task<IActionResult> Index()
        {
            return View();
        }

        public async Task<IActionResult> Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(RoutePoint rpoint)
        {
            db.RoutePoints.Add(rpoint);
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        [HttpPost]
        public async Task<IActionResult> Delete(int id)
        {
            RoutePoint rpointToDelete = await db.RoutePoints.SingleOrDefaultAsync(p => p.routePointId == id);
            db.RoutePoints.Remove(rpointToDelete);
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        public async Task<IActionResult> Edit(int id)
        {
            RoutePoint rpoint = await db.RoutePoints.SingleOrDefaultAsync(p => p.routePointId == id);
            return View(rpoint);
        }
        [HttpPost]
        public async Task<IActionResult> Edit(RoutePoint rpoint)
        {
            db.RoutePoints.Update(rpoint);
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
        }
    }
}
