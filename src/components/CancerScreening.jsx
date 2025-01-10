import React, { useState } from 'react';
import "./CSS/CancerScreening.css";
import Footer from "./Footer";
import searchIcon from "./assets/search.png";

const CancerScreening = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [searchInput, setSearchInput] = useState(""); // State for search input

  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

 
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  

   // Handle search input change
   const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const screeningData = [
    {
      type: "Breast Cancer",
      description: "Mammograms are the best way to catch breast cancer early – and only take about 15 minutes to complete.",
      details: [
        "A screening mammogram is an X-ray of your breasts. It can detect breast cancer before symptoms appear or you can feel a lump through the skin.",
        "A 2D mammogram takes pictures of each breast from the side and front to create a two-dimensional image.",
        "A 3D mammogram (also called digital tomosynthesis) takes multiple pictures of each breast from many angles, which can show each layer of tissue in a three-dimensional picture. Those at high risk for breast cancer may also receive supplemental breast screenings such as MRI and breast ultrasound."
      ],
      id: "breast"
    },
    {
      type: "Cervical Cancer",
      description: "Cervical cancer is preventable. Spot infection with routine screening starting at age 21.",
      details: [
        "The main screening test for cervical cancer is the Pap test (or Pap smear). This test looks for precancers, which are cell changes on the cervix that might become cervical cancer if they are not treated appropriately.",
        "The HPV test looks for the virus (human papillomavirus) that can cause these cell changes."
      ],
      id: "cervical"
    },
    {
      type: "Lung Cancer",
      description: "If you have a history of daily smoking, this painless, quick screening can help keep you safe.",
      details: [
        "The only recommended screening test for lung cancer is low-dose computed tomography (also called a low-dose CT scan, or LDCT). During an LDCT scan, you lie on a table and an X-ray machine uses a low dose of radiation to make detailed images of your lungs."
      ],
      id: "lung"
    }
  ];

 // Filter the screenings based on the search input
 const filteredScreenings = screeningData.filter(screening =>
    screening.type.toLowerCase().includes(searchInput.toLowerCase())
  );

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
        {filteredScreenings.map((screening) => (
          <div className="screening-card" key={screening.id}>
            <h2>{screening.type}</h2>
            <p>{screening.description}</p>
            <button
              className="toggle-btn"
              onClick={() => toggleSection(screening.id)}
            >
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
        ))}
      </div>
      {/* Pagination */}
      <div className="paginationn">
              <button className="page-btn prevv">←</button>
              <button className="page-btn activee">1</button>
              <button className="page-btnn">2</button>
              <button className="page-btnn">3</button>
              <span>...</span>
              <button className="page-btn">8</button>
              <button className="page-btn nextt">→</button>
            </div>
           
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
