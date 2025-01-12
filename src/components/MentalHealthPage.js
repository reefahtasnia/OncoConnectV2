import React from "react";
import "./CSS/MentalHealthPage.css";
import Expert1 from "./assets/team-1.jpg";
import Expert2 from "./assets/team-2.png";
import Expert3 from "./assets/team-3.jpg";
import Expert4 from "./assets/team-4.jpg";
import Footer from "./Footer";

const MentalHealthPage = () => {
  return (
    <div className="mh-mental-health-container">
      {/* Header */}
      

      {/* Hero Section */}
      <section className="mh-hero">
        <div className="mh-hero-content">
          <h1>At the heart of <span className="mh-highlight">children & young people's</span> mental health</h1>
          <button className="mh-find-therapist-button">Find a Therapist</button>
        </div>
        <div className="mh-hero-search">
          <h3>Find the right counsellor or therapist for you</h3>
          <form>
            <select className="mh-input-select">
              <option>select service</option>
            </select>
            <select className="mh-input-select">
              <option>select location</option>
            </select>
            <button className="mh-search-button">Search Counsellor</button>
          </form>
        </div>
      </section>

      {/* Services Section */}
      <section className="mh-services">
        <div className="mh-service-card">
          <h3>Online Counseling</h3>
          <p>
            Many therapists offer counselling online or by telephone, check
            their profile to learn more or use our online and telephone search.
          </p>
          <button>Find therapist →</button>
        </div>
        <div className="mh-service-card">
          <h3>Advice By Phone</h3>
          <p>
            If you are in trouble and want our immediate help, simply pick up
            the phone and call us anytime you need help.
          </p>
          <button>Find therapist →</button>
        </div>
        <div className="mh-service-card">
          <h3>Direct Counseling</h3>
          <p>
            Psychological counseling, direct psychotherapy with leading
            psychologists at Medcaline.
          </p>
          <button>Find therapist →</button>
        </div>
      </section>

      {/* Expert Members Section */}
      <section className="mh-experts">
        <h2>Expert Members</h2>
        <div className="mh-experts-list">
          <div className="mh-expert-card">
            <img src={Expert1} alt="Philinia D. Darwin" />
            <h3>Philinia D. Darwin</h3>
            <p>Therapy Expert</p>
          </div>
          <div className="mh-expert-card">
            <img src={Expert2} alt="Hekim D. Kwanaa" />
            <h3>Hekim D. Kwanaa</h3>
            <p>Therapy Expert</p>
          </div>
          <div className="mh-expert-card">
            <img src={Expert3} alt="Kate Brown" />
            <h3>Kate Brown</h3>
            <p>Therapy Expert</p>
          </div>
          <div className="mh-expert-card">
            <img src={Expert4} alt="Roman Sould" />
            <h3>Roman Sould</h3>
            <p>Therapy Expert</p>
          </div>
        </div>
        <button className="mh-view-all-button">View All Counsellors</button>
      </section>

     

      {/* Footer */}
       <Footer />
    </div>
  );
};

export default MentalHealthPage;
