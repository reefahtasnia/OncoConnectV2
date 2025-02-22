import React, { useEffect, useState } from "react";
import axios from "axios";

const DonationAdmin = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/pending-donations");
      setDonations(response.data);
    } catch (error) {
      console.error("Error fetching donations:", error);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/update-donation/${id}`, { status });
      setDonations((prev) => prev.filter((donation) => donation._id !== id)); // Remove updated row
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="admin-container">
      <h2>Pending Donations</h2>
      <table className="donation-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Amount</th>
            <th>Reason</th>
            <th>Bank Statement</th>
            <th>Verified</th>
            <th>Rejected</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation, index) => (
            <tr key={donation._id}>
              <td>{index + 1}</td>
              <td>{donation.username}</td>
              <td>${donation.amount}</td>
              <td>{donation.reason}</td>
              <td>
                <a href={donation.bank_statement} target="_blank" rel="noopener noreferrer">
                  View PDF
                </a>
              </td>
              <td>
                <input
                  type="checkbox"
                  onChange={() => handleStatusChange(donation._id, "approved")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  onChange={() => handleStatusChange(donation._id, "rejected")}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DonationAdmin;
