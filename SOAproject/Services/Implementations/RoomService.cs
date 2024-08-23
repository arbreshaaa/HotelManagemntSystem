namespace SOAproject.Services.Implementations
{
    using AutoMapper;
    using SOAproject.DTOs;
    using SOAproject.Models;
    using SOAproject.Repositories.Interfaces;
    using SOAproject.Services.Interfaces;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public class RoomService : IRoomService
    {
        private readonly IRoomRepository _roomRepository;
        private readonly IMapper _mapper;

        public RoomService(IRoomRepository roomRepository, IMapper mapper)
        {
            _roomRepository = roomRepository;
            _mapper = mapper;
        }
        public async Task AddRoomAsync(RoomRequestDto room)
        {
            await _roomRepository.AddRoomAsync(room);
        }
        public async Task DeleteRoomAsync(int id)
        {
            await _roomRepository.DeleteRoomAsync(id);
        }
        public async Task<IEnumerable<RoomDto>> GetAllRoomsAsync()
        {
            var rooms = await _roomRepository.GetAllRoomsAsync();
            var response = rooms?.Select(element =>
            {
                RoomDto taskDto = new RoomDto();

                return _mapper.Map(element, taskDto);
            });
            return response;
        }

        public async Task<RoomDto> GetRoomByIdAsync(int id)
        {
            var room = await _roomRepository.GetRoomByIdAsync(id);
            RoomDto roomDto = new RoomDto();

            var response = _mapper.Map(room, roomDto);
            return response;
        }



        public async Task UpdateRoomAsync(RoomRequestDto room, int id)
        {
            await _roomRepository.UpdateRoomAsync(room, id);
        }
        public async Task<string> AvailableRoom(int id)
        {
            var room = await _roomRepository.GetRoomByIdAsync(id);
            if (room == null)
            {
                return "Room is avaible"; 
            }

            if (room.IsAvailable == true) ;

            {
                return "Room is not avaible"; 

            }
        }
    }
}
 
  