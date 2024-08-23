using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SOAproject.DTOs;
using SOAproject.Repositories;
using SOAproject.Services;
using SOAproject.Services.Interfaces;
using System.Security.Claims;

namespace SOAproject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReservationsController:ControllerBase
{
    private readonly IReservationService _reservationService;

    public ReservationsController(IReservationService reservationService)
    {
        _reservationService = reservationService;
    }

    [HttpGet]
   [Authorize(Roles ="Admin,User")]
    public async Task<ActionResult<IEnumerable<ReservationDto>>> GetAllReservations()
    {
        var reservations = await _reservationService.GetAllReservationsAsync();
        return Ok(reservations);
    }


        [HttpPost]
        [Route("add")]
        [Authorize(Roles = "Admin,User")]
        public async Task<ActionResult> AddReservation( ReservationRequestDto reservationDto)
     {
            await _reservationService.AddReservationAsync(reservationDto);
            return Ok();
     }


     [HttpDelete("{id}")]
     [Authorize(Roles = "Admin,User")]
        public async Task<ActionResult> DeleteReservation(int id)
    {
        await _reservationService.DeleteReservationAsync(id);
        return Ok();
    }

    [HttpGet("{id}")]
    //[Authorize]
    public async Task<ActionResult<ReservationDto>> GetReservationById(int id)
    {
        var reservation = await _reservationService.GetReservationByIdAsync(id);
        return Ok(reservation);
    }

     [HttpPut("{id}")]
     [Authorize(Roles = "Admin,User")]
        public async Task<ActionResult> UpdateReservation( ReservationRequestDto reservationDto,int id)
    {
     
       await _reservationService.UpdateReservationAsync(reservationDto,id);
        return NoContent();
    }

    }
}
