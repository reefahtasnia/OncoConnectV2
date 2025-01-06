import React, { useEffect } from "react";
import "./CSS/style.css";
import Navbar from "./Nav";
import Footer from "./Footer";
import Testimonials from "./Testimonials.js";
import AnimatedHero from "./animated-hero";
import NewsSection from "./newsSection";

// Import images for services
import quizIcon from "./assets/quiz 1.png";
import financialAidIcon from "./assets/Financial aid 1.png";
import mentalHealthIcon from "./assets/mental health1.png";
import doctorPatientIcon from "./assets/doctorpatient1.png";
import aiAnalyzerIcon from "./assets/AIreportanalyzer1.png";

const Home = () => {
  const services = [
    {
      icon: quizIcon,
      title: "Cancer Risk Assessment Quiz",
      description:
        "Learn about your condition with curated articles, videos, and expert advice.",
      link: "#learn-more",
    },
    {
      icon: financialAidIcon,
      title: "Financial Aid",
      description:
        "Simplify complex medical reports with our AI-powered tool that provides clear, actionable insights.",
      link: "#learn-more",
    },
    {
      icon: mentalHealthIcon,
      title: "Mental Health Support",
      description:
        "Track and monitor symptoms easily to share detailed updates with your doctor.",
      link: "#learn-more",
    },
    {
      icon: doctorPatientIcon,
      title: "Doctor-Patient Connection",
      description:
        "Stay connected with your healthcare provider for real-time updates and support.",
      link: "#learn-more",
    },
    {
      icon: aiAnalyzerIcon,
      title: "AI Report Analyzer",
      description:
        "Stay connected with your healthcare provider for real-time updates and support.",
      link: "#learn-more",
    },
  ];

  useEffect(() => {
    const handleParallax = () => {
      requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll("[data-parallax]");

        parallaxElements.forEach((element) => {
          const speed = element.getAttribute("data-parallax");
          const movement = -(scrolled * speed);
          const scale = 1 + scrolled * 0.0005;

          if (element.classList.contains("hero-image")) {
            element.style.transform = `translate3d(0, ${movement}px, 0) scale(${scale})`;
          } else {
            element.style.transform = `translate3d(0, ${movement}px, 0)`;
          }
        });
      });
    };

    window.addEventListener("scroll", handleParallax);
    return () => window.removeEventListener("scroll", handleParallax);
  }, []);

  return (
    <div className="home">
      <Navbar />
      <AnimatedHero />
      <div className="main-content">
        <section className="about-us-section parallax" data-speed="0.05">
          <div className="about-us-container">
            <div className="about-us-content">
              <h2 className="about-us-heading">
                Simplifying Cancer Care with AI, Community Support, and
                Personalized Resources
              </h2>
              <div className="about-us-info">
                <span className="about-us-label">About Us</span>
                <p className="about-us-text">
                  OncoConnect brings patients and doctors together on one
                  platform, making cancer care simpler and more personal. With
                  tools like health trackers, symptom monitors, and expert
                  resources, we help patients stay informed and in control. Our
                  goal is to create a supportive space where every step of the
                  journey is guided with care, understanding, and hope.
                </p>
              </div>
            </div>
            <div className="about-us-image" />
          </div>
        </section>

        <section className="our-services parallax" data-speed="0.03">
          <h2 className="services-title">OUR SERVICES</h2>
          <h3 className="services-subtitle">
            Comprehensive Tools to Support Your Cancer Journey
          </h3>
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <img
                  src={service.icon}
                  alt={`${service.title} icon`}
                  className="service-icon"
                />
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <a className="service-link" href={service.link}>
                  Learn more
                </a>
              </div>
            ))}
          </div>
          <div className="discover-features">
            <a href="#features" className="discover-link">
              Discover All Features
            </a>
          </div>
        </section>
        <section className="testimonial-section parallax" data-speed="0.02">
          <Testimonials />
        </section>
        <NewsSection />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
