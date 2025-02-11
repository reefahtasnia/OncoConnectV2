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

  const openDoctorDetails = (doctor) => {
    console.log("hiiii");
    setSelectedDoctor(doctor);
    console.log("miuuuu",doctor);
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
        (doctor.name && doctor.name.toLowerCase().includes(lowerCaseQuery)) ||
        (doctor.hospital && doctor.hospital.toLowerCase().includes(lowerCaseQuery)) ||
        (doctor.location && doctor.location.toLowerCase().includes(lowerCaseQuery)) ||
        (doctor.specialization && doctor.specialization.toLowerCase().includes(lowerCaseQuery))
      );
    });
  
    // Apply filters after search query
    results = results.filter((doctor) => 
      (selectedFilters.location.length === 0 || selectedFilters.location.includes(doctor.location)) &&
      (selectedFilters.specialization.length === 0 || selectedFilters.specialization.includes(doctor.specialization)) &&
      (selectedFilters.rating.length === 0 || selectedFilters.rating.includes(doctor.rating.toString()))
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
                options={[
                  { label: "Dhaka", value: "Dhaka" },
                  { label: "Outside Dhaka", value: "Outside Dhaka" },
                ]}
                selected={selectedFilters.location}
                onChange={(value) => handleFilterChange("location", value)}
              />
              <FilterGroup
                title="Cancer Type"
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
              {filteredDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor._id}
              
                  name={doctor.name}
                  hospital={doctor.hospital}
                  image={`http://localhost:5002${doctor.image}`}
                  credentials={doctor.credentials}
                  rating={doctor.rating}
                  reviews={doctor.reviews}
                  onClick={() => openDoctorDetails(doctor)}
                  
                />
              ))}
            </div>
             {/* Pagination */}
             <div className="pagination">
              <button className="page-btn prev">←</button>
              <button className="page-btn active">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn">3</button>
              <span>...</span>
              <button className="page-btn">8</button>
              <button className="page-btn next">→</button>
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
