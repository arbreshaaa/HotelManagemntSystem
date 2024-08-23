using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SOAproject.DTOs;
using SOAproject.Repositories.Interfaces;
using SOAproject.Services.Interfaces;

using Task = System.Threading.Tasks.Task;

namespace SOAproject.Services.Implementations
{
    public class ReservationService: IReservationService
    { 
        private readonly IReservationRepository _reservationRepository;
        private readonly IMapper _mapper;

        public ReservationService(IReservationRepository reservationRepository, IMapper mapper)
        {
            _reservationRepository = reservationRepository;
            _mapper = mapper;
        }

        
        public async Task AddReservationAsync(ReservationRequestDto reservationDto)
        {
            await _reservationRepository.AddReservationAsync(reservationDto);
        }
        public async Task DeleteReservationAsync(int id)
        {
            await _reservationRepository.DeleteReservationAsync(id);
        }

public async Task<IEnumerable<ReservationDto>> GetAllReservationsAsync()
        {
            var reservations = await _reservationRepository.GetAllReservationsAsync();
            var response = reservations?.Select(element =>
            {
                ReservationDto taskDto = new ReservationDto();

                return _mapper.Map(element, taskDto);
            });

            return response;
        }

        public async Task<ReservationDto> GetReservationByIdAsync(int id)
        {
            var reservation = await _reservationRepository.GetReservationByIdAsync(id);
           ReservationDto reservationDto = new ReservationDto();

            var response=_mapper.Map(reservation, reservationDto);
            return response;
        }


        public async Task UpdateReservationAsync(ReservationRequestDto reservation, int id)
        {
            await _reservationRepository.UpdateReservationAsync(reservation, id);
        }

    }
}
