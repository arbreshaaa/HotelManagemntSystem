using SOAproject.DTOs;
using SOAproject.Models;

namespace SOAproject.Repositories.Interfaces
{
    public interface IRoomRepository
    {
        Task<IEnumerable<Room>> GetAllRoomsAsync();
        Task<Room> GetRoomByIdAsync(int id);
        Task AddRoomAsync(RoomRequestDto room);
        Task UpdateRoomAsync(RoomRequestDto room,int id);
        Task DeleteRoomAsync(int id);
        Task<string> AvaibleRoom(Room room);
    }
}
