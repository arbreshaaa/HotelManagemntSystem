using SOAproject.DTOs;
using SOAproject.Models;

namespace SOAproject.Services.Interfaces
{
    public interface IReservationService
    {
        Task<IEnumerable<ReservationDto>> GetAllReservationsAsync();
        Task<ReservationDto> GetReservationByIdAsync(int id);
        Task AddReservationAsync(ReservationRequestDto reservation);
        Task UpdateReservationAsync(ReservationRequestDto reservation, int id);
        Task DeleteReservationAsync(int id);
    }
}

