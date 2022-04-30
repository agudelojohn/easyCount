import React, { useState } from "react";
import { ButtonToolbar, ButtonGroup, Button } from "react-bootstrap";
import { BiCircle } from "react-icons/bi";
import { FcApproval } from "react-icons/fc";
export function DaySelector({ week, setDayReady }) {
  const [currentDay, setCuerrentDay] = useState("");

  function selectDay(dayName) {
    setDayReady(dayName);
    setCuerrentDay(dayName);
  }

  return (
    <div style={{ minHeight: "20%" }}>
      <h3>Day of the Week</h3>
      <ButtonToolbar aria-label="Toolbar with button groups">
        <ButtonGroup className="me-2" aria-label="First group">
          {week === undefined
            ? null
            : [...week.keys()].map((day) => {
                return (
                  <Button
                    key={day + week.get(day)}
                    onClick={() => selectDay(day)}
                    variant={currentDay === day ? "light" : "primary"}
                  >
                    {day}
                    {week.get(day) ? <FcApproval /> : <BiCircle />}
                  </Button>
                );
              })}
        </ButtonGroup>
        <ButtonGroup size='sm' style={{minWidth:'100%', marginTop:'10px'}}>
          <Button>Breakfast: <BiCircle /></Button>
          <Button>Lunch: <BiCircle /></Button>
          <Button>Dinner: <BiCircle /></Button>
        </ButtonGroup>
      </ButtonToolbar>
    </div>
  );
}
