import React, { useState } from "react";
import "./CSS/SymptomTracker.css";

export default function SymptomTracker() {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    patientId: "P12345", // Auto-filled example
    patientName: "John Doe", // Auto-filled example
    vitals: {
      systolic: "",
      diastolic: "",
      temperature: "",
      glucoseLevel: "",
      weight: "",
      height: "",
      heartRate: "",
      oxygenSaturation: "",
    },
    symptoms: {
      overallSeverity: "5",
      pain: {
        severity: "0",
        location: [],
        fatigue: "0",
      },
      nausea: {
        severity: "0",
        timing: "",
      },
      appetiteLoss: "0",
      breathingDifficulty: "0",
      fever: {
        temperature: "",
        frequency: "",
      },
      skinIssues: {
        type: "",
      },
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
      disturbances: {
        has: false,
        details: "",
      },
    },
    activities: {
      performTasks: "",
      needAssistance: false,
    },
    additionalNotes: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]:
        typeof field === "string"
          ? value
          : {
              ...(prev[section] || {}), // Ensure section exists
              [field]: value,
            },
    }));
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
                onChange={(e) => handleChange("date", null, e.target.value)}
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
              <label>Temperature (°C)</label>
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
                value={formData.symptoms?.pain?.severity || 0}
                onChange={(e) =>
                  handleChange("symptoms", {
                    pain: {
                      ...(formData.symptoms?.pain || {}),
                      severity: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="patient-symptom-field">
              <label>Pain Location</label>
              <select
                value={formData.symptoms.pain.location}
                onChange={(e) =>
                  handleChange("symptoms", {
                    pain: {
                      ...formData.symptoms.pain,
                      location: e.target.value,
                    },
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
                placeholder="°C"
                value={formData.symptoms.fever.temperature}
                onChange={(e) =>
                  handleChange("symptoms", {
                    fever: {
                      ...formData.symptoms.fever,
                      temperature: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="patient-symptom-field">
              <label>Fever Frequency</label>
              <select
                value={formData.symptoms.fever.frequency}
                onChange={(e) =>
                  handleChange("symptoms", {
                    fever: {
                      ...formData.symptoms.fever,
                      frequency: e.target.value,
                    },
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
                value={formData.symptoms.skinIssues.type}
                onChange={(e) =>
                  handleChange("symptoms", {
                    skinIssues: {
                      ...formData.symptoms.skinIssues,
                      type: e.target.value,
                    },
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
                value={formData.emotional.additionalThoughts}
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
                  type="checkbox"
                  checked={formData.sleep.disturbances.has}
                  onChange={(e) =>
                    handleChange("sleep", {
                      disturbances: {
                        ...formData.sleep.disturbances,
                        has: e.target.checked,
                      },
                    })
                  }
                />
                <span>Yes</span>
              </div>
              {formData.sleep.disturbances.has && (
                <textarea
                  placeholder="Please provide details about sleep disturbances..."
                  value={formData.sleep.disturbances.details}
                  onChange={(e) =>
                    handleChange("sleep", {
                      disturbances: {
                        ...formData.sleep.disturbances,
                        details: e.target.value,
                      },
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
                  type="checkbox"
                  checked={formData.activities.needAssistance}
                  onChange={(e) =>
                    handleChange(
                      "activities",
                      "needAssistance",
                      e.target.checked
                    )
                  }
                />
                <span>Yes</span>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Notes */}
        <section className="patient-symptom-section">
          <h2>Additional Notes</h2>
          <div className="patient-symptom-field">
            <label>
              Anything else you'd like to share about how you're feeling today?
            </label>
            <textarea
              value={formData.additionalNotes}
              onChange={(e) =>
                handleChange("additionalNotes", null, e.target.value)
              }
              rows="4"
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
