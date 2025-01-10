import React, { useState } from "react";
import "./CSS/Doctor_finder.css";
import searchIcon from "./assets/search.png";
import doctor1Image from "./assets/doctor-1.jpg";
import doctor2Image from "./assets/doctor-2.jpg";
import doctor3Image from "./assets/doctor-3.jpg";
import doctor4Image from "./assets/doctor-4.jpg";
import doctor5Image from "./assets/Prof.-Dr.-Qamruzzaman-Chowdhury.jpg";
import doctor6Image from "./assets/Prof.-Dr.-Md.-Mofazzel-Hossain.jpg";
import DoctorDetailsPopup from "./DoctorDetailsPopup";
import Footer from "./Footer";

const Doctor_finder = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const openDoctorDetails = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const closeDoctorDetails = () => {
    setSelectedDoctor(null);
  };

  const doctors = [
    {
      id: 1,
      image: doctor1Image,
      name: "Prof. Dr. Swapan Bandyopadhyay",
      credentials: "MBBS, MD (Oncology), MPhil (Radiotherapy)",
      hospital: "Medinova Medical Services, Malibagh",
      rating: 4,
      reviews: 1897,
      about: "Prof. Dr. Swapan Bandyopadhyay is a Cancer Specialist in Dhaka. He is now working as a Professor & Head of the Department at Sir Salimullah Medical College & Mitford Hospital. He regularly provides treatment to his patients at Medinova Medical Services, Malibagh.",
      workingHours: "6:30 PM to 9:30 PM (Closed: Friday)"
    },
    {
      id: 2,
      image: doctor2Image,
      name: "Prof. Dr. Md. Moarraf Hossen",
      credentials: "MBBS, DMRT (BSMMU), FCPS (Radiotherapy)",
      hospital: "Green Life Hospital, Dhaka",
      rating: 5,
      reviews: 1897,
      about: "Prof. Dr. Md. Moarraf Hossen is a renowned oncologist specializing in radiotherapy. He has extensive experience in treating various types of cancer.",
      workingHours: "5:00 PM to 8:00 PM (Closed: Thursday)"
    },
    {
      id: 3,
      image: doctor3Image,
      name: "Prof. Dr. Kazi Manzur Kader",
      credentials: "MBBS, DMRT, MSc, FACP",
      hospital: "Popular Diagnostic Center, Dhanmondi",
      rating: 4,
      reviews: 1897,
      about: "Prof. Dr. Kazi Manzur Kader is a highly experienced oncologist with expertise in diagnostic oncology and personalized cancer treatment plans.",
      workingHours: "4:00 PM to 8:00 PM (Closed: Friday)"
    },
    {
      id: 4,
      image: doctor4Image,
      name: "Prof. Dr. Parveen Shahida Akhter",
      credentials: "MBBS (SSMC), FCPS (Radiotherapy)",
      hospital: "Medinova Medical Services, Dhanmondi",
      rating: 4,
      reviews: 1897,
      about: "Prof. Dr. Parveen Shahida Akhter is a leading oncologist known for her expertise in radiotherapy and comprehensive cancer care.",
      workingHours: "5:30 PM to 8:30 PM (Closed: Saturday)"
    },
    {
      id: 5,
      image: doctor5Image,
      name: "Prof. Dr. Qamruzzaman Chowdhury",
      credentials: "MBBS, FCPS (Radiation Oncology)",
      hospital: "Bangladesh Specializes Hospital",
      rating: 3,
      reviews: 1897,
      about: "Prof. Dr. Qamruzzaman Chowdhury is a specialist in radiation oncology, focusing on precise and targeted cancer treatments.",
      workingHours: "3:00 PM to 7:00 PM (Closed: Wednesday)"
    },
    {
      id: 6,
      image: doctor6Image,
      name: "Prof. Dr. Md. Mofazzel Hossain",
      credentials: "MBBS, FCPS (Medicine), Fellow (Oncology)",
      hospital: "BRB Hospital Dhaka",
      rating: 5,
      reviews: 1897,
      about: "Prof. Dr. Md. Mofazzel Hossain is an accomplished oncologist with a background in internal medicine, providing comprehensive cancer care.",
      workingHours: "6:00 PM to 9:00 PM (Closed: Tuesday)"
    }
  ];

  return (
    <div className="doctor-finder-page">
      {/* Header Section */}
      <header className="header">
        <div className="header-content">
          <h1>Find the <span className="highlight">Right Doctor</span>,</h1>
          <h1>Right Now: <span className="highlight">Expert Care</span></h1>
          <h1>at Your Fingertips</h1>
          <div className="search-form">
            <form>
              <div className="search-input">
                <img src={searchIcon} alt="Search" />
                <input 
                  type="text" 
                  placeholder="Search for Doctors by Name, Cancer types, Location"
                />
              </div>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content Section */}
      <section className="main-content">
        <div className="content-container">
          {/* Filter Section */}
          <aside className="filter-section">
            <div className="filter-header">
              <button className="clear-filters">Clear filters</button>
            </div>
            <div className="filters">
              <FilterGroup 
                title="Location" 
                options={[
                  { label: "Inside Dhaka", count: 100 },
                  { label: "Outside Dhaka", count: 20 }
                ]}
              />
              <FilterGroup 
                title="Cancer Type" 
                options={[
                  { label: "Breast Cancer", count: 200 },
                  { label: "Blood Cancer", count: 20 },
                  { label: "Lung Cancer", count: 50 },
                  { label: "Skin Cancer", count: 5 },
                  { label: "Colorectal Cancer", count: 15 },
                  { label: "Prostate Cancer", count: 10 }
                ]}
              />
              <FilterGroup 
                title="Ratings" 
                options={[
                  { label: "★★★★★", count: null },
                  { label: "★★★★☆", count: null },
                  { label: "★★★☆☆", count: null },
                  { label: "★★☆☆☆", count: null },
                  { label: "★☆☆☆☆", count: null }
                ]}
              />
            </div>
          </aside>

          {/* Doctors Grid Section */}
          <main className="doctors-section">
            <div className="doctors-header">
              <p>Found 376 results</p>
              <div className="sort-by">
                <label>Sort by:</label>
                <select name="rating">
                  <option value="low-high">Rating: Low to High</option>
                  <option value="high-low">Rating: High to Low</option>
                </select>
              </div>
            </div>
            <div className="doctors-grid">
              {doctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  {...doctor}
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
const FilterGroup = ({ title, options }) => (
  <div className="filter-group">
    <h3>{title}</h3>
    {options.map((option, index) => (
      <div key={index} className="filter-option">
        <input type="checkbox" id={`${title}-${index}`} />
        <label htmlFor={`${title}-${index}`}>
          {option.label}
          {option.count !== null && <span>({option.count})</span>}
        </label>
      </div>
    ))}
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

