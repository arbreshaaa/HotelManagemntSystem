using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SOAproject.Models
{
    public class Room
    {

        [Key]
        public int Id { get; set; }
            public int  Capacity { get; set; }
            
            public decimal Price { get; set; }
            public bool IsAvailable { get; set; }
        public ICollection<Reservation> Reservations { get; set; }
    }
}
