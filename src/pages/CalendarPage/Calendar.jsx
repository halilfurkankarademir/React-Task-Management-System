import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Sidebar from "../../components/Sidebar";
import "./Calendar.css";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const events = tasks.map(task => ({
            title: task.task,
            start: new Date(task.createTime),
            end: new Date(task.createTime),

        }));
        setEvents(events);
    }, []);

    return (
        <div className="myCalendar">
            <Sidebar />
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
            />
        </div>
    );
};

export default MyCalendar;
