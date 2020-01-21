import React from "react";
import classnames from "classnames"
// import InterviewerList from "components/InterviewerList"
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  let interviewerListItem  = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected,

  });

  return (
    <li className={interviewerListItem} onClick={props.setInterviewer}>
    <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
    />
    {props.selected && props.name}
  </li>

  );
}

// onClick={() => props.setInterviewer(interviewer.name)