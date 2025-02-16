import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./CSS/QuizAssessment.css";
import Footer from "./Footer";

const QuizAssessment = () => {
  const { cancerType } = useParams();
  const navigate = useNavigate();

  const [user_id, setUserId] = useState(null); // State to store user ID
  const [activeCategory, setActiveCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [allQuestions, setAllQuestions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [finalResult, setFinalResult] = useState(null); // Store final result
  const [isResultModalOpen, setIsResultModalOpen] = useState(false); // Toggle modal

  // Fetch user ID from the API
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get("http://localhost:5002/api/get-userid", {
          withCredentials: true, // Ensure cookies are sent with the request
        });
        setUserId(response.data.user_id); // Set the user ID from the response
      } catch (error) {
        console.error("Error fetching user ID:", error);
        setError("Failed to fetch user ID");
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5002/api/categories");
        setCategories(response.data);
        if (response.data.length > 0) {
          setActiveCategory(response.data[0]._id);
        }
      } catch (err) {
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchAllQuestions = async () => {
      if (!cancerType || categories.length === 0) return;

      try {
        const allQuestionsPromises = categories.map((category) =>
          axios.get("http://localhost:5002/api/questions", {
            params: { cancerId: cancerType, categoryId: category._id },
          })
        );

        const responses = await Promise.all(allQuestionsPromises);
        const allQuestionsData = responses.flatMap((response) => response.data);
        setAllQuestions(allQuestionsData);
      } catch (err) {
        setError("Failed to load all questions");
      }
    };

    fetchAllQuestions();
  }, [cancerType, categories]);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!activeCategory || !cancerType) return;

      try {
        const response = await axios.get("http://localhost:5002/api/questions", {
          params: { cancerId: cancerType, categoryId: activeCategory },
        });
        setQuestions(response.data);
      } catch (err) {
        setError("Failed to load questions");
      }
    };

    fetchQuestions();
  }, [cancerType, activeCategory]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleAnswerSelect = (question_id, answer_id) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [question_id]: answer_id,
    }));
  };

  const areAllQuestionsAnswered = () => {
    return allQuestions.every((question) => selectedAnswers[question._id]);
  };

  const handleSubmit = async () => {
    if (!areAllQuestionsAnswered()) {
      setIsModalOpen(true);
      return;
    }

    const responses = Object.entries(selectedAnswers).map(([question_id, answer_id]) => ({
      question_id,
      answer_id,
    }));

    try {
      // Submit user responses
      await axios.post("http://localhost:5002/api/user-responses", {
        user_id,
        cancer_id: cancerType,
        responses,
      });

      // Fetch final verdict (including total score and verdict text)
      const resultResponse = await axios.get("http://localhost:5002/api/user-result", {
        params: { user_id, cancer_id: cancerType },
      });

      setFinalResult(resultResponse.data);
      setIsResultModalOpen(true); // Open result modal
    } catch (error) {
      console.error("Error submitting responses:", error);
      alert("Failed to submit responses.");
    }
  };

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="quiz-container">
      <section className="hero">
        <h1>
          <span>Understand Your Risk</span>
        </h1>
        <h2>Take the Cancer Assessment Quiz Today</h2>
      </section>

      <div className="assessment-content">
        <h2 className="section-title">Breast Cancer Assessment</h2>

        <button className="close-button" onClick={() => navigate("/quiz")}>
          ×
        </button>

        <nav className="category-nav">
          {categories.map((category) => (
            <button
              key={category._id}
              className={`category-btn ${activeCategory === category._id ? "active" : ""}`}
              onClick={() => handleCategoryChange(category._id)}
            >
              {category.name}
            </button>
          ))}
        </nav>

        <div className="assessment-layout">
          <div className="question-section">
            <div className="questions-container">
              {questions.length > 0 ? (
                questions.map((question) => (
                  <div key={question._id} className="question-card">
                    <div className="question-box">
                      <h3>{question.question_text}</h3>
                    </div>
                    <div className="answers">
                      {question.answers.map((answer) => (
                        <button
                          key={answer._id}
                          className={`answer-btn ${selectedAnswers[question._id] === answer._id ? "selected" : ""}`}
                          onClick={() => handleAnswerSelect(question._id, answer._id)}
                        >
                          {answer.answer_text}
                        </button>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p>No questions available for this category.</p>
              )}
            </div>
          </div>

          {/* Info Section */}
          <div className="info-section">
            <div className="info-card">
              <h3>How the assessment works</h3>
              <p>
                We'll ask you questions about things that may affect your risk of a specific type of cancer.
              </p>
              <p>
                The calculation of your risk is based on studies of people age 40 and over who have no previous history of cancer. But everyone can benefit by learning more about their risk and receiving a personal health action plan.
              </p>
              <p>
                Save, print or email your results to refer to later, or share them with your healthcare provider.
              </p>
              <p>
                Your risk can change over time. We suggest coming back every so often to see whether there has been a change.
              </p>
            </div>
            <div className="info-card2">
              <h3>Disclaimer</h3>
              <p>This assessment is not intended to diagnose cancer.</p>
            </div>
          </div>
        </div>

        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Incomplete Assessment</h2>
            <p>Please answer all questions from all categories before submitting.</p>
            <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
              OK
            </button>
          </div>
        </div>
      )}

      {/* Modal for showing the result */}
      {isResultModalOpen && finalResult && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Your Cancer Risk Assessment Result</h2>
            <p><strong>Total Score:</strong> {finalResult.totalScore}</p>
            <p><strong>Verdict:</strong> {finalResult.verdict}</p>
            <button className="modal-close-btn" onClick={() => setIsResultModalOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default QuizAssessment;