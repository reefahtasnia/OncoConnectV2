import React, { useState } from "react";
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
  
const CalorieTracker = () => {
  const [date, setDate] = useState(new Date());
  const [meals, setMeals] = useState({
    Breakfast: [],
    Lunch: [],
    Dinner: [],
    Snacks: [],
  });

  const [totals, setTotals] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [foodDetails, setFoodDetails] = useState({
    food: "",
    calories: 0,
    servings: 1,
  });

  const foodOptions = [
    { food: "Rice", calories: 204 },
    { food: "Chicken", calories: 165 },
    { food: "Yogurt", calories: 100 },
    { food: "Fruits", calories: 52 },
    { food: "Biscuit", calories: 78 },
    { food: "Noodles", calories: 190 },
    { food: "Potato", calories: 77 },
  ];

  const changeDate = (days) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    setDate(newDate);
  };

  const calculateTotalCalories = (meals) => {
    let total = 0;
    Object.values(meals).forEach((meal) => {
      meal.forEach((item) => {
        total += item.calories * item.servings;
      });
    });
    setTotals(total);
  };

  const handleAddFood = (meal) => {
    setSelectedMeal(meal);
    setIsModalOpen(true);
    setSearchQuery("");
    setFoodDetails({
      food: "",
      calories: 0,
      servings: 1,
    });
  };

  const handleSelectFood = (food) => {
    setFoodDetails((prevDetails) => ({
      ...prevDetails,
      food: food.food,
      calories: food.calories,
    }));
  };

  const handleConfirmAddFood = () => {
    if (selectedMeal && foodDetails.food) {
      setMeals((prevMeals) => {
        const updatedMeals = {
          ...prevMeals,
          [selectedMeal]: [...prevMeals[selectedMeal], foodDetails],
        };
        calculateTotalCalories(updatedMeals);
        return updatedMeals;
      });
      setIsModalOpen(false);
    } else {
      alert("Please select a food item and a meal.");
    }
  };

  const handleDeleteFood = (meal, index) => {
    setMeals((prevMeals) => {
      const updatedMeals = { ...prevMeals };
      updatedMeals[meal].splice(index, 1);
      calculateTotalCalories(updatedMeals);
      return updatedMeals;
    });
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
          meals[meal].reduce(
            (total, item) => total + item.calories * item.servings,
            0
          )
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
                <th>Food</th>
                <th>Calories</th>
                <th>Servings</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {meals[meal].length > 0 ? (
                meals[meal].map((item, index) => (
                  <tr key={index}>
                    <td>{item.food}</td>
                    <td>{item.calories}</td>
                    <td>{item.servings}</td>
                    <td>{item.calories * item.servings}</td>
                    <td>
                      <button
                        className="delete-food-btn"
                        onClick={() => handleDeleteFood(meal, index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No food added yet.</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="action-buttons">
            <button className="add-food-btn" onClick={() => handleAddFood(meal)}>
              Add Food
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
            <h3>Add Food to {selectedMeal}</h3>
            <input
              type="text"
              placeholder="Search food..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <ul className="food-options">
              {foodOptions
                .filter((food) =>
                  food.food.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((food, index) => (
                  <li key={index} onClick={() => handleSelectFood(food)}>
                    {food.food} - {food.calories} calories
                  </li>
                ))}
            </ul>
            <label>
              Servings:
              <input
                type="number"
                min="1"
                value={foodDetails.servings}
                onChange={(e) =>
                  setFoodDetails((prev) => ({
                    ...prev,
                    servings: parseFloat(e.target.value) || 1,
                  }))
                }
              />
            </label>
            <button onClick={handleConfirmAddFood}>Add To Food Diary</button>
            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
       <Footer />
    </div>
  );
};

export default CalorieTracker;
