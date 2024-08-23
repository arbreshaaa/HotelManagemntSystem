using Microsoft.EntityFrameworkCore;
using SOAproject.Data;
using SOAproject.DTOs;
using SOAproject.Models;
using SOAproject.Repositories.Interfaces;
using System.Threading.Tasks;

namespace SOAproject.Repositories.Implementations
{
    public class RoomRepository : IRoomRepository
    {

        private readonly AppDbContext _context;

        public RoomRepository(AppDbContext context)
        {
            _context = context;
        }
         public async Task AddRoomAsync(RoomRequestDto room)
         {
            Room requestBody=new Room();

            requestBody.Id = room.Id;
            requestBody.Capacity = room.Capacity;
            requestBody.Price = room.Price;
            requestBody.IsAvailable = room.IsAvailable;

            _context.Rooms.Add(requestBody);
            await _context.SaveChangesAsync();

        }
        public async Task<IEnumerable<Room>> GetAllRoomsAsync()
        {
            return await _context.Rooms.ToListAsync();
        }

        public async Task<Room> GetRoomByIdAsync(int id)
        {
            var room = await _context.Rooms.FindAsync(id);

            return room ?? new Room();
        }

       

        public async Task UpdateRoomAsync(RoomRequestDto request,int id)
        {
            var room = await _context.Rooms.FindAsync(id);
            if(room != null)
            {
                room.Id = id;
                room.IsAvailable =request.IsAvailable;
                room.Price = request.Price;
                room.Capacity= request.Capacity;

                _context.Entry(room).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }

        }

        public async Task DeleteRoomAsync(int id)
        {
            var room = await _context.Rooms.FindAsync(id);

            if(room!=null){
            _context.Rooms.Remove(room);
            await _context.SaveChangesAsync();
            }
            
        }
      
        public async  Task<string> AvaibleRoom(Room room)
        {
            room.IsAvailable=true;
            _context.Rooms.Update(room).State=EntityState.Modified;
            await _context.SaveChangesAsync();

            return "Room is not available";
        }
    }
}

