import React, { useState, useEffect } from "react";
import "./CSS/SymptomTracker.css";

export default function SymptomTracker() {
  const [formData, setFormData] = useState({
    patientId: "",
    date: new Date().toISOString().split("T")[0],
    vitals: {
      systolic: "",
      diastolic: "",
      temperature: "",
      glucoseLevel: "",
      weight: "",
      height: "",
      heartRate: "",
    },
    symptoms: {
      overallSeverity: "5",
      pain: { severity: "0", location: "" },
      fatigue: "0",
      nausea: { severity: "0", timing: "" },
      appetiteLoss: "0",
      breathingDifficulty: "0",
      fever: { temperature: "", frequency: "" },
      skinIssues: { type: "" },
    },
    emotional: {
      moodRating: "5",
      anxiety: "0",
      depression: "0",
      additionalThoughts: "",
    },
    sleep: {
      energyLevel: "5",
      duration: "",
      quality: "",
      disturbances: { has: false, details: "" },
    },
    activities: { performTasks: "", needAssistance: false },
    additionalNotes: "",
  });
  const [originalData, setOriginalData] = useState(null);
  // Fetch symptoms when date changes or component mounts
  const fetchSymptoms = async (date) => {
    console.log("Fetching symptoms for date:", date); // Log the date being fetched
    try {
      const response = await fetch(
        `http://localhost:5001/api/symptoms/get-symptoms?date=${date}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      const result = await response.json();
      if (response.ok) {
        console.log("Fetched Data:", result.data);
        const formattedDate = new Date(result.data.date).toISOString().split("T")[0];
        
        // Map server's flat fields to nested formData
        setFormData((prevState) => ({
          ...prevState,
          date: formattedDate,
          patientId: result.data.user_id,
          vitals: {
            systolic: result.data.bp_sys?.toString() || "", // Convert numbers to strings
            diastolic: result.data.bp_dia?.toString() || "",temperature: result.data.temp || prevState.vitals.temperature,
            glucoseLevel: result.data.glucose || prevState.vitals.glucoseLevel,
            weight: result.data.weight || prevState.vitals.weight,
            height: result.data.height || prevState.vitals.height,
            heartRate: result.data.heart_rate || prevState.vitals.heartRate,
          },
          symptoms: {
            overallSeverity: result.data.symptom_lvl?.toString() || prevState.symptoms.overallSeverity,
            pain: {
              severity: result.data.pain_lvl?.toString() || "0", // Match initial state
              location: result.data.pain_loc || ""
            },
            fatigue: result.data.fatigue_lvl?.toString() || prevState.symptoms.fatigue,
            nausea: {
              severity: result.data.vomiting_lvl?.toString() || prevState.symptoms.nausea.severity,
              timing: result.data.vom_time || prevState.symptoms.nausea.timing,
            },
            appetiteLoss: result.data.appetite_loss?.toString() || prevState.symptoms.appetiteLoss,
            breathingDifficulty: result.data.breath_diff?.toString() || prevState.symptoms.breathingDifficulty,
            fever: {
              temperature: result.data.fever_temp?.toString() || prevState.symptoms.fever.temperature,
              frequency: result.data.fever_freq || prevState.symptoms.fever.frequency,
            },
            skinIssues: {
              type: result.data.skin_issue || prevState.symptoms.skinIssues.type,
            },
          },
          emotional: {
            moodRating: result.data.mood?.toString() || prevState.emotional.moodRating,
            anxiety: result.data.anxiety?.toString() || prevState.emotional.anxiety,
            depression: result.data.depression?.toString() || prevState.emotional.depression,
            additionalThoughts: result.data.thoughts || prevState.emotional.additionalThoughts,
          },
          sleep: {
            energyLevel: result.data.energy_lvl?.toString() || prevState.sleep.energyLevel,
            duration: result.data.sleep_dur || prevState.sleep.duration,
            quality: result.data.sleep_quality || prevState.sleep.quality,
            disturbances: {
              has: result.data.sleep_disturb || prevState.sleep.disturbances.has,
              details: result.data.sleep_disturb_details || prevState.sleep.disturbances.details,
            },
          },
          activities: {
            performTasks: result.data.task_ability || prevState.activities.performTasks,
            needAssistance: result.data.need_help || prevState.activities.needAssistance,
          },
          additionalNotes: result.data.notes || prevState.additionalNotes,
        }));
        setOriginalData(result.data);
      } else {
        alert(result.message); // No data found for the selected date
        // You can also call the save-symptoms API here if no data is found
        saveSymptoms(formData);
      }
    } catch (error) {
      console.error("Error fetching symptoms:", error);
    }
  };

  // Save new symptoms if no data is found for the given date
  const saveSymptoms = async (data) => {
    try {
      const response = await fetch("http://localhost:5001/api/symptoms/save-symptoms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message); // Success message
      } else {
        alert("Failed to save symptoms");
      }
    } catch (error) {
      console.error("Error saving symptoms:", error);
      alert("Error saving symptoms");
    }
  };

  // Update only the changed symptoms
  const updateSymptoms = async (data) => {
    try {
      const response = await fetch("http://localhost:5001/api/symptoms/update-symptoms", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message); // Success message
      } else {
        alert("Failed to update symptoms");
      }
    } catch (error) {
      console.error("Error updating symptoms:", error);
      alert("Error updating symptoms");
    }
  };

  useEffect(() => {
    fetchSymptoms(formData.date); // Fetch symptoms when date changes or component mounts
  }, [formData.date]); // Fetch symptoms each time date changes

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      date: selectedDate,
    }));
  };

  const handleChange = (path, value) => {
    setFormData(prev => {
      const newState = { ...prev };
      const keys = path.split('.');
      let current = newState;
      
      // Traverse nested paths (e.g., "symptoms.pain.severity")
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newState;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Prepare the data to be updated (include all fields)
    const updatedData = {
      date: formData.date,
      vitals: {
        systolic: formData.vitals.systolic,
        diastolic: formData.vitals.diastolic,
        temperature: formData.vitals.temperature,
        glucoseLevel: formData.vitals.glucoseLevel,
        weight: formData.vitals.weight,
        height: formData.vitals.height,
        heartRate: formData.vitals.heartRate,
      },
      symptoms: formData.symptoms,
      emotional: formData.emotional,
      sleep: formData.sleep,
      activities: formData.activities,
      additionalNotes: formData.additionalNotes,
    };
  
    try {
      await updateSymptoms(updatedData);
      alert("Symptoms updated successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting the form");
    }
  };
  

  return (
    <div className="patient-symptom-tracker">
      <header className="patient-symptom-header">
        <h1>How are you feeling today?</h1>
      </header>

      <form onSubmit={handleSubmit} className="patient-symptom-form">
        <section className="patient-symptom-section">
          <h2>Basic Information</h2>
          <div className="patient-symptom-grid">
            <div className="patient-symptom-field">
              <label>Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={handleDateChange}
              />
            </div>
            <div className="patient-symptom-field">
              <label>Patient ID</label>
              <input 
                type="text" 
                value={formData.patientId} 
                disabled 
              />
            </div>
          </div>
        </section>


        {/* Vitals */}
        <section className="patient-symptom-section">
          <h2>Vitals</h2>
          <div className="patient-symptom-grid">
            <div className="patient-symptom-field">
              <label>Blood Pressure (Systolic/Diastolic)</label>
              <div className="patient-symptom-bp">
                <input
                  type="number"
                  placeholder="Systolic"
                  value={formData.vitals.systolic || ""}
                  onChange={(e) => handleChange("vitals.systolic", e.target.value)}
                />
                <span>/</span>
                <input
                  type="number"
                  placeholder="Diastolic"
                  value={formData.vitals.diastolic || ""}
                  onChange={(e) => handleChange("vitals.diastolic", e.target.value)}
                />
                <span>mmHg</span>
              </div>
            </div>
            <div className="patient-symptom-field">
              <label>Temperature (°F)</label>
              <input
                type="number"
                step="0.1"
                value={formData.vitals.temperature}
                onChange={(e) => handleChange("vitals.temperature", e.target.value)}
              />
            </div>
            <div className="patient-symptom-field">
              <label>Blood Glucose Level</label>
              <input
                type="number"
                placeholder="mg/dL"
                value={formData.vitals.glucoseLevel}
                onChange={(e) => handleChange("vitals.glucodeLevel", e.target.value)}
              />
            </div>
            <div className="patient-symptom-field">
              <label>Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                value={formData.vitals.weight}
                onChange={(e) => handleChange("vitals.weight", e.target.value)}
              />
            </div>
            <div className="patient-symptom-field">
              <label>Height (cm)</label>
              <input
                type="number"
                value={formData.vitals.height}
                onChange={(e) => handleChange("vitals.height", e.target.value)}
              />
            </div>
            <div className="patient-symptom-field">
              <label>Heart Rate (bpm)</label>
              <input
                type="number"
                value={formData.vitals.heartRate}
                onChange={(e) => handleChange("vitals.heartRate", e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Symptom Severity */}
        <section className="patient-symptom-section">
          <h2>Symptom Severity</h2>
          <div className="patient-symptom-field">
            <label>Overall Symptom Severity (0-10)</label>
            <input
              type="range"
              min="0"
              max="10"
              value={formData.symptoms.overallSeverity}
              onChange={(e) => handleChange("symptoms.overallSeverity", e.target.value)}
            />
            <span className="patient-symptom-range-value">
              {formData.symptoms.overallSeverity}
            </span>
          </div>
        </section>

        {/* Physical Symptoms */}
        <section className="patient-symptom-section">
          <h2>Physical Symptoms</h2>
          <div className="patient-symptom-grid">
            <div className="patient-symptom-field">
              <label>Pain Severity (0-10)</label>
              <input
                type="range"
                min="0"
                max="10"
                value={formData.symptoms.pain.severity}
                onChange={(e) => handleChange("symptoms.pain.severity", e.target.value)}
              />
              <span className="patient-symptom-range-value">
                {formData.symptoms.pain.severity}
              </span>{" "}
            </div>

            <div className="patient-symptom-field">
              <label>Pain Location</label>
              <select
                value={formData.symptoms?.pain?.location || ""}
                onChange={(e) => handleChange("symptoms.pain.location", e.target.value)}
              >
                <option value="">Select location</option>
                <option value="head">Head</option>
                <option value="chest">Chest</option>
                <option value="abdomen">Abdomen</option>
                <option value="joints">Joints</option>
              </select>
            </div>
            <div className="patient-symptom-field">
              <label>Fatigue Severity (0-3)</label>
              <select
                value={formData.symptoms.pain.fatigue}
                onChange={(e) => handleChange("symptoms.pain.fatigue", e.target.value)}
              >
                <option value="0">None (0)</option>
                <option value="1">Mild (1)</option>
                <option value="2">Moderate (2)</option>
                <option value="3">Severe (3)</option>
              </select>
            </div>
            <div className="patient-symptom-field">
              <label>Nausea/Vomiting Severity (0-3)</label>
              <select
                value={formData.symptoms.nausea.severity}
                onChange={(e) => handleChange("symptoms.nausea.severity", e.target.value)}
              >
                <option value="0">None (0)</option>
                <option value="1">Mild (1)</option>
                <option value="2">Moderate (2)</option>
                <option value="3">Severe (3)</option>
              </select>
            </div>
            <div className="patient-symptom-field">
              <label>Nausea/Vomiting Timing</label>
              <select
                value={formData.symptoms.nausea.timing}
                onChange={(e) => handleChange("symptoms.nausea.timing", e.target.value)}
              >
                <option value="">Select timing</option>
                <option value="morning">Morning</option>
                <option value="after meals">After Meals</option>
                <option value="evening">Evening</option>
                <option value="random">Random Times</option>
              </select>
            </div>
            <div className="patient-symptom-field">
              <label>Appetite Loss (0-3)</label>
              <select
                value={formData.symptoms.appetiteLoss}
                onChange={(e) => handleChange("symptoms.appetiteLoss", e.target.value)}
              >
                <option value="0">None (0)</option>
                <option value="1">Mild (1)</option>
                <option value="2">Moderate (2)</option>
                <option value="3">Severe (3)</option>
              </select>
            </div>
            <div className="patient-symptom-field">
              <label>Breathing Difficulty (0-3)</label>
              <select
                value={formData.symptoms.breathingDifficulty}
                onChange={(e) => handleChange("symptoms.breathingDifficulty", e.target.value)}
              >
                <option value="0">None (0)</option>
                <option value="1">Mild (1)</option>
                <option value="2">Moderate (2)</option>
                <option value="3">Severe (3)</option>
              </select>
            </div>
            <div className="patient-symptom-field">
              <label>Fever Temperature (if measured)</label>
              <input
                type="number"
                step="0.1"
                placeholder="°F"
                value={formData.symptoms.fever?.temperature || ""}
                onChange={(e) => handleChange("symptoms.fever?.temperature", e.target.value)}
              />
            </div>

            <div className="patient-symptom-field">
              <label>Fever Frequency</label>
              <select
                value={formData.symptoms.fever.frequency || ""}
                onChange={(e) => handleChange("symptoms.fever.frequency", e.target.value)}
              >
                <option value="">Select frequency</option>
                <option value="persistent">Persistent</option>
                <option value="on and off">On and Off</option>
              </select>
            </div>
            <div className="patient-symptom-field">
              <label>Skin Issues</label>
              <select
                value={formData.symptoms.skinIssues.type || ""}
                onChange={(e) => handleChange("symptoms.skinIssues.type", e.target.value)}
              >
                <option value="">Select type</option>
                <option value="rashes">Rashes</option>
                <option value="itchiness">Itchiness</option>
                <option value="sores">Sores</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </section>
        {/* Emotional Well-being */}
        <section className="patient-symptom-section">
          <h2>Emotional Well-being</h2>
          <div className="patient-symptom-grid">
            <div className="patient-symptom-field">
              <label>Mood Rating (0-10)</label>
              <input
                type="range"
                min="0"
                max="10"
                value={formData.emotional.moodRating}
                onChange={(e) => handleChange("symptoms.emotional.moodRating", e.target.value)}
              />
              <span className="patient-symptom-range-value">
                {formData.emotional.moodRating}
              </span>{" "}
            </div>
            <div className="patient-symptom-field">
              <label>Anxiety (0-3)</label>
              <select
                value={formData.emotional.anxiety}
                onChange={(e) => handleChange("symptoms.emotional.anxiety", e.target.value)}
              >
                <option value="0">None (0)</option>
                <option value="1">Mild (1)</option>
                <option value="2">Moderate (2)</option>
                <option value="3">Severe (3)</option>
              </select>
            </div>
            <div className="patient-symptom-field">
              <label>Depression (0-3)</label>
              <select
                value={formData.emotional.depression}
                onChange={(e) => handleChange("symptoms.emotional.depression", e.target.value)}
              >
                <option value="0">None (0)</option>
                <option value="1">Mild (1)</option>
                <option value="2">Moderate (2)</option>
                <option value="3">Severe (3)</option>
              </select>
            </div>
            <div className="patient-symptom-field">
              <label>Additional Thoughts</label>
              <textarea
                value={formData.emotional.additionalThoughts || ""} // ✅ Ensure it's always a string
                onChange={(e) => handleChange("symptoms.emotional.additionalThoughts", e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Energy and Sleep */}
        <section className="patient-symptom-section">
          <h2>Energy and Sleep</h2>
          <div className="patient-symptom-grid">
            <div className="patient-symptom-field">
              <label>Energy Level (0-10)</label>
              <input
                type="range"
                min="0"
                max="10"
                value={formData.sleep.energyLevel}
                onChange={(e) => handleChange("symptoms.sleep.energyLevel", e.target.value)}
              />
              <span className="patient-symptom-range-value">
                {formData.sleep.energyLevel}
              </span>
            </div>
            <div className="patient-symptom-field">
              <label>Sleep Duration</label>
              <select
                value={formData.sleep.duration}
                onChange={(e) => handleChange("symptoms.sleep.duration", e.target.value)}
              >
                <option value="">Select duration</option>
                <option value="<4">Less than 4 hours</option>
                <option value="4-6">4-6 hours</option>
                <option value="6-8">6-8 hours</option>
                <option value="8+">8+ hours</option>
              </select>
            </div>
            <div className="patient-symptom-field">
              <label>Sleep Quality</label>
              <select
                value={formData.sleep.quality}
                onChange={(e) => handleChange("symptoms.sleep.quality", e.target.value)}
              >
                <option value="">Select quality</option>
                <option value="good">Good</option>
                <option value="moderate">Moderate</option>
                <option value="poor">Poor</option>
              </select>
            </div>
            <div className="patient-symptom-field">
              <label>Sleep Disturbances</label>
              <div className="patient-symptom-checkbox">
                <input
                  type="radio"
                  name="sleepDisturbance"
                  checked={formData.sleep.disturbances.has === true}
                  onChange={() => handleChange("sleep.disturbances.has", true)}
                />
                <span>Yes</span>

                <input
                  type="radio"
                  name="sleepDisturbance"
                  checked={formData.sleep.disturbances.has === false}
                  onChange={() => handleChange("sleep.disturbances.has", false)}
                />
                <span>No</span>
              </div>

              {formData.sleep.disturbances.has && (
                <textarea
                  placeholder="Please provide details about sleep disturbances..."
                  value={formData.sleep.disturbances.details}
                  onChange={(e) => handleChange("symptoms.disturbances.details", e.target.value)}
                />
              )}
            </div>
          </div>
        </section>

        {/* Daily Activities */}
        <section className="patient-symptom-section">
          <h2>Daily Activities</h2>
          <div className="patient-symptom-grid">
            <div className="patient-symptom-field">
              <label>Ability to Perform Usual Tasks</label>
              <select
                value={formData.activities.performTasks}
                onChange={(e) => handleChange("symptoms.activities.performTasks", e.target.value)}
              >
                <option value="">Select ability</option>
                <option value="fully">Fully</option>
                <option value="partially">Partially</option>
                <option value="not">Not at All</option>
              </select>
            </div>
            <div className="patient-symptom-field">
              <label>Need for Assistance</label>
              <div className="patient-symptom-checkbox">
                <input
                  type="radio"
                  name="needAssistance"
                  checked={formData.activities.needAssistance === true}
                  onChange={(e) => handleChange("symptoms.activities.needAssistant", true)}
                />
                <span>Yes</span>

                <input
                  type="radio"
                  name="needAssistance"
                  checked={formData.activities.needAssistance === false}
                  onChange={(e) => handleChange("symptoms.activities.needAssistant", false)}
                />
                <span>No</span>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Notes */}
        <section className="patient-symptom-section">
          <h2>Additional Notes</h2>
          <div className="patient-symptom-field">
            <label>Additional Notes</label>
            <textarea
              value={formData.additionalNotes || ""}
              onChange={(e) =>
                handleChange("additionalNotes", null, e.target.value)
              }
              placeholder="Any other information you'd like to share..."
            />
          </div>
        </section>

        <div className="patient-symptom-actions">
          <button type="button" className="patient-symptom-button cancel">
            Cancel
          </button>
          <button type="submit" className="patient-symptom-button submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
