import { useState, useEffect } from "react";
import { clearInterval, setInterval } from "worker-timers";

const RunTimer = (initialMinutes = 25) => {
  const [timerRunning, setTimerRunning] = useState(false);
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(0);

  // Timer logic here...

  return {
    timerRunning,
    minutes,
    seconds,
    setTimerRunning,
    setMinutes,
    setSeconds,
  };
};

export default RunTimer;
