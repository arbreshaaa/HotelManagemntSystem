using Microsoft.EntityFrameworkCore;
using SOAproject.Data;
using SOAproject.DTOs;
using SOAproject.Models;
using SOAproject.Repositories.Interfaces;
using System.Threading.Tasks;


namespace SOAproject.Repositories.Implementations
{
    public class ReservationRepository : IReservationRepository
    {
        private readonly AppDbContext _context;

        public ReservationRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Reservation>> GetAllReservationsAsync()
        {
            return await _context.Reservations.ToListAsync();
        }

        public async Task<Reservation> GetReservationByIdAsync(int id)
        {
            var reservation = await _context.Reservations.FindAsync(id);
            return reservation ?? new Reservation();
        }

        public async Task AddReservationAsync(ReservationRequestDto reservation)
        {
            Reservation requestbody = new Reservation();

            requestbody.RoomId = reservation.RoomId;
            requestbody.username = reservation.UserName;
            requestbody.CheckInDate = reservation.CheckInDate;
            requestbody.CheckOutDate = reservation.CheckOutDate;

            _context.Reservations.Add(requestbody);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteReservationAsync(int id)
        {
            var reservation = await _context.Reservations.FindAsync(id);
            if (reservation != null)
            {
                _context.Reservations.Remove(reservation);
                await _context.SaveChangesAsync();
            }
        }

        public async Task UpdateReservationAsync(ReservationRequestDto request, int id)
        {
            var reservation = await _context.Reservations.FindAsync(id);

            if (reservation != null)
            {
                reservation.RoomId =request.RoomId;
                reservation.username = request.UserName;
                reservation.CheckInDate = request.CheckInDate;
                reservation.CheckOutDate = request.CheckOutDate;


                _context.Entry(reservation).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
        }

    }
}

