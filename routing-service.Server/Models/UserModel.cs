using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace routing_service.Server.Models
{
    public class User
    {
        [MaxLength(32)]
        public string login { get; set; }
        [MaxLength(32)]
        public string password { get; set; }
        [MaxLength(64)]
        public string fullName { get; set; }
        public DateOnly? dateOfBirth { get; set; }
        public string? mail { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int userId { get; set; }

        //Navigation
        public List<Route>? routes { get; set; }
    }
}
