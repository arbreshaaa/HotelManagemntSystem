using SOAproject.DTOs;
using SOAproject.Models;

namespace SOAproject.Repositories.Interfaces
{
    public interface IReservationRepository
    {
        Task<IEnumerable<Reservation>> GetAllReservationsAsync();
        Task<Reservation> GetReservationByIdAsync(int id);
        Task AddReservationAsync(ReservationRequestDto reservation);
        Task UpdateReservationAsync(ReservationRequestDto reservation, int id);
        Task DeleteReservationAsync(int id);
        
    }
}
