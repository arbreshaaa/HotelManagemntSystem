import React, { useState, useEffect } from "react";
import "../App.css";

const Home = ({ submissionComplete }) => {
  const [reservations, setReservations] = useState([]);
  const [view, setView] = useState("upcoming");
  const [showForm, setShowForm] = useState(false);
  const [newReservation, setNewReservation] = useState({
    roomId: "",
    userName: "",
    checkInDate: "",
    checkOutDate: "",
  });
  const [formError, setFormError] = useState("");

  const fetchReservations = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("https://localhost:7247/api/Reservations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorDetail = await response.text();
        throw new Error(
          `Network response was not ok: ${response.status} ${response.statusText} - ${errorDetail}`
        );
      }

      const data = await response.json();
      setReservations(data);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  const handleDeleteReservation = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      await fetch(`https://localhost:7247/api/Reservations/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReservations(
        reservations.filter((reservation) => reservation.id !== id)
      );
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [submissionComplete]);

  const generateRoomPhoto = (roomId) => {
    const images = [
      "https://th.bing.com/th?id=OIP.Yi9Cvg7fxkXk5ORrAjXcmAHaFN&w=298&h=209&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=3.1&rm=2",
      "https://via.placeholder.com/300x200?text=Room+2",
      "https://via.placeholder.com/300x200?text=Room+3",
      "https://via.placeholder.com/300x200?text=Room+4",
      "https://via.placeholder.com/300x200?text=Room+5",
    ];
    return images[roomId % images.length];
  };

  const isOverlapping = (newReservation) => {
    // Check for overlapping reservations logic here
    return false; // Replace with actual check
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    // Convert dates to UTC
    const checkInDateUTC = new Date(newReservation.checkInDate).toISOString();
    const checkOutDateUTC = new Date(newReservation.checkOutDate).toISOString();

    if (
      isOverlapping({
        ...newReservation,
        checkInDate: checkInDateUTC,
        checkOutDate: checkOutDateUTC,
      })
    ) {
      setFormError("You have a reservation that overlaps with these dates.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        "https://localhost:7247/api/Reservations/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...newReservation,
            checkInDate: checkInDateUTC,
            checkOutDate: checkOutDateUTC,
          }),
        }
      );

      if (!response.ok) {
        const errorDetail = await response.text();
        throw new Error(
          `Network response was not ok: ${response.status} ${response.statusText} - ${errorDetail}`
        );
      }

      try {
        await response.json();
      } catch (e) {
        console.warn("Response did not contain JSON:", e);
      }

      fetchReservations();

      setShowForm(false);
      setNewReservation({
        roomId: "",
        userName: "",
        checkInDate: "",
        checkOutDate: "",
      });
    } catch (error) {
      console.error("Error adding reservation:", error);
      setFormError(error.message);
    }
  };

  const upcomingReservations = reservations.filter(
    (reservation) => new Date(reservation.checkInDate) >= new Date()
  );

  const pastReservations = reservations.filter(
    (reservation) => new Date(reservation.checkInDate) < new Date()
  );

  return (
    <div
      className="min-h-screen bg-cover bg-center p-4"
      style={{
        backgroundImage:
          "url('https://www.tripsavvy.com/thmb/8sXUpguC8WNJGR-pzmciIGGItZs=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/PMC_3922re2-7a204d0f28cc4d2abacf951df89d19d5.jpg')",
      }}
    >
      <div className="bg-gray-800 w-full bg-opacity-80 rounded-lg p-6">
        <h2 className="text-2xl font-bold italic text-yellow-600 bg-gradient-to-r from-yellow-600 to-yellow-400 bg-clip-text text-transparent my-4">
          Welcome back!
        </h2>

        <div className="flex justify-center space-x-4 mb-6">
          <button
            className={`px-4 py-2 rounded ${
              view === "upcoming" ? "bg-yellow-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setView("upcoming")}
          >
            Upcoming Reservations
          </button>
          <button
            className={`px-4 py-2 bg-yellow-600 "rounded text-white ${
              view === "past" ? "bg-yellow-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setView("past")}
          >
            History
          </button>
          <button
            className="px-9 py-2 rounded bg-yellow-600 text-white"
            onClick={() => setShowForm(true)}
          >
            Add Reservation
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleFormSubmit}
            className="bg-white p-4 rounded shadow-md max-w-md mx-auto"
          >
            <div className="mb-4">
              <label className="block text-sm font-medium">Room ID:</label>
              <input
                type="number"
                value={newReservation.roomId}
                onChange={(e) =>
                  setNewReservation({
                    ...newReservation,
                    roomId: e.target.value,
                  })
                }
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">User Name:</label>
              <input
                type="text"
                value={newReservation.userName}
                onChange={(e) =>
                  setNewReservation({
                    ...newReservation,
                    userName: e.target.value,
                  })
                }
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">
                Check-In Date:
              </label>
              <input
                type="datetime-local"
                value={newReservation.checkInDate}
                onChange={(e) =>
                  setNewReservation({
                    ...newReservation,
                    checkInDate: e.target.value,
                  })
                }
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">
                Check-Out Date:
              </label>
              <input
                type="datetime-local"
                value={newReservation.checkOutDate}
                onChange={(e) =>
                  setNewReservation({
                    ...newReservation,
                    checkOutDate: e.target.value,
                  })
                }
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            {formError && <p className="text-red-500 text-sm">{formError}</p>}
            <div className="flex justify-between">
              <button
                type="submit"
                className="px-4 py-2 bg-amber-800 text-white rounded"
              >
                Add Reservation
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-amber-800 text-white rounded"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {view === "upcoming" && upcomingReservations.length > 0 ? (
            upcomingReservations.map((reservation) => (
              <div
                key={reservation.id}
                className="bg-white p-4 rounded shadow-md text-center"
              >
                <img
                  src={generateRoomPhoto(reservation.roomId)}
                  alt={`Room ${reservation.roomId}`}
                  className="w-full h-40 object-cover rounded mb-4"
                />
                <p>
                  <strong>Check-In:</strong>{" "}
                  {new Date(reservation.checkInDate).toLocaleString()}
                </p>
                <p>
                  <strong>Check-Out:</strong>{" "}
                  {new Date(reservation.checkOutDate).toLocaleString()}
                </p>
                <button
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                  onClick={() => handleDeleteReservation(reservation.id)}
                >
                  Delete
                </button>
              </div>
            ))
          ) : view === "past" && pastReservations.length > 0 ? (
            pastReservations.map((reservation) => (
              <div
                key={reservation.id}
                className="bg-white p-4 rounded shadow-md text-center"
              >
                <img
                  src={generateRoomPhoto(reservation.roomId)}
                  alt={`Room ${reservation.roomId}`}
                  className="w-full h-40 object-cover rounded mb-4"
                />
                <p>
                  <strong>Check-In:</strong>{" "}
                  {new Date(reservation.checkInDate).toLocaleString()}
                </p>
                <p>
                  <strong>Check-Out:</strong>{" "}
                  {new Date(reservation.checkOutDate).toLocaleString()}
                </p>
                <button
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                  onClick={() => handleDeleteReservation(reservation.id)}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p className="text-lg text-yellow-600 font-medium text-left mt-8">
              No reservations found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
