import React from 'react';
import './CSS/animated-hero.css';
import hand1 from './assets/hand1.png';
import hand2 from './assets/hand2.png';
import blurTop from './assets/Vector 9.png';
import blurBottom from './assets/Vector 8.png';

const AnimatedHero = () => {
  return (
    <div className="new-hero-section">
      <img src={blurTop} alt="" className="blur-vector blur-top" />
      <img src={blurBottom} alt="" className="blur-vector blur-bottom" />
      
      <img src={hand1} alt="" className="hero-hand left-hand" />

      <div className="hero-content">
        <h1 className="hero-title">
          <span className="title-line">Understand.</span>
          <span className="title-line">Connect.</span>
          <span className="title-line">Heal.</span>
        </h1>
        <p className="hero-subtitle">Your guide to cancer care starts here</p>
        <button className="hero-button">Get Started</button>
      </div>

      <img src={hand2} alt="" className="hero-hand right-hand" />
    </div>
  );
};

export default AnimatedHero;

