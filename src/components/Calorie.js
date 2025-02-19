import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import Footer from "./Footer";
import "./CSS/calorie.css";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const API_BASE_URL = "http://localhost:5000";

const mealPlatterOptions = [
    { meal: "Breakfast", name: "Oatmeal with Fruits", calories: 250 },
    { meal: "Breakfast", name: "Scrambled Eggs with Toast", calories: 300 },
    { meal: "Breakfast", name: "Pancakes with Honey", calories: 350 },
    { meal: "Breakfast", name: "Avocado Toast", calories: 280 },
    { meal: "Breakfast", name: "Smoothie Bowl", calories: 320 },
    { meal: "Mid-Meal", name: "Greek Yogurt with Nuts", calories: 150 },
    { meal: "Mid-Meal", name: "Banana & Peanut Butter", calories: 180 },
    { meal: "Mid-Meal", name: "Protein Shake", calories: 200 },
    { meal: "Mid-Meal", name: "Handful of Almonds", calories: 170 },
    { meal: "Mid-Meal", name: "Granola Bar", calories: 190 },
    { meal: "Lunch", name: "Grilled Chicken with Rice", calories: 600 },
    { meal: "Lunch", name: "Vegetable Stir-Fry with Tofu", calories: 550 },
    { meal: "Lunch", name: "Pasta with Tomato Sauce", calories: 620 },
    { meal: "Lunch", name: "Quinoa Salad with Beans", calories: 500 },
    { meal: "Lunch", name: "Fish Curry with Brown Rice", calories: 650 },
    { meal: "Evening", name: "Green Tea with Honey", calories: 50 },
    { meal: "Evening", name: "Soybean Chaap", calories: 200 },
    { meal: "Evening", name: "Fruit Salad", calories: 180 },
    { meal: "Evening", name: "Peanut Butter Toast", calories: 220 },
    { meal: "Evening", name: "Boiled Eggs", calories: 140 },
    { meal: "Dinner", name: "Grilled Salmon with Vegetables", calories: 500 },
    { meal: "Dinner", name: "Lentil Soup with Bread", calories: 480 },
    { meal: "Dinner", name: "Chicken Stew with Rice", calories: 520 },
    { meal: "Dinner", name: "Vegetable Curry with Roti", calories: 450 },
    { meal: "Dinner", name: "Baked Sweet Potato & Beans", calories: 470 },
];

const CalorieTracker = () => {
  const [date, setDate] = useState(new Date());
  const [meals, setMeals] = useState({
    Breakfast: [],
    "Mid-Meal": [],
    Lunch: [],
    Evening: [],
    Dinner: [],
  });

  const [totals, setTotals] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/get-userid`, {
          withCredentials: true,
        });
        setUserId(response.data.user_id);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, []);

  const handleDeleteMeal = (meal, index) => {
    setMeals((prevMeals) => {
      const updatedMeals = { ...prevMeals };
      updatedMeals[meal].splice(index, 1);
      return updatedMeals;
    });
  };
  const handleSelectMealPlatter = (platter) => {
    setMeals((prevMeals) => {
      const updatedMeals = {
        ...prevMeals,
        [selectedMeal]: [...prevMeals[selectedMeal], platter],
      };
      calculateTotalCalories(updatedMeals);
      return updatedMeals;
    });
    setIsModalOpen(false);
  };
  const handleAddMealPlatter = (meal) => {
    setSelectedMeal(meal);
    setIsModalOpen(true);
  };

  const submitNutritionData = async () => {
    try {
      // Adjust date to ensure no timezone shift
      const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      const formattedDate = localDate.toISOString().split("T")[0]; // Ensures YYYY-MM-DD format
  
      await axios.post(`${API_BASE_URL}/api/nutrition`, {
        user_id: userId,
        date: formattedDate,  // Use the adjusted date
        total_calories: totals,
      });
  
      alert("Nutrition data submitted successfully!");
    } catch (error) {
      console.error("Error submitting nutrition data:", error);
      alert("Failed to submit nutrition data.");
    }
  };
  
  const calculateTotalCalories = (meals) => {
    let total = 0;
    Object.values(meals).forEach((meal) => {
      meal.forEach((item) => {
        total += item.calories;
      });
    });
    setTotals(total);
  };
  const changeDate = (days) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    setDate(newDate);
  };

  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
 // Pie Chart Data
 const chartData = {
  labels: Object.keys(meals),
  datasets: [
    {
      data: Object.keys(meals).map((meal) =>
        meals[meal].reduce((total, item) => total + item.calories, 0)
      ),
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
    },
  ],
};


  return (
    <div className="calorie-tracker">
      <header className="caheader">
        <h2>Your Food Diary For:</h2>
        <div className="date-picker">
          <button className="nav-button" onClick={() => changeDate(-1)}>
            {"<"}
          </button>
          <span>{formattedDate}</span>
          <button className="nav-button" onClick={() => changeDate(1)}>
            {">"}
          </button>
        </div>
      </header>

      {Object.keys(meals).map((meal) => (
        <section className="meal-section" key={meal}>
          <h3>{meal}</h3>
          <table>
            <thead>
              <tr>
                <th>Meal Platter</th>
                <th>Calories</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {meals[meal].length > 0 ? (
                meals[meal].map((item, index) => (
                  <tr key={index}>
                    <td>{item.name} ({item.time})</td>
                    <td>{item.calories}</td>
                    <td>
                      <button
                        className="delete-food-btn"
                        onClick={() => handleDeleteMeal(meal, index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No meal added yet.</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="action-buttons">
            <button className="add-food-btn" onClick={() => handleAddMealPlatter(meal)}>
              Add Meal Platter
            </button>
          </div>
        </section>
      ))}
      <footer className="summary">
        <h3>Total Calories: {totals}</h3>
        <div className="pie-chart">
          <Pie data={chartData} />
        </div>
      </footer>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Select Meal Platter for {selectedMeal}</h3>
            <input
              type="text"
              placeholder="Search meal platter..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <ul className="food-options">
              {mealPlatterOptions
                .filter(
                  (platter) =>
                    platter.meal === selectedMeal &&
                    platter.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((platter, index) => (
                  <li key={index} onClick={() => handleSelectMealPlatter(platter)}>
                    {platter.name} ({platter.time}) - {platter.calories} calories
                  </li>
                ))}
            </ul>
            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
      <div className="submit-section">
        <button className="submit-btn" onClick={submitNutritionData}>
          Submit Nutrition Data
        </button>
      </div>
    
    </div>
  );
};

export default CalorieTracker;
