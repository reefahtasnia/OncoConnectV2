"use client";
import './checkPlan.css';
export default function CheckPlanPopup({ isOpen, onClose, medicineData }) {
  if (!isOpen) return null;

  const {
    name = "Oxycodone",
    amount = 2,
    frequency = 5,
    notification = "10:00 AM",
    foodTiming = "any",
  } = medicineData || {};

  return (
    <div className="checkplan-overlay">
      <div className="checkplan-container">
        <div className="checkplan-header">
          <h2>Check Plan</h2>
          <button onClick={onClose} className="checkplan-close">
            ×
          </button>
        </div>

        <form className="checkplan-form">
          <div className="checkplan-group">
            <label>Pills name</label>
            <div className="checkplan-pills-input">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
              <span>{name}</span>
            </div>
          </div>

          <div className="checkplan-group">
            <label>Amount</label>
            <div className="checkplan-amount">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
              </svg>
              <span>{amount}</span>
              <span>pills</span>
            </div>
          </div>

          <div className="checkplan-group">
            <label>Food & Pills</label>
            <div className="checkplan-timing">
              <button
                type="button"
                className={`checkplan-timing-btn ${foodTiming === 'before' ? 'active' : ''}`}
              >
                {/* <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 13h18M3 7h18M3 19h18" />
                </svg> */}
                <span>Before Meal</span>
              </button>
              <button
                type="button"
                className={`checkplan-timing-btn ${foodTiming === 'after' ? 'active' : ''}`}
              >
                {/* <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 13h18M3 7h18M3 19h18" />
                </svg> */}
                <span>After Meal</span>
              </button>
              <button
                type="button"
                className={`checkplan-timing-btn ${foodTiming === 'any' ? 'active' : ''}`}
              >
                {/* <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 13h18M3 7h18M3 19h18" />
                </svg> */}
                <span>Any Time</span>
              </button>
            </div>
          </div>

          <div className="checkplan-group">
            <label>How many times a day do you need to take medicine?</label>
            <div className="checkplan-frequency">
              <span>{frequency} times</span>
              <button type="button" className="checkplan-add">
                +
              </button>
            </div>
          </div>

          <div className="checkplan-group">
            <label>Notification</label>
            <div className="checkplan-notification">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span>{notification}</span>
              <button type="button" className="checkplan-add">
                +
              </button>
            </div>
          </div>

          <div className="checkplan-group">
            <label>Took Medicine?</label>
            <div className="checkplan-radio">
              <label className="checkplan-radio-label">
                <input type="radio" name="tookMedicine" value="yes" />
                <span>Yes</span>
              </label>
              <label className="checkplan-radio-label">
                <input type="radio" name="tookMedicine" value="no" />
                <span>No</span>
              </label>
            </div>
          </div>

          <button type="submit" className="checkplan-submit">
            Done
          </button>
        </form>
      </div>
    </div>
  );
}