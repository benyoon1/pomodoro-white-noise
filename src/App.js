import React from "react";
import "./App.css";
import Timer from "./components/Timer/Timer";
import TimerTypeButton from "./components/TimerTypeButton/TimerTypeButton";
import StartButton from "./components/StartButton/StartButton";
import Logo from "./components/Logo/Logo";
import LoginButton from "./components/LoginButton/LoginButton";

function App() {
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
          <TimerTypeButton name="Pomodoro" />
          <TimerTypeButton name="Short Break" />
          <TimerTypeButton name="Long Break" />
        </div>
        <Timer />
        <div className="start-restart-container">
          <StartButton className="start-button" name="Start" />
          <div className="restart-icon">
            <button className="material-symbols-outlined">refresh</button>
          </div>
        </div>
        <div className="scoreboard">
          <TimerTypeButton name="Scoreboard" />
        </div>
      </div>

      <div className="bottom"></div>
    </div>
  );
}

export default App;
