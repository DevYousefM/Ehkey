import React, { useState, useEffect } from "react";
import "./ReservationsPage.scss"; // Import SCSS file for styling
import useGetReservations from "../../../hooks/admin/reservation/useGetReservations";
import Pagination from "../../CompentsAdmin/Pagination/Pagination";

const ReservationsPage = () => {
  const {
    success,
    error,
    getReservations,
    data: originalReservations,
    totalPages,
  } = useGetReservations();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchReservations = async () => {
      const response = await getReservations(token, currentPage);
    };

    fetchReservations();
  }, [token, currentPage]);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString();
  };



  function formatTimeToHHMM(timestamp) {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }
  const handlePageChange = (page) => setCurrentPage(page);

  // Filter reservations based on search query
  const filteredReservations = originalReservations.filter(reservation => reservation.user.email.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="reservations-page mainPage">
      <h2>Reservations</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <table className="reservation-table">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Email</th>

            <th> Date</th>
            <th> Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredReservations.map((reservation) => (
            <tr key={reservation.id}>
              <td>{reservation.user.name}</td>
              <td>{reservation.user.email}</td>

              <td> <span className="Spanio">From</span> {new Date(reservation.startDateTime).toLocaleDateString()}  <span className="Spanio">To</span> {new Date(reservation.endDateTime).toLocaleDateString()} </td>
              <td> <span className="Spanio">From</span> {formatTimeToHHMM(reservation.startDateTime)} <span className="Spanio">To</span> {formatTimeToHHMM(reservation.endDateTime)}</td>


              <td>{reservation.status}</td>



            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        onPageChange={handlePageChange}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </div>
  );
};

export default ReservationsPage;
