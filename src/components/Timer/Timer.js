import React, { useState, useEffect } from "react";
import "./Timer.css";

function Timer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(60);
  const time = minutes + ":" + seconds;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(seconds - 1);
    }, 100);

    if (seconds === 0) {
      setMinutes(minutes - 1);
      setSeconds(59);
    }

    if (minutes === 0) {
    }

    return () => clearInterval(intervalId);
  }, [seconds]);

  return (
    <div>
      <div className="timer">
        {seconds}, {time}
      </div>
    </div>
  );
}

export default Timer;
