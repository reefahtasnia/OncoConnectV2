import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CSS/Doctor_finder.css";
import searchIcon from "./assets/search.png";
import Footer from "./Footer";
import DoctorDetailsPopup from "./DoctorDetailsPopup";

const Doctor_finder = () => {
  const [doctors, setDoctors] = useState([]); // All doctors fetched from the API
  const [filteredDoctors, setFilteredDoctors] = useState([]); // Doctors displayed based on search
  const [searchQuery, setSearchQuery] = useState(""); // Search input
  const [selectedFilters, setSelectedFilters] = useState({
    location: [],
    specialization: [],
    rating: [],
  });

  const [selectedDoctor, setSelectedDoctor] = useState(null); // Store selected doctor
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const doctorsPerPage = 6; // Max number of doctors per page

  const openDoctorDetails = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const closeDoctorDetails = () => {
    setSelectedDoctor(null);
  };

  // Fetch doctors from API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:5002/api/doctor_finder");
        setDoctors(response.data);
        setFilteredDoctors(response.data); // Initially show all doctors
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  // Handle search input
  const handleSearch = () => {
    const lowerCaseQuery = searchQuery.toLowerCase();

    // Filter doctors based on search query first
    let results = doctors.filter((doctor) => {
      return (
        (doctor.fullName && doctor.fullName.toLowerCase().includes(lowerCaseQuery)) ||
        (doctor.preferredPracticeArea && doctor.preferredPracticeArea.toLowerCase().includes(lowerCaseQuery)) ||
        (doctor.practiceSchedule.some(schedule => schedule.city && schedule.city.toLowerCase().includes(lowerCaseQuery)))
      );
    });

    // Apply filters after search query
    results = results.filter((doctor) =>
      (selectedFilters.location.length === 0 || selectedFilters.location.includes(doctor.practiceSchedule[0]?.city)) &&
      (selectedFilters.specialization.length === 0 || selectedFilters.specialization.includes(doctor.specialization)) &&
      (selectedFilters.rating.length === 0 || selectedFilters.rating.includes(doctor.ratings.toString()))
    );

    setFilteredDoctors(results);
  };

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    const updatedFilters = { ...selectedFilters };
    const index = updatedFilters[filterType].indexOf(value);

    if (index === -1) {
      updatedFilters[filterType].push(value); // Add value if it's not selected
    } else {
      updatedFilters[filterType].splice(index, 1); // Remove value if it's already selected
    }

    setSelectedFilters(updatedFilters);
    handleSearch(); // Reapply search after filter change
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedFilters({ location: [], specialization: [], rating: [] });
    setFilteredDoctors(doctors); // Show all doctors after clearing filters
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Slice the filteredDoctors array to show only the doctors for the current page
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

  return (
    <div className="doctor-finder-page">
      <header className="header">
        <div className="header-content">
          <h1>
            Find the <span className="highlight">Right Doctor</span>,
          </h1>
          <h1>
            Right Now: <span className="highlight">Expert Care</span>
          </h1>
          <h1>at Your Fingertips</h1>
          <div className="search-form">
            <form>
              <div className="search-input">
                <img src={searchIcon} alt="Search" />
                <input
                  type="text"
                  placeholder="Search for Doctors by Name or Location"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyUp={handleSearch}
                />
              </div>
            </form>
          </div>
        </div>
      </header>

      <section className="main-content">
        <div className="content-container">
          {/* Filter Section */}
          <aside className="filter-section">
            <div className="filter-header">
              <button className="clear-filters" onClick={clearFilters}>
                Clear filters
              </button>
            </div>
            <div className="filters">
              <FilterGroup
                title="Location"
                options={[{ label: "Dhaka", value: "Dhaka" }, { label: "Outside Dhaka", value: "Outside Dhaka" }]}
                selected={selectedFilters.location}
                onChange={(value) => handleFilterChange("location", value)}
              />
              <FilterGroup
                title="Specialization"
                options={[
                  { label: "Breast Cancer", value: "Breast Cancer" },
                  { label: "Blood Cancer", value: "Blood Cancer" },
                  { label: "Lung Cancer", value: "Lung Cancer" },
                  { label: "Skin Cancer", value: "Skin Cancer" },
                  { label: "Colorectal Cancer", value: "Colorectal Cancer" },
                  { label: "Prostate Cancer", value: "Prostate Cancer" },
                ]}
                selected={selectedFilters.specialization}
                onChange={(value) => handleFilterChange("specialization", value)}
              />
              <FilterGroup
                title="Ratings"
                options={[
                  { label: "★★★★★", value: "5" },
                  { label: "★★★★☆", value: "4" },
                  { label: "★★★☆☆", value: "3" },
                  { label: "★★☆☆☆", value: "2" },
                  { label: "★☆☆☆☆", value: "1" },
                ]}
                selected={selectedFilters.rating}
                onChange={(value) => handleFilterChange("rating", value)}
              />
            </div>
          </aside>

          <main className="doctors-section">
            <div className="doctors-header">
              <p>Found {filteredDoctors.length} doctors</p>
            </div>
            <div className="doctors-grid">
              {currentDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor._id}
                  name={doctor.fullName}
                  hospital={doctor.practiceSchedule[0]?.hospitalName}
                  image={`http://localhost:5002${doctor.imagePath}`}
                  credentials={doctor.certifications?.map(cert => `${cert.name} (${cert.year})`).join(", ")}
                  rating={doctor.ratings}
                  reviews={doctor.reviews?.length || 0}
                  onClick={() => openDoctorDetails(doctor)}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="pagination">
              <button
                className="page-btn prev"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ←
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={`page-btn ${index + 1 === currentPage ? "active" : ""}`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button
                className="page-btn next"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                →
              </button>
            </div>
          </main>
        </div>
      </section>
      <Footer />
      {selectedDoctor && (
        <DoctorDetailsPopup doctor={selectedDoctor} onClose={closeDoctorDetails} />
      )}
    </div>
  );
};

// Filter Group Component
const FilterGroup = ({ title, options, selected, onChange }) => (
  <div className="filter-group">
    <h4>{title}</h4>
    <ul>
      {options.map((option, index) => (
        <li key={index}>
          <label>
            <input
              type="checkbox"
              checked={selected.includes(option.value)}
              onChange={() => onChange(option.value)}
            />
            {option.label}
          </label>
        </li>
      ))}
    </ul>
  </div>
);

// Doctor Card Component
const DoctorCard = ({ image, name, credentials, hospital, rating, reviews, onClick }) => (
  <div className="doctor-card" onClick={onClick}>
    <img src={image} alt={name} className="doctor-image" />
    <div className="doctor-info">
      <h3>{name}</h3>
      <p className="credentials">{credentials}</p>
      <p className="hospital">{hospital}</p>
      <div className="rating">
        {[...Array(5)].map((_, index) => (
          <span key={index} className={`star ${index < rating ? 'filled' : ''}`}>
            ★
          </span>
        ))}
        <span className="review-count">({reviews} reviews)</span>
      </div>
    </div>
  </div>
);

export default Doctor_finder;
