import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const MyCalendar = () => {
    const [date, setDate] = useState(new Date());

    const updateTime = () => {
        setDate(new Date());
    };

    useEffect(() => {
        // Update the time every second (1000 milliseconds)
        const intervalId = setInterval(updateTime, 1000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="calendar-container">
            <h2>My Calendar</h2>

            <Calendar
                onChange={() => { }}
                value={date}
            />
        </div>
    );
};

export default MyCalendar;
