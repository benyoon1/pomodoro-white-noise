import React, { useState, useEffect } from "react";
import "./App.css";
import Timer from "./components/Timer/Timer";
import TimerTypeButton from "./components/TimerTypeButton/TimerTypeButton";
import StartButton from "./components/StartButton/StartButton";
import Logo from "./components/Logo/Logo";
import LoginButton from "./components/LoginButton/LoginButton";
import RestartButton from "./components/RestartButton/RestartButton";

function App() {
  const [timerRunning, setTimerRunning] = useState(false);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [currentMinute, setCurrentMinute] = useState(25);
  const [clickedIndex, setClickedIndex] = useState(0);
  const [isStartClicked, setStartClicked] = useState(false);

  const timerBar = [
    {
      name: "Pomodoro",
      time: 25,
    },
    {
      name: "Short Break",
      time: 5,
    },
    {
      name: "Long Break",
      time: 10,
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!timerRunning) {
        return () => clearInterval(intervalId);
      }
      if (seconds > 0 && timerRunning) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(intervalId);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [seconds, minutes, timerRunning]);

  function handleRestartButton() {
    setMinutes(currentMinute);
    setSeconds(0);
    setTimerRunning(false);
    setStartClicked(false);
  }

  function handleTimerRunning() {
    setTimerRunning(!timerRunning);
    setStartClicked(!isStartClicked);
    console.log("123");
  }

  function handleTimerTypeButton(time, index) {
    setCurrentMinute(time);
    setMinutes(time);
    setSeconds(0);
    setTimerRunning(false);
    setClickedIndex(index);
    setStartClicked(false);
  }

  return (
    <div className="background">
      <div className="nav-bar">
        <Logo name={`Pomodoro \n+ white noise`} />
        <div className="login-register">
          <div className="settings-icon">
            <button className="material-symbols-outlined">settings</button>
          </div>
          <LoginButton name="Login / Register" />
        </div>
      </div>

      <div className="timer-container">
        <div className="button-type-container">
          {timerBar.map((value, index) => {
            return (
              <TimerTypeButton
                key={index}
                name={value.name}
                index={index}
                clickedIndex={clickedIndex}
                onTypeClick={() => {
                  handleTimerTypeButton(value.time, index);
                }}
              />
            );
          })}
        </div>
        <Timer
          timerRunning={timerRunning}
          minutes={minutes}
          seconds={seconds}
        />
        <div className="start-restart-container">
          <StartButton
            className="start-button"
            isStartClicked={isStartClicked}
            onStartClick={handleTimerRunning}
          />
          <div className="restart-icon">
            <RestartButton onRestartClick={handleRestartButton} />
          </div>
        </div>
        <div className="scoreboard">
          <TimerTypeButton name="Scoreboard" index={1} />
        </div>
      </div>

      <div className="bottom"></div>
    </div>
  );
}

export default App;
