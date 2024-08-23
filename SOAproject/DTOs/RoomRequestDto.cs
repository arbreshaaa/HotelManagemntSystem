namespace SOAproject.DTOs
{
    public class RoomRequestDto
    {
        public int Id { get; set; }
        public int Capacity { get; set; }
      
        public decimal Price { get; set; }
        public bool IsAvailable{get; set;}
    }
}
