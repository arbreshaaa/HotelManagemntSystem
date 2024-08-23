using SOAproject.Models;

namespace SOAproject.DTOs
{
    public class ReservationRequestDto
    {

        public int RoomId { get; set; }
        public string UserName { get; set; }
        public DateTime CheckInDate { get; set; }
        public DateTime CheckOutDate { get; set; }
        
    }
}
