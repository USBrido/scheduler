import React, { useState } from "react";
import InterviewerList from "components/InterviewerList"
import Button from "components/Button"

export default function FormData(props) {
  const [ name, setName] = useState((props.name || ""))
  const [ interviewer, setInterviewer] = useState(props.interviewer || null)  
  const [ error, setError] = useState(""); 

  function handleChange(e) {
     setName(e.target.value)
  }

  function reset(){
    setName("");
    setInterviewer(null);
    return;
  }

  function cancel(){
    reset();
    props.onCancel()
  }

  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (!interviewer) {
      setError("Interviewer cannot be blank");
      return;
    }
    setError("")
    props.onSave(name, interviewer);
  }
  // console.log("Props for Form", props.interviewers)

  return <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input onChange={handleChange}
        className="appointment__create-input text--semi-bold"
        name="name"
        value={name}
        type="text"
        placeholder="Enter Student Name"
      />
    </form>
    <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={() => cancel()}>Cancel</Button>
      <Button confirm onClick={() => validate()}>Save</Button>
    </section>
  </section>
</main>
}