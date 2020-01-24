import React from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status"
import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss";



const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "James Jean",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  }
];

  
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

export default function Appointment(props){

 const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      // .catch(error => transition(ERROR_SAVE, true));
  }

  return <article className="appointment">
  <Header time={props.time}/>
  
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
      />
    )}
    {mode ===CREATE &&
      <Form 
      onCancel={()=> back()}
      interviewers={props.interviewers}
      onSave={save}
    />
    }
    {mode === SAVING &&
    < Status
    message={'Saving'}
    />
    }
    {mode === DELETE &&
    < Status
    message={'Saving'}
    />
    }
    {mode === CONFIRM &&
    < Status
    message={'Delete?'}
    />
    }
    {mode === EDIT &&
    <Form
      onCancel={()=> back()}
      interviewers={props.interviewers}
      onSave={save}
      student={props.interview.student}
      interviewer={props.interview.interviewer.id}
     />

    }
  </article>

}

