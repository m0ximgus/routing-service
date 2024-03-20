using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace routing_service.Server.Models
{
    [PrimaryKey(nameof(routeId), nameof(routePointId))]
    public class RouteMatching
    {
        //FK
        public int routeId { get; set; }
        [ForeignKey(nameof(routeId))]
        public Route route { get; set; }

        public int routePointId { get; set; }
        [ForeignKey(nameof(routeId))]
        public RoutePoint routePoint { get; set; }
    }
}
