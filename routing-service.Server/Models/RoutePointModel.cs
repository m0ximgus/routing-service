using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace routing_service.Server.Models
{
    public class RoutePoint
    {
        [MaxLength(128)]
        public string routePointName { get; set; }
        [MaxLength(128)]
        public string routePointAdress { get; set; }
        public float[] routePointCoordinates { get; set; } = new float[2];

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int routePointId { get; set; }

        //Navigation
        public List<RouteMatching>? routeMatches { get; set; }
    }
}
