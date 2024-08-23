using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SOAproject.DTOs;
using SOAproject.Services.Implementations;
using SOAproject.Services.Interfaces;

namespace SOAproject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoomsController : ControllerBase
    {
        private readonly IRoomService _roomService;

        public RoomsController(IRoomService roomService)
        {
            _roomService = roomService;
        }

        [HttpGet]
        [Authorize (Roles="Admin")]
        public async Task<ActionResult<IEnumerable<RoomDto>>> GetAllRooms()
        {
            var rooms = await _roomService.GetAllRoomsAsync();
            return Ok(rooms);
        }

        [HttpPost]
        // [Authorize(Roles = "Admin")]
        public async Task<ActionResult> AddRoom(RoomRequestDto roomDto)
        {
            await _roomService.AddRoomAsync(roomDto);
            return Ok();
        }

        [HttpGet("{id}")]
        //[Authorize]
        public async Task<ActionResult<RoomDto>> GetRoomById(int id)
        {
            var response = await _roomService.GetRoomByIdAsync(id);
            return Ok(response);
        }

        [HttpDelete("{id}")]
        //[Authorize(Roles = "Admin")]
        public async Task<ActionResult> DeleteRoom(int id)
        {
            await _roomService.DeleteRoomAsync(id);
            return Ok();
        }

        [HttpPut("{id}")]
        //[Authorize(Roles = "Admin")]
        public async Task<ActionResult> UpdateRoom(RoomRequestDto room, int id)
        {

            await _roomService.UpdateRoomAsync(room, id);
            return Ok();
        }

        [HttpPut("avaible/{id}")]
        public async Task<ActionResult>AvaibleRoom(int id)
        {
            var response=await _roomService.AvailableRoom(id);
            return Ok(response);
        }
    }
}
