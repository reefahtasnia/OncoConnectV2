import React from "react";
import "./CSS/MentalHealthPage.css";
import vectorIcon from "./assets/Vector.png";
import phoneIcon from "./assets/phone.png";
import counsellingIcon from "./assets/counselling.png";
import team1Image from "./assets/team-1.jpg";
import team2Image from "./assets/team-2.png";
import team3Image from "./assets/team-3.jpg";
import team4Image from "./assets/team-4.jpg";




  
    
const MentalHealthPage = () => {
  return (
    <div className="mental-health-page">
      {/* Header Section */}
      <header className="header">
        <div className="header-content">
          <h1 id="first">At the heart of</h1>
          <h1 id="second">children & Young</h1>
          <h1 id="third">people's mental health</h1>
          <br />
          <button type="button" className="find-therapist-btn">
            Find a Therapist
          </button>
          <div className="search-form">
            <p id="find">Find the right counsellor or therapist for you</p>
            <form>
              <select name="service">
                <option value="">Select service</option>
                <option value="online">Online Counseling</option>
                <option value="phone">Phone Counseling</option>
                <option value="direct">Direct Counseling</option>
              </select>
              <select name="location">
                <option value="">Select location</option>
                <option value="ny">New York</option>
                <option value="la">Los Angeles</option>
                <option value="sf">San Francisco</option>
              </select>
              <button type="submit">Search Counsellor</button>
            </form>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section className="services">
        <div className="services-container">
          <ServiceCard
            title="Online Counseling"
            description="Many therapists offer counselling online or by telephone, check their profile to learn more or use our online and telephone search."
            bgColor="#62589F"
            iconBg="#90C088"
            iconSrc={vectorIcon}
          />
          <ServiceCard
            title="Advice By Phone"
            description="If you are in trouble and want our immediate help, simply pick up the phone and call us anytime you need help."
            bgColor="#9588E8"
            iconBg="#FFB17A"
            iconSrc={phoneIcon}
          />
          <ServiceCard
            title="Direct Counseling"
            description="Psychological counseling, direct psychotherapy with leading psychologists at Medcaline."
            bgColor="#62589F"
            iconBg="#FFFFFF"
            iconSrc={counsellingIcon}
          />
        </div>
      </section>

      {/* Therapist Section */}
      <section className="therapist-section">
        <div className="container">
          <div className="section-header">
            <span className="expert-label">EXPERT MEMBER</span>
            <h2>Easing your mind with the best suggested therapeutic care?</h2>
          </div>
       
          
        </div>
      </section>
      <section className="team-section">
        <div className="container">
          <h2>Our Counselors</h2>
          <div className="team-cards">
            <TeamCard
              name="Phillinia D. Darwin"
              role="Therapy Expert"
              imageSrc={team1Image}
            />
            <TeamCard
              name="Delvin D. Renaaa"
              role="Therapy Expert"
              imageSrc={team2Image}
            />
            <TeamCard
              name="Kate Brown"
              role="Therapy Expert"
              imageSrc={team3Image}
            />
            <TeamCard
            name="Roman Smith"
            role="Therapy Expert"
            imageSrc={team4Image}
          />
        </div>
        <button className="view-all-btn">View All Counselors</button>
      </div>
    </section>
    </div>
  );
};

// Service Card Component
const ServiceCard = ({ title, description, bgColor, iconBg, iconSrc }) => (
  <div className="service-card" style={{ backgroundColor: bgColor }}>
    <div className="service-icon" style={{ backgroundColor: iconBg }}>
      <img src={iconSrc} alt={`${title} Icon`} />
    </div>
    <h2>{title}</h2>
    <p>{description}</p>
    <a href="#" className="find-link">
      Find therapist →
    </a>
  </div>
);
const TeamCard = ({ name, role, imageSrc }) => (
    <div className="team-card">
      <img src={imageSrc} alt={name} className="team-image" />
      <h3>{name}</h3>
      <p>{role}</p>
    </div>
  );


export default MentalHealthPage;

