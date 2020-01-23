import React, { useState , useEffect } from "react";
import DayList from "./DayList.js";
import Appointment from "components/Appointment"
import Axios from "axios";
import {getAppointmentsForDay, getInterview} from "helpers/selectors";

import "components/Application.scss";


export default function Application(props) {

const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
  interviwers: {}
});

useEffect(() => {
  Promise.all([
    Axios.get('/api/days'), 
    Axios.get('/api/appointments'), 
    Axios.get('/api/interviewers'), 
  ]).then((all) => {
    setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  const appointments = getAppointmentsForDay(state, state.day);

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
  
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
          <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={state.setDay}
          />  
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">{schedule}
      </section>
    </main>
  );
}
