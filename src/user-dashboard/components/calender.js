export default function Calendar({ selectedDate, onDateClick }) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay(); // Get weekday index

    const daysArray = new Array(firstDay).fill(null); // Fill empty slots before first day

    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    return daysArray;
  };

  return (
    <div className="user-calendar">
      <div className="calendar-header">
        <h2>{months[selectedDate.getMonth()]} {selectedDate.getFullYear()}</h2>
      </div>

      <div className="calendar-grid">
        <div className="calendar-days">
          {days.map(day => (
            <div key={day} className="day-name">{day}</div>
          ))}
        </div>

        <div className="calendar-dates">
          {getDaysInMonth(selectedDate).map((day, index) => (
            <button 
              key={index} 
              className={`calendar-day ${day === selectedDate.getDate() ? 'selected' : ''} ${day ? '' : 'hidden'}`}
              onClick={() => day && onDateClick(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day))}
              disabled={!day}
            >
              {day || ""}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
