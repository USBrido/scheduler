import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";


export default function InterviewerList(props) {
  console.log("in interviewer list", props.interviewers)
  const interviewerlist = props.interviewers.map(value => {
    return (
      <InterviewerListItem 
        key={value.id}
        name={value.name} 
        avatar={value.avatar}
        selected={value.id === props.value}
        setInterviewer  ={event => props.onChange(value.id)}
        />
    );
  });
console.log (interviewerlist);
  return (
  <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list"> {interviewerlist}</ul>
  </section>
  )
}