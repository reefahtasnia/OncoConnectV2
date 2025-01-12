import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './CSS/QuizAssessment.css';
import Footer from './Footer';

const QuizAssessment = () => {
  const { cancerType } = useParams();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('Personal');
  const [questions, setQuestions] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const handleFinish = () => {
    setShowResult(true);
  };

  const categories = [
    'Personal',
    'Family',
    'Genetics',
    'Screening',
    'Healthy Living',
    'Reproductive Health'
  ];

  // Sample questions data - In a real app, this would come from an API
  const questionsByCategory = {
    
        Personal: [
          {
            id: 1,
            question: "Have you ever been diagnosed with cancer?",
            options: ["Yes", "No"],
            type: "radio"
          },
          {
            id: 2,
            question: "What was the sex assigned to you at birth?",
            options: ["Male", "Female"],
            type: "radio"
          },
          {
            id: 3,
            question: "How old are you?",
            type: "number"
          },
          {
            id: 9,
            question: "Do you currently smoke?",
            options: ["Yes", "No"],
            type: "radio"
          },
          {
            id: 10,
            question: "How many hours do you sleep on average per night?",
            type: "number"
          },
          {
            id: 11,
            question: "Do you have any chronic illnesses?",
            options: ["Yes", "No"],
            type: "radio"
          },
          {
            id: 12,
            question: "How often do you exercise per week?",
            type: "number"
          },
          {
            id: 13,
            question: "Do you consume alcohol regularly?",
            options: ["Yes", "No"],
            type: "radio"
          },
          {
            id: 14,
            question: "What is your height in centimeters?",
            type: "number"
          },
          {
            id: 15,
            question: "What is your weight in kilograms?",
            type: "number"
          }
        ],
        Family: [
          {
            id: 4,
            question: "Has anyone in your family been diagnosed with cancer?",
            options: ["Yes", "No"],
            type: "radio"
          },
          {
            id: 16,
            question: "If yes, what type of cancer was it?",
            type: "text"
          },
          {
            id: 17,
            question: "Has any family member had a heart disease diagnosis?",
            options: ["Yes", "No"],
            type: "radio"
          },
          {
            id: 18,
            question: "How many of your immediate family members have diabetes?",
            type: "number"
          },
          {
            id: 19,
            question: "Is there a history of genetic disorders in your family?",
            options: ["Yes", "No"],
            type: "radio"
          },
          {
            id: 20,
            question: "Do any of your siblings have chronic illnesses?",
            options: ["Yes", "No"],
            type: "radio"
          },
          {
            id: 21,
            question: "Has anyone in your family undergone genetic testing?",
            options: ["Yes", "No"],
            type: "radio"
          },
          {
            id: 22,
            question: "What is your family's history with mental health issues?",
            type: "text"
          }
        ],
        Genetics: [
          {
            id: 5,
            question: "Have you ever had genetic testing for cancer risk?",
            options: ["Yes", "No", "I'm not sure"],
            type: "radio"
          },
          {
            id: 23,
            question: "Were you found to have any genetic markers for diseases?",
            options: ["Yes", "No", "I don't know"],
            type: "radio"
          },
          {
            id: 24,
            question: "Would you consider genetic counseling?",
            options: ["Yes", "No"],
            type: "radio"
          },
          {
            id: 25,
            question: "Do you have any known genetic conditions?",
            options: ["Yes", "No"],
            type: "radio"
          },
          {
            id: 26,
            question: "Have you been tested for BRCA gene mutations?",
            options: ["Yes", "No"],
            type: "radio"
          },
          {
            id: 27,
            question: "Would you like more information on genetic testing options?",
            options: ["Yes", "No"],
            type: "radio"
          },
          {
            id: 28,
            question: "Do you know your genetic risk for cardiovascular diseases?",
            options: ["Yes", "No"],
            type: "radio"
          },
          {
            id: 29,
            question: "Have you ever participated in a genetic research study?",
            options: ["Yes", "No"],
            type: "radio"
          }
        ],
        Screening: [
          {
            id: 6,
            question: "When was your last cancer screening?",
            type: "date"
          },
          {
            id: 30,
            question: "What type of screening did you last undergo?",
            options: ["Mammogram", "Colonoscopy", "Pap smear", "Other"],
            type: "radio"
          },
          {
            id: 31,
            question: "How often do you go for health check-ups?",
            type: "number"
          },
          {
            id: 32,
            question: "Have you ever had a full body scan?",
            options: ["Yes", "No"],
            type: "radio"
          },
          {
            id: 33,
            question: "Do you perform regular self-examinations (e.g., breast, skin)?",
            options: ["Yes", "No"],
            type: "radio"
          },
          {
            id: 34,
            question: "Are you up to date with your vaccination schedule?",
            options: ["Yes", "No"],
            type: "radio"
          },
          {
            id: 35,
            question: "Have you ever had a bone density test?",
            options: ["Yes", "No"],
            type: "radio"
          },
          {
            id: 36,
            question: "Do you have a history of high cholesterol levels?",
            options: ["Yes", "No"],
            type: "radio"
          }
        ],
        "Healthy Living": [
          {
            id: 7,
            question: "How many servings of fruits and vegetables do you eat daily?",
            type: "number"
          },
          {
            id: 37,
            question: "How many glasses of water do you drink daily?",
            type: "number"
          },
          {
            id: 38,
            question: "Do you regularly engage in physical exercise?",
            options: ["Yes", "No"],
            type: "radio"
          },
          {
            id: 39,
            question: "How many hours do you spend sitting each day?",
            type: "number"
          },
          {
            id: 40,
            question: "Do you avoid processed foods?",
            options: ["Yes", "No"],
            type: "radio"
          },
          {
            id: 41,
            question: "How often do you consume fast food?",
            type: "number"
          },
          {
            id: 42,
            question: "Do you have any dietary restrictions?",
            options: ["Yes", "No"],
            type: "radio"
          },
          {
            id: 43,
            question: "How many hours do you spend outdoors daily?",
            type: "number"
          }
        ],
        "Reproductive Health": [
          {
            id: 8,
            question: "Have you ever been pregnant?",
            options: ["Yes", "No"],
            type: "radio"
          },
          {
            id: 44,
            question: "Have you experienced any fertility issues?",
            options: ["Yes", "No"],
            type: "radio"
          },
          {
            id: 45,
            question: "Are you currently using any form of contraception?",
            options: ["Yes", "No"],
            type: "radio"
          },
          {
            id: 46,
            question: "Have you ever had a miscarriage?",
            options: ["Yes", "No"],
            type: "radio"
          },
          {
            id: 47,
            question: "How many children do you have?",
            type: "number"
          },
          {
            id: 48,
            question: "Have you ever undergone reproductive health screening?",
            options: ["Yes", "No"],
            type: "radio"
          },
          {
            id: 49,
            question: "Do you have any known reproductive health conditions?",
            options: ["Yes", "No"],
            type: "radio"
          },
          {
            id: 50,
            question: "Have you ever taken hormone therapy?",
            options: ["Yes", "No"],
            type: "radio"
          }
        ]
      
      
  };

  useEffect(() => {
    setQuestions(questionsByCategory[activeCategory] || []);
  }, [activeCategory]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleClose = () => {
    navigate('/quiz'); // Navigate back to the quiz selection page
  };

  

  return (
    <div className="quiz-container">
      {/* Hero Section */}
      <section className="hero">
        <h1>
          <spanhh>Understand Your Risk</spanhh>
        </h1>
        <h2>Take the Cancer Assessment Quiz Today</h2>
      </section>

      <div className="assessment-content">
        <h2 className="section-title">{cancerType} Cancer Assessment</h2>
        
        <button className="close-button" onClick={handleClose}>×</button>

        <nav className="category-nav">
          {categories.map((category, index) => (
            <button
              key={category}
              className={`category-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              <div className={`progress-dot ${index <= categories.indexOf(activeCategory) ? 'completed' : ''}`} />
              {category}
            </button>
          ))}
        </nav>

        <div className="assessment-layout">
          <div className="questions-section">
            <div className="questions-container">
              {questions.map((q, index) => (
                <div key={q.id} className="question-card">
                <div className="question-box">
                  <h3>{index + 1}. {q.question}</h3>
                </div>
                <div className="answer-box">
                  {q.type === 'radio' ? (
                    <div className="options">
                      {q.options.filter((option, index, self) => 
                        self.indexOf(option) === index
                      ).map((option, i) => (
                        <label key={i} className="option">
                          <input
                            type="radio"
                            name={`question-${q.id}`}
                            value={option}
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  ) : (
                    <input
                      type={q.type}
                      className="text-input"
                      placeholder="Enter your answer"
                    />
                  )}
                </div>
                </div>
              ))}
            </div>

            {activeCategory === 'Reproductive Health' && questions.length > 0 && (
              <button className="finish-button" onClick={handleFinish}>
                Finish Quiz
              </button>
            )}
          </div>
          {showResult && (
  <div className="result-modal">
    <div className="result-content">
      <h2>Quiz Result</h2>
      <p><span className='highlightcolor'>YOUR RISK: LOWER THAN AVERAGE</span></p>
      <p>Based on your responses, your likelihood of developing breast cancer is lower than the average woman. While this is reassuring, it's important to remember that maintaining a healthy lifestyle and regular check-ups can further reduce your risk. Stay proactive about your health and keep making positive changes to support your overall well-being. For more tips and resources, continue exploring ways to stay healthy and informed.</p>
      <button onClick={() => setShowResult(false)}>Close</button>
    </div>
  </div>
)}


          <div className="info-section">
            <div className="info-card">
              <h3>How the assessment works</h3>
              <p>We'll ask you questions about things that may affect your risk of a specific type of cancer. </p>
              <p>The calculation of your risk is based on studies of people age 40 and over who have no previous history of cancer. But everyone can benefit by learning more about their risk and receiving a personal health action plan.</p>
              <p>Save, print or email your results to refer to later, or share them with your healthcare provider.</p>
              <p>Your risk can change over time. We suggest coming back every so often to see whether there has been a change.</p>
            </div>
            <div className="info-card2">
              <h3>Disclaimer</h3>
              <p>This assessment is not intended to diagnose cancer.</p>
            </div>
          </div>
        </div>
        
      </div>
       
      <Footer />
    </div>
    
  );
};



export default QuizAssessment;


