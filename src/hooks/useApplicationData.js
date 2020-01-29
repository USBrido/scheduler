import { useReducer, useEffect } from "react";
import Axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.day }
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers
      }
    case SET_INTERVIEW: {
      const { id, interview } = action;
      return {
        ...state,
        appointments: {
          ...state.appointments, 
          [id]: {
            ...state.appointments[action.id],
            interview: action.interview ? { ...interview } : null
        }
        }
      }
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}



export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviwers: {}
  })

  const setDay = day => dispatch({ type: SET_DAY, day })

  useEffect(() => {
    const daysData = Axios.get('http://localhost:8000/api/days')
    const appointmentsData = Axios.get('http://localhost:8000/api/appointments')
    const interviewersData = Axios.get('http://localhost:8000/api/interviewers')
    Promise.all([daysData, appointmentsData, interviewersData])
      .then((all) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      })
    });
  }, []);


  //creates the appointment
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview
    };
    return Axios.put(`api/appointments/${id}`, appointment)
      .then(() => {
        if (!state.appointments[id].interview) {
          const dayObject = state.days.find(day => day.name === state.day);
          state.days[dayObject.id - 1].spots--;
          dispatch({ type: SET_INTERVIEW, id, interview })
        }else{
          dispatch({ type: SET_INTERVIEW, id, interview })
        }
      })
  }

  //deletes the appointment
  const cancelInterview = (id) => {
    return Axios.delete(`/api/appointments/${id}`)
      .then(() => {
        const dayObject = state.days.find(day => day.name === state.day);
        state.days[dayObject.id - 1].spots++;
        dispatch({ type: SET_INTERVIEW, id, interview: null })
      })
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}
