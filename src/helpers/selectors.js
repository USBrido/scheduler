
export  function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.find(dia => dia.name === day);
  if (filteredDay === undefined) {
    return []
  } else {
    const detailedAppointments = filteredDay.appointments.map(id => state.appointments[id])
    return detailedAppointments
  }
}

export  function getInterviewersForDay(state, day) {
  const filteredDay = state.days.filter(dia => dia.name === day);
  // console.log("filteredDays", filteredDay)
  // console.log("filteredDay0", filteredDay[0])
  if (!filteredDay || filteredDay.length < 1 || !state.day) {
    return []
  } else {
    const detailedDay = filteredDay[0].interviewers.map(id => state.interviewers[id])
  //  console.log("This is detailedDay", detailedDay) 
    return detailedDay 
  }
}



export  function getInterview(state, interview) {
  if (!interview){
    return null
  }
  return {...interview, interviewer: state.interviewers[interview.interviewer]};
}