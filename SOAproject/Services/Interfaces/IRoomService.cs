using SOAproject.DTOs;

namespace SOAproject.Services.Interfaces
{
    public interface IRoomService
    {
        Task<IEnumerable<RoomDto>> GetAllRoomsAsync();
        Task<RoomDto> GetRoomByIdAsync(int id);
        Task AddRoomAsync(RoomRequestDto roomRequest);
        Task UpdateRoomAsync(RoomRequestDto room, int id);
        Task DeleteRoomAsync(int id);
        Task<string> AvailableRoom(int id);
    }
}
