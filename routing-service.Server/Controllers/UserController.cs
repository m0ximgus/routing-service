using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using routing_service.Server.Data;
using routing_service.Server.Models;

namespace routing_service.Server.Controllers
{ 
    public class UserController : Controller
    {
        RoutingContext db;

        public UserController(RoutingContext context)
        {
            db = context;
        }

        [HttpGet("User/Get")]
        public async Task<IResult> Get(int id)
        {
            User? user = await db.Users.AsNoTracking().SingleOrDefaultAsync(u => u.userId == id);
            if (user != null)
            {
                var routes = await db.Routes.Where(r => r.userId == user.userId).ToListAsync();
                if (routes.Any())
                    user.routes = routes;
                return Results.Json(user);
            }
            else return Results.NotFound();
        }

        [HttpPost("User/Register")]
        public async Task<IResult> Create(User user)
        {
            User? us = await db.Users.SingleOrDefaultAsync(u => u.login == user.login);
            if (us != null)
                return Results.BadRequest("Пользователь с таким логином уже существует.");
            db.Users.Add(user);
            await db.SaveChangesAsync();
            return Results.Created();
        }

        [HttpDelete("User/Delete")]
        public async Task<IResult> Delete(int id)
        {
            User userToDelete = await db.Users.SingleOrDefaultAsync(p => p.userId == id);
            db.Users.Remove(userToDelete);
            await db.SaveChangesAsync();
            return Results.Ok("Пользователь удалён.");
        }

        [HttpPost("User/Edit")]
        public async Task<IResult> Edit(User user)
        {
            db.Users.Update(user);
            await db.SaveChangesAsync();
            return Results.Json(user);
        }

        [HttpPost("User/Login")]
        public async Task<IResult> Login(string login, string password)
        {
            User? user = await db.Users.AsNoTracking().SingleOrDefaultAsync(p => p.login == login && p.password == password);
            if (user != null)
            {
                var routes = await db.Routes.Where(r => r.userId == user.userId).ToListAsync();
                if (routes.Any())
                    user.routes = routes;
                return Results.Json(user);
            }
            else return Results.NotFound("Пользователь не найден. Попробуйте ещё раз или зарегестрируйтесь.");
        }
    }
}
