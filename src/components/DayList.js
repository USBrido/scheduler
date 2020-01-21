import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const daylist = props.days.map(day => {
    return (
      <DayListItem 
        key={day.key}
        name={day.name} 
        spots={day.spots} 
        selected={day.name === props.day}
        setDay={props.setDay}  />
    );
  });

  return (
    <ul>
      {daylist}
    </ul>
  )
}