import React, { useState, useEffect } from 'react';
import "./CSS/CancerScreening.css";
import Footer from "./Footer";
import searchIcon from "./assets/search.png";
import axios from "axios";

const CancerScreening = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [searchInput, setSearchInput] = useState(""); 
  const [screeningData, setScreeningData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Display 4 items per page

  useEffect(() => {
    const fetchScreeningData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cancerscreen");
        setScreeningData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchScreeningData();
  }, []);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Filtering based on search input
  const filteredScreenings = screeningData.filter(screening =>
    screening.type.toLowerCase().includes(searchInput.toLowerCase())
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredScreenings.length / itemsPerPage);

  // Get screenings for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentScreenings = filteredScreenings.slice(indexOfFirstItem, indexOfLastItem);

  // Handle pagination click
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="cancer-screening">
        <header className="sheader">
          <h1>Cancer Screening</h1>
          <p>Screen Today for a Healthier Tomorrow</p>
          <div className="search-formm">
            <form>
              <div className="search-inputt">
                <img src={searchIcon} alt="Search" />
                <input 
                  type="text" 
                  placeholder="Search by Cancer types"
                  value={searchInput}
                  onChange={handleSearchInputChange}
                />
              </div>
            </form>
          </div>
        </header>

        <section className="about-screening">
          <div className="info-card">
            <h2>What is Screening?</h2>
            <p>Screening is the process of checking for cancer (or other diseases) in people who do not have any symptoms. It helps in early detection, which can make treatment more effective.</p>
          </div>
          <div className="info-card">
            <h2>Who is Eligible?</h2>
            <p>Eligibility for screening depends on various factors such as age, gender, family history, and risk factors associated with specific cancers.</p>
          </div>
          <div className="info-card">
            <h2>Benefits of Screening</h2>
            <p>Early detection of cancer can increase the chances of successful treatment, reduce the severity of the disease, and improve survival rates.</p>
          </div>
        </section>

        <div className="screening-sections">
          {loading ? (
            <p>Loading cancer screening data...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            currentScreenings.map((screening) => (
              <div className="screening-card" key={screening.id}>
                <h2>{screening.type}</h2>
                <p>{screening.description}</p>
                <button className="toggle-btn" onClick={() => toggleSection(screening.id)}>
                  {expandedSection === screening.id ? 'Hide -' : 'Show More +'}
                </button>
                {expandedSection === screening.id && (
                  <div className="expanded-content">
                    {screening.details.map((detail, index) => (
                      <p key={index}>{detail}</p>
                    ))}
                    <button className="toggle-btn" onClick={openModal}>Book Appointment</button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="paginationn">
          <button 
            className="page-btn prevv" 
            onClick={() => handlePageChange(currentPage - 1)} 
            disabled={currentPage === 1}
          >
            ←
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button 
              key={index + 1} 
              className={`page-btn ${currentPage === index + 1 ? 'activee' : ''}`} 
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button 
            className="page-btn nextt" 
            onClick={() => handlePageChange(currentPage + 1)} 
            disabled={currentPage === totalPages}
          >
            →
          </button>
        </div>

        {/* Modal for Booking Appointment */}
        {isModalOpen && (
          <div className={`modal ${isModalOpen ? 'show' : ''}`}>
            <div className="modal-content">
              <div className="modal-header">
                <h2>Add Appointment</h2>
                <span className="close" onClick={closeModal}>&times;</span>
              </div>
              <form className="appointment-form">
                <div className="form-row">
                  <label>Name</label>
                  <input type="text" placeholder="Write your name" required />
                </div>
                <div className="form-row">
                  <label>Date</label>
                  <input type="date" required />
                </div>
                <div className="form-row">
                  <label>Time</label>
                  <input type="time" required />
                </div>
                <div className="form-row">
                  <label>Medium</label>
                  <select required>
                    <option value="online">In-person</option>
                    <option value="in-person">Home-Test</option>
                  </select>
                </div>
                <div className="form-row">
                  <label>Phone Number</label>
                  <input type="text" placeholder="01..." required />
                </div>
                <div className="form-actions">
                  <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
                  <button type="submit" className="confirm-btn">Confirm</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CancerScreening;
