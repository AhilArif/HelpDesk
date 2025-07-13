import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminLoginLogs.css"; // Ensure CSS file is imported

const AdminLoginLogs = () => {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    fetchLogs();
  }, []);

  useEffect(() => {
    setFilteredLogs(
      logs.filter((log) =>
        log.email.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, logs]);

  const fetchLogs = async () => {
    try {
      const res = await axios.get("http://10.51.20.77:3000/api/login-logs", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setLogs(res.data);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  // Pagination logic
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);

  return (
    <div className="logs-container">
      <button className="back-button" onClick={() => navigate("/admin-home")}>
        ← Back to Home
      </button>
      <h1>User Login Logs</h1>

      {/* Search Box */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by email..."
          className="search-box"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="search-button" onClick={() => fetchLogs()}>
          Search
        </button>
      </div>

      {/* Logs Table */}
      <table className="logs-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Login Time</th>
            <th>IP Address</th>
            <th>Browser</th>
          </tr>
        </thead>
        <tbody>
          {currentLogs.length > 0 ? (
            currentLogs.map((log) => (
              <tr key={log._id}>
                <td>{log.email}</td>
                <td>{new Date(log.createdAt).toLocaleString()}</td>
                <td>{log.ipAddress || "N/A"}</td>
                <td>{log.userAgent || "Unknown"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No logs found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastLog >= filteredLogs.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminLoginLogs;
