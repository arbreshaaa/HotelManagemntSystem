using AutoMapper;
using SOAproject.DTOs;
using SOAproject.Models;

namespace SOAproject.Mapper
{
    public class MappingProfile:Profile
    {
        public MappingProfile() {
            CreateMap<ReservationDto, Reservation>();
            CreateMap< Reservation,ReservationDto>();
            CreateMap<RoomDto, Room>();
            CreateMap<Room, RoomDto>();
        }
       
    }
}
