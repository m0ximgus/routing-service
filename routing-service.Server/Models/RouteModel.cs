using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace routing_service.Server.Models
{
    public class Route
    {
        [MaxLength(64)]
        public string routeName { get; set; }
        [MaxLength(512)]
        public string? routeComment { get; set; }
        public DateOnly? routeDate { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int routeId { get; set; }
        //FK
        public int userId { get; set; }
        public User? user { get; set; }

        //Navigation
        public List<RouteMatching>? routeMatches { get; set; }
    }
}
