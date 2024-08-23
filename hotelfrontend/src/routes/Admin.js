import React, { useState, useEffect } from "react";
import "../App.css";

const Admin = ({ submissionComplete }) => {
  const [reservations, setReservations] = useState([]);
  const [view, setView] = useState("upcoming");
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState("add"); // 'add' for adding, 'edit' for updating
  const [newReservation, setNewReservation] = useState({
    id: "",
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
      "https://th.bing.com/th/id/OIP.Yi9Cvg7fxkXk5ORrAjXcmAHaFN?w=251&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      "https://th.bing.com/th?id=OIP.JbhsI6d_DpTV6QnMGzvO_wHaE8&w=306&h=204&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=3.1&rm=2",
      "https://via.placeholder.com/300x200?text=Room+3",
      "https://via.placeholder.com/300x200?text=Room+4",
      "https://via.placeholder.com/300x200?text=Room+5",
    ];
    return images[roomId % images.length];
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    // Convert dates to UTC
    const checkInDateUTC = new Date(newReservation.checkInDate).toISOString();
    const checkOutDateUTC = new Date(newReservation.checkOutDate).toISOString();

    try {
      const token = localStorage.getItem("authToken");
      let url = "https://localhost:7247/api/Reservations/add";
      let method = "POST";

      if (formMode === "edit") {
        url = `https://localhost:7247/api/Reservations/${newReservation.id}`;
        method = "PUT";
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          roomId: newReservation.roomId,
          userName: newReservation.userName,
          checkInDate: checkInDateUTC,
          checkOutDate: checkOutDateUTC,
        }),
      });

      if (!response.ok) {
        const errorDetail = await response.text();
        throw new Error(
          `Network response was not ok: ${response.status} ${response.statusText} - ${errorDetail}`
        );
      }

      fetchReservations();

      setShowForm(false);
      setNewReservation({
        id: "",
        roomId: "",
        userName: "",
        checkInDate: "",
        checkOutDate: "",
      });
      setFormMode("add");
    } catch (error) {
      console.error("Error adding or updating reservation:", error);
      setFormError(error.message);
    }
  };

  const handleEditReservation = (reservation) => {
    setNewReservation({
      id: reservation.id,
      roomId: reservation.roomId,
      userName: reservation.userName,
      checkInDate: reservation.checkInDate,
      checkOutDate: reservation.checkOutDate,
    });
    setFormMode("edit");
    setShowForm(true);
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
          Hello Admin :)
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
            className={`px-4 py-2 rounded ${
              view === "past" ? "bg-yellow-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setView("past")}
          >
            History
          </button>
          <button
            className="px-6 py-2 rounded bg-yellow-600 text-white"
            onClick={() => {
              setShowForm(true);
              setFormMode("add");
              setNewReservation({
                id: "",
                roomId: "",
                userName: "",
                checkInDate: "",
                checkOutDate: "",
              });
            }}
          >
            Add Reservation
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleFormSubmit}
            className="bg-white p-4 rounded shadow-md max-w-md mx-auto"
          >
            <div className="mb-2">
              <label className="block text-xs font-medium">Room ID:</label>
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
                className="w-full p-1 border border-gray-300 rounded text-sm"
              />
            </div>
            <div className="mb-2">
              <label className="block text-xs font-medium">User Name:</label>
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
                className="w-full p-1 border border-gray-300 rounded text-sm"
              />
            </div>
            <div className="mb-2">
              <label className="block text-xs font-medium">
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
                className="w-full p-1 border border-gray-300 rounded text-sm"
              />
            </div>
            <div className="mb-2">
              <label className="block text-xs font-medium">
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
                className="w-full p-1 border border-gray-300 rounded text-sm"
              />
            </div>
            {formError && <p className="text-red-500 text-xs">{formError}</p>}
            <div className="flex justify-between mt-2">
              <button
                type="submit"
                className="px-3 py-1 bg-amber-800 text-white rounded text-xs"
              >
                {formMode === "add" ? "Add Reservation" : "Update Reservation"}
              </button>
              <button
                type="button"
                className="px-3 py-1 bg-amber-800 text-white rounded text-xs"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="mt-4">
          {view === "upcoming" && (
            <div>
              <h3 className="text-xl font-bold mb-2 text-yellow-600">
                Upcoming Reservations
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {upcomingReservations.length > 0 ? (
                  upcomingReservations.map((reservation) => (
                    <div
                      key={reservation.id}
                      className="bg-white p-4 rounded shadow-md"
                    >
                      <div
                        className="relative bg-gray-200 rounded"
                        style={{ paddingBottom: "56.25%" }}
                      >
                        <img
                          src={generateRoomPhoto(reservation.roomId)}
                          alt={`Room ${reservation.roomId}`}
                          className="absolute inset-0 w-full h-full object-cover rounded"
                        />
                      </div>
                      <h4 className="text-lg font-semibold mt-2">
                        Room {reservation.roomId}
                      </h4>
                      <p>
                        <strong>Guest:</strong> {reservation.userName}
                      </p>
                      <p>
                        <strong>Check-In:</strong>{" "}
                        {new Date(reservation.checkInDate).toLocaleString()}
                      </p>
                      <p>
                        <strong>Check-Out:</strong>{" "}
                        {new Date(reservation.checkOutDate).toLocaleString()}
                      </p>
                      <div className="flex space-x-2 mt-2">
                        <button
                          className="px-2 py-1 bg-red-600 text-white rounded text-xs"
                          onClick={() =>
                            handleDeleteReservation(reservation.id)
                          }
                        >
                          Delete
                        </button>
                        <button
                          className="px-2 py-1 bg-yellow-600 text-white rounded text-xs"
                          onClick={() => handleEditReservation(reservation)}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No upcoming reservations found.</p>
                )}
              </div>
            </div>
          )}

          {view === "past" && (
            <div>
              <h3 className="text-xl font-bold mb-2 text-yellow-600">
                History
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {pastReservations.length > 0 ? (
                  pastReservations.map((reservation) => (
                    <div
                      key={reservation.id}
                      className="bg-white p-4 rounded shadow-md"
                    >
                      <div
                        className="relative bg-gray-200 rounded"
                        style={{ paddingBottom: "56.25%" }}
                      >
                        <img
                          src={generateRoomPhoto(reservation.roomId)}
                          alt={`Room ${reservation.roomId}`}
                          className="absolute inset-0 w-full h-full object-cover rounded"
                        />
                      </div>
                      <h4 className="text-lg font-semibold mt-2">
                        Room {reservation.roomId}
                      </h4>
                      <p>
                        <strong>Guest:</strong> {reservation.userName}
                      </p>
                      <p>
                        <strong>Check-In:</strong>{" "}
                        {new Date(reservation.checkInDate).toLocaleString()}
                      </p>
                      <p>
                        <strong>Check-Out:</strong>{" "}
                        {new Date(reservation.checkOutDate).toLocaleString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No past reservations found.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
