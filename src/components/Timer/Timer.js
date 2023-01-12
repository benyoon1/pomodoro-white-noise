import React, { useState } from "react";
import "./Timer.css";

function Timer() {
  const [time, setTime] = useState("25:00");

  return (
    <div>
      <div className="timer">{time}</div>
    </div>
  );
}

export default Timer;
