import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function CalendarComponent({ selectedDate, setSelectedDate }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevents SSR mismatch

  return (
    <div className="custom-calendar">
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileClassName={({ date, view }) =>
          view === "month" && date.toDateString() === new Date().toDateString()
            ? "highlight-today"
            : null
        }
      />
    </div>
  );
}
