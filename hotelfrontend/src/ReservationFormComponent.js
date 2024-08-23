// ReservationFormComponent.js

import React, { useState } from 'react';
import axios from 'axios';

const ReservationFormComponent = ({ onSubmit }) => {
  const [roomId, setRoomId] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:7247api/Reservations', { roomId, checkInDate, checkOutDate });
      onSubmit(); // Optional: Handle success action (e.g., navigate back to Dashboard)
    } catch (error) {
      console.error('Error adding reservation:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Room ID" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
      <input type="date" placeholder="Check-In Date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} />
      <input type="date" placeholder="Check-Out Date" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ReservationFormComponent;
