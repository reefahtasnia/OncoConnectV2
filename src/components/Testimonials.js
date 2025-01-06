"use client";

import React, { useState } from "react";
import { ChevronUp, ChevronDown, ArrowRight } from 'lucide-react';
import "./CSS/Testimonial.css";

const Testimonial = ({ name, condition, age, quote, imageClass }) => (
  <div className="onco-testimonial-card">
    <div className="onco-testimonial-details">
      <div className={`onco-testimonial-image ${imageClass}`} />
      <div className="onco-testimonial-text-box">
        <p className="onco-testimonial-text">{quote}</p>
        <div className="onco-testimonial-author-section">
          <span className="onco-testimonial-author">{name}</span>
          <div className="onco-testimonial-author-details">
            <span className="onco-testimonial-author-type">{condition}</span>
            <span className="onco-testimonial-author-age">
              {" "}({age} years old)
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Sofia Martinez",
      condition: "Breast Cancer Patient",
      age: 28,
      quote:
        "Being diagnosed with cancer at a young age was overwhelming, but OncoConnect made it easier. The AI report analyzer simplified my test results, and the symptom tracker helped me see my progress. It gave me control over a situation that felt uncontrollable.",
      imageClass: "onco-primary-image",
    },
    {
      name: "John Gardner",
      condition: "Colon Cancer Patient",
      age: 67,
      quote:
        "I'm not very tech-savvy, but OncoConnect was so easy to use. The platform helped me stay connected with my doctor, and the educational articles taught me so much about my treatment options. It's been a blessing during this difficult time.",
      imageClass: "onco-secondary-image",
    },
    {
      name: "Emily Chen",
      condition: "Leukemia",
      age: 8,
      quote:
        "OncoConnect helped me understand what's happening to my body in a way that didn't scare me. The kid-friendly interface made me feel like I was playing a game while getting better. My doctor even used it to show me how I was improving!",
      imageClass: "onco-tertiary-image",
    },
    {
      name: "Daniel Evans",
      condition: "Lymphoma Survivor",
      age: 45,
      quote:
        "The scan results tracking tools were a game-changer for me. Being able to see my progress visually made a huge difference. The reminders helped me stay on top of my medication schedule, and the progress charts helped me understand my recovery journey.",
      imageClass: "onco-quaternary-image",
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 >= testimonials.length ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="onco-testimonial-section">
      <div className="onco-testimonial-container">
        <h2 className="onco-testimonial-title">What our great customers say</h2>
        <div className="onco-testimonial-carousel">
          <button
            className="onco-nav-button onco-nav-prev"
            onClick={prevTestimonial}
            aria-label="Previous testimonial"
          >
            <ChevronUp className="w-6 h-6" />
          </button>
          
          <div className="onco-testimonial-viewport">
            <div className="onco-testimonial-slides">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`onco-testimonial-slide ${
                    currentIndex === index ? "active" : ""
                  }`}
                >
                  <Testimonial {...testimonial} />
                </div>
              ))}
            </div>
          </div>

          <button
            className="onco-nav-button onco-nav-next"
            onClick={nextTestimonial}
            aria-label="Next testimonial"
          >
            <ChevronDown className="w-6 h-6" />
          </button>
        </div>
        
        <div className="onco-testimonial-read-more">
          <button className="onco-read-more-button">
            Read more stories
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

