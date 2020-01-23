
export  function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter(day => state.day === day);
  return filteredDays;
}

export  function getInterview(state, interview) {
  if (!interview){
    return null
  }
  return {...interview, interviewer: state.interviewers[interview.interviewer]};
}