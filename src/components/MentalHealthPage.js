import React, { useState } from "react";
import axios from "axios";
import "./CSS/MentalHealthPage.css";
import Footer from "./Footer";

const MentalHealthPage = () => {
    const [service, setService] = useState("");
    const [location, setLocation] = useState("");
    const [doctors, setDoctors] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get("http://localhost:5000/api/doctors", {
                params: { service, location },
            });
            console.log("Fetched doctors:", response.data);
            setDoctors(response.data);
        } catch (error) {
            console.error("Error fetching doctors:", error);
        }
    };

    return (
        <div className="mh-mental-health-container">
            <section className="mh-hero">
                <div className="mh-hero-content">
                    <h1>
                        At the heart of <br />
                        <span className="mh-highlight">children & young people's</span> <br />
                        mental health
                    </h1>
                    <button className="mh-find-therapist-button">Find a Therapist</button>
                </div>
                <div className="mh-hero-search">
                    <h3>Find the right counsellor or therapist for you</h3>
                    <form onSubmit={handleSearch}>
                        <select
                            className="mh-input-select"
                            value={service}
                            onChange={(e) => setService(e.target.value)}
                        >
                            <option value="">Select service</option>
                            <option value="Couples Counselling">Couples Counselling</option>
                            <option value="Psychodynamic Therapy">Psychodynamic Therapy</option>
                            <option value="Career Counseling">Career Counseling</option>
                            <option value="Cognitive Behavioral Therapy">Cognitive Behavioral Therapy</option>
                            <option value="Mental Health Counseling">Mental Health Counseling</option>
                            <option value="Group Therapy">Group Therapy</option>
                            <option value="Family Therapy">Family Therapy</option>
                            <option value="Grief Counseling">Grief Counseling</option>
                            <option value="Abuse Counseling">Abuse Counseling</option>
                            <option value="Behavioral Therapy">Behavioral Therapy</option>
                        </select>
                        <select
                            className="mh-input-select"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        >
                            <option value="">Select location</option>
                            <option value="Gulshan">Gulshan</option>
                            <option value="Banani">Banani</option>
                            <option value="Motijheel">Motijheel</option>
                            <option value="Mirpur">Mirpur</option>
                            <option value="Shahbag">Shahbag</option>
                        </select>
                        <button className="mh-search-button" type="submit">
                            Search Counsellor
                        </button>
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

            <section className="mh-experts">
                <h2>Expert Members</h2>
                <div className="mh-experts-list">
                    {doctors.map((doctor) => (
                        <div className="mh-expert-card" key={doctor._id}>
                            <img
                                src={`http://localhost:5000${doctor.imagePath}` || "default-image.jpg"}
                                alt={doctor.fullName}
                            />
                            <h3>{doctor.fullName}</h3>
                            <p>{doctor.specialization}</p>
                        </div>
                    ))}
                </div>
                {doctors.length === 0 && (
                    <p className="mh-no-results">No therapists match your criteria.</p>
                )}
            </section>
             <Footer />
        </div>
    );
};

export default MentalHealthPage;
