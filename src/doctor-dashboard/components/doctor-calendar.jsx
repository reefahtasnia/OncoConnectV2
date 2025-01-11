export default function Calendar({ selectedDate, onChange }) {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]
    
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  
    const getDaysInMonth = (date) => {
      const year = date.getFullYear()
      const month = date.getMonth()
      const daysInMonth = new Date(year, month + 1, 0).getDate()
      const firstDay = new Date(year, month, 1).getDay()
      
      const days = []
      for (let i = 0; i < firstDay; i++) {
        days.push(null)
      }
      
      for (let i = 1; i <= daysInMonth; i++) {
        days.push(i)
      }
      
      return days
    }
  
    const handlePrevMonth = () => {
      const newDate = new Date(selectedDate)
      newDate.setMonth(newDate.getMonth() - 1)
      onChange(newDate)
    }
  
    const handleNextMonth = () => {
      const newDate = new Date(selectedDate)
      newDate.setMonth(newDate.getMonth() + 1)
      onChange(newDate)
    }
  
    return (
      <div className="calendar">
        <div className="calendar-header">
          <h3>Calendar</h3>
          <div className="calendar-nav">
            <button onClick={handlePrevMonth}>←</button>
            <span>{months[selectedDate.getMonth()]} {selectedDate.getFullYear()}</span>
            <button onClick={handleNextMonth}>→</button>
          </div>
        </div>
  
        <div className="calendar-grid">
          <div className="calendar-days">
            {days.map(day => (
              <div key={day} className="day-name">{day}</div>
            ))}
          </div>
  
          <div className="calendar-dates">
            {getDaysInMonth(selectedDate).map((day, index) => (
              <div 
                key={index} 
                className={`calendar-day ${day === selectedDate.getDate() ? 'selected' : ''}`}
              >
                {day}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  
  