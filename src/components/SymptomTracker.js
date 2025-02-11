import React, { useState, useEffect } from "react";
import "./CSS/SymptomTracker.css";

export default function SymptomTracker() {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    patientId: "",
    patientName: "",
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
      nausea: { severity: "0", timing: "" },
      appetiteLoss: "0",
      breathingDifficulty: "0",
      fever: { temperature: "", frequency: "" },
      skinIssues: { type: "" }, // 🛠️ Added default object for skinIssues
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
  const transformFormData = (data) => {
    return {
      date: data.date || "",
      patientId: data.patientId || "",
      patientName: data.patientName || "",
      vitals: {
        systolic: data.vitals.systolic || "",
        diastolic: data.vitals.diastolic || "",
        temperature: data.vitals.temperature || "",
        glucoseLevel: data.vitals.glucoseLevel || "",
        weight: data.vitals.weight || "",
        height: data.vitals.height || "",
        heartRate: data.vitals.heartRate || "",
      },
      symptoms: {
        overallSeverity: String(data.symptoms.overallSeverity || "5"),
        pain: {
          severity: String(data.symptoms.pain.severity || "0"),
          location: data.symptoms.pain.location || "",
          fatigue: String(data.symptoms.pain.fatigue || "0"),
        },
        nausea: {
          severity: String(data.symptoms.nausea.severity || "0"),
          timing: data.symptoms.nausea.timing || "",
        },
        appetiteLoss: String(data.symptoms.appetiteLoss || "0"),
        breathingDifficulty: String(data.symptoms.breathingDifficulty || "0"),
        fever: {
          temperature: data.symptoms.fever?.temperature || "",
          frequency: data.symptoms.fever?.frequency || "",
        },
        skinIssues: {
          type: data.symptoms.skinIssues?.type || "",
        },
      },
      emotional: {
        moodRating: String(data.emotional.moodRating || "5"),
        anxiety: String(data.emotional.anxiety || "0"),
        depression: String(data.emotional.depression || "0"),
        additionalThoughts: data.emotional.additionalThoughts || "",
      },
      sleep: {
        energyLevel: String(data.sleep.energyLevel || "5"),
        duration: data.sleep.duration || "",
        quality: data.sleep.quality || "",
        disturbances: {
          has: Boolean(data.sleep.disturbances?.has),
          details: data.sleep.disturbances?.details || "",
        },
      },
      activities: {
        performTasks: data.activities.performTasks || "",
        needAssistance: Boolean(data.activities.needAssistance),
      },
      additionalNotes: data.additionalNotes || "",
    };
  };
  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/symptoms?date=${formData.date}`,
          {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }
        );
  
        if (!response.ok) {
          if (response.status === 404) return; // No previous record, keep form empty
          throw new Error("Failed to fetch symptom data");
        }
  
        const data = await response.json();
  
        // Ensure all required fields exist when setting data
        setFormData((prev) => ({
          ...prev,
          patientId: data.userId || "",
          patientName: data.patientName || "",
          vitals: {
            systolic: data.vitals?.systolic || "",
            diastolic: data.vitals?.diastolic || "",
            temperature: data.vitals?.temperature || "",
            glucoseLevel: data.vitals?.glucoseLevel || "",
            weight: data.vitals?.weight || "",
            height: data.vitals?.height || "",
            heartRate: data.vitals?.heartRate || "",
          },
          symptoms: {
            overallSeverity: data.symptoms?.overallSeverity || "5",
            pain: {
              severity: data.symptoms?.pain?.severity || "0",
              location: data.symptoms?.pain?.location || "",
              fatigue: data.symptoms?.pain?.fatigue || "0",
            },
            nausea: {
              severity: data.symptoms?.nausea?.severity || "0",
              timing: data.symptoms?.nausea?.timing || "",
            },
            appetiteLoss: data.symptoms?.appetiteLoss || "0",
            breathingDifficulty: data.symptoms?.breathingDifficulty || "0",
            fever: {
              temperature: data.symptoms?.fever?.temperature || "",
              frequency: data.symptoms?.fever?.frequency || "",
            },
            skinIssues: {
              type: data.symptoms?.skinIssues?.type || "",
            },
          },
          emotional: {
            moodRating: data.emotional?.moodRating || "5",
            anxiety: data.emotional?.anxiety || "0",
            depression: data.emotional?.depression || "0",
            additionalThoughts: data.emotional?.additionalThoughts || "",
          },
          sleep: {
            energyLevel: data.sleep?.energyLevel || "5",
            duration: data.sleep?.duration || "",
            quality: data.sleep?.quality || "",
            disturbances: {
              has: data.sleep?.disturbances?.has || false,
              details: data.sleep?.disturbances?.details || "",
            },
          },
          activities: {
            performTasks: data.activities?.performTasks || "",
            needAssistance: data.activities?.needAssistance || false,
          },
          additionalNotes: data.additionalNotes || "",
        }));
      } catch (error) {
        console.error("Error fetching symptoms:", error);
      }
    };
  
    fetchSymptoms();
  }, [formData.date]);

  // ✅ Submit Form Data to Server
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/api/user/symptom", {
        // Match backend endpoint
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transformFormData(formData)), // Transform data before sending
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error saving symptoms");
      }

      alert("Symptoms saved successfully!");
    } catch (error) {
      console.error("Error saving symptoms:", error);
    }
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value; // ✅ Get the string value directly
    handleChange("date", null, selectedDate);
  };

  const handleChange = (section, field, value) => {
    setFormData((prev) => {
      if (typeof field === "object") {
        // Handle the case where field is the entire object to update
        return {
          ...prev,
          [section]: {
            ...prev[section],
            ...field,
          },
        };
      }

      if (typeof value === "object" && field) {
        // Handle nested object updates
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [field]: {
              ...(prev[section]?.[field] || {}),
              ...value,
            },
          },
        };
      }

      // Handle simple field updates
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      };
    });
  };

  return (
    <div className="patient-symptom-tracker">
      <header className="patient-symptom-header">
        <h1>How are you feeling today?</h1>
      </header>

      <form onSubmit={handleSubmit} className="patient-symptom-form">
        {/* Basic Information */}
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
              <input type="text" value={formData.patientId} disabled />
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
                  value={formData.vitals.systolic}
                  onChange={(e) =>
                    handleChange("vitals", "systolic", e.target.value)
                  }
                />
                <span>/</span>
                <input
                  type="number"
                  placeholder="Diastolic"
                  value={formData.vitals.diastolic}
                  onChange={(e) =>
                    handleChange("vitals", "diastolic", e.target.value)
                  }
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
                onChange={(e) =>
                  handleChange("vitals", "temperature", e.target.value)
                }
              />
            </div>
            <div className="patient-symptom-field">
              <label>Blood Glucose Level</label>
              <input
                type="number"
                placeholder="mg/dL"
                value={formData.vitals.glucoseLevel}
                onChange={(e) =>
                  handleChange("vitals", "glucoseLevel", e.target.value)
                }
              />
            </div>
            <div className="patient-symptom-field">
              <label>Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                value={formData.vitals.weight}
                onChange={(e) =>
                  handleChange("vitals", "weight", e.target.value)
                }
              />
            </div>
            <div className="patient-symptom-field">
              <label>Height (cm)</label>
              <input
                type="number"
                value={formData.vitals.height}
                onChange={(e) =>
                  handleChange("vitals", "height", e.target.value)
                }
              />
            </div>
            <div className="patient-symptom-field">
              <label>Heart Rate (bpm)</label>
              <input
                type="number"
                value={formData.vitals.heartRate}
                onChange={(e) =>
                  handleChange("vitals", "heartRate", e.target.value)
                }
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
              onChange={(e) =>
                handleChange("symptoms", "overallSeverity", e.target.value)
              }
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
                onChange={(e) =>
                  handleChange("symptoms", "pain", {
                    ...formData.symptoms.pain,
                    severity: e.target.value,
                  })
                }
              />
              <span className="patient-symptom-range-value">
                {formData.symptoms.pain.severity}
              </span>{" "}
            </div>

            <div className="patient-symptom-field">
              <label>Pain Location</label>
              <select
                value={formData.symptoms?.pain?.location || ""}
                onChange={(e) =>
                  handleChange("symptoms", "pain", {
                    ...formData.symptoms.pain,
                    location: e.target.value,
                  })
                }
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
                onChange={(e) =>
                  handleChange("symptoms", {
                    pain: {
                      ...formData.symptoms.pain,
                      fatigue: e.target.value,
                    },
                  })
                }
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
                onChange={(e) =>
                  handleChange("symptoms", {
                    nausea: {
                      ...formData.symptoms.nausea,
                      severity: e.target.value,
                    },
                  })
                }
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
                onChange={(e) =>
                  handleChange("symptoms", {
                    nausea: {
                      ...formData.symptoms.nausea,
                      timing: e.target.value,
                    },
                  })
                }
              >
                <option value="">Select timing</option>
                <option value="morning">Morning</option>
                <option value="after-meals">After Meals</option>
                <option value="evening">Evening</option>
                <option value="random">Random Times</option>
              </select>
            </div>
            <div className="patient-symptom-field">
              <label>Appetite Loss (0-3)</label>
              <select
                value={formData.symptoms.appetiteLoss}
                onChange={(e) =>
                  handleChange("symptoms", "appetiteLoss", e.target.value)
                }
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
                onChange={(e) =>
                  handleChange(
                    "symptoms",
                    "breathingDifficulty",
                    e.target.value
                  )
                }
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
                onChange={(e) =>
                  handleChange("symptoms", "fever", {
                    ...formData.symptoms.fever, // Ensure fever object exists
                    temperature: e.target.value, // Update temperature
                  })
                }
              />
            </div>

            <div className="patient-symptom-field">
              <label>Fever Frequency</label>
              <select
                value={formData.symptoms.fever.frequency || ""}
                onChange={(e) =>
                  handleChange("symptoms", "fever", {
                    ...(formData.symptoms.fever || {}), // Ensure fever object exists
                    frequency: e.target.value, // Update frequency
                  })
                }
              >
                <option value="">Select frequency</option>
                <option value="persistent">Persistent</option>
                <option value="on-off">On and Off</option>
              </select>
            </div>
            <div className="patient-symptom-field">
              <label>Skin Issues</label>
              <select
                value={formData.symptoms.skinIssues.type || ""}
                onChange={(e) =>
                  handleChange("symptoms", "skinIssues", {
                    ...(formData.symptoms.skinIssues || {}), // Ensure skinIssues object exists
                    type: e.target.value, // Update type
                  })
                }
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
                onChange={(e) =>
                  handleChange("emotional", "moodRating", e.target.value)
                }
              />
              <span className="patient-symptom-range-value">
                {formData.emotional.moodRating}
              </span>{" "}
            </div>
            <div className="patient-symptom-field">
              <label>Anxiety (0-3)</label>
              <select
                value={formData.emotional.anxiety}
                onChange={(e) =>
                  handleChange("emotional", "anxiety", e.target.value)
                }
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
                onChange={(e) =>
                  handleChange("emotional", "depression", e.target.value)
                }
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
                onChange={(e) =>
                  handleChange(
                    "emotional",
                    "additionalThoughts",
                    e.target.value
                  )
                }
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
                onChange={(e) =>
                  handleChange("sleep", "energyLevel", e.target.value)
                }
              />
              <span className="patient-symptom-range-value">
                {formData.sleep.energyLevel}
              </span>
            </div>
            <div className="patient-symptom-field">
              <label>Sleep Duration</label>
              <select
                value={formData.sleep.duration}
                onChange={(e) =>
                  handleChange("sleep", "duration", e.target.value)
                }
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
                onChange={(e) =>
                  handleChange("sleep", "quality", e.target.value)
                }
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
                  onChange={() =>
                    handleChange("sleep", "disturbances", { has: true })
                  }
                />
                <span>Yes</span>

                <input
                  type="radio"
                  name="sleepDisturbance"
                  checked={formData.sleep.disturbances.has === false}
                  onChange={() =>
                    handleChange("sleep", "disturbances", {
                      has: false,
                      details: "",
                    })
                  }
                />
                <span>No</span>
              </div>

              {formData.sleep.disturbances.has && (
                <textarea
                  placeholder="Please provide details about sleep disturbances..."
                  value={formData.sleep.disturbances.details}
                  onChange={(e) =>
                    handleChange("sleep", "disturbances", {
                      ...(formData.sleep.disturbances || {}),
                      details: e.target.value,
                    })
                  }
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
                onChange={(e) =>
                  handleChange("activities", "performTasks", e.target.value)
                }
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
                  onChange={() =>
                    handleChange("activities", "needAssistance", true)
                  }
                />
                <span>Yes</span>

                <input
                  type="radio"
                  name="needAssistance"
                  checked={formData.activities.needAssistance === false}
                  onChange={() =>
                    handleChange("activities", "needAssistance", false)
                  }
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
