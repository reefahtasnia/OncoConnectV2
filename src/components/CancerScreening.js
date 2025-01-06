import React from "react";
import "./CSS/CancerScreening.css";

const CancerScreening = () => {
  const screenings = [
    {
      title: "Breast Cancer",
      description:
        "Mammograms are the best way to catch breast cancer early – and only take about 15 minutes to complete.",
    },
    {
      title: "Cervical Cancer",
      description:
        "Cervical cancer is preventable. Spot infection with routine screening starting at age 21.",
    },
    {
      title: "Lung Cancer",
      description:
        "If you have a history of daily smoking, this painless, quick screening can help keep you safe.",
    },
  ];

  return (
    <div className="screening-container">
      <header className="screening-header">
        <h1>Cancer Screening</h1>
        <p>Screen Today for a Healthier Tomorrow</p>
      </header>
      <div className="screening-cards">
        {screenings.map((screening, index) => (
          <div key={index} className="screening-card">
            <h2>{screening.title}</h2>
            <p>{screening.description}</p>
            <button>Show More +</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CancerScreening;