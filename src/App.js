import React, { useState, useEffect, useCallback } from "react";
import addNotification from "react-push-notification";
import "./App.css";
import Timer from "./components/Timer/Timer";
import TimerTypeButton from "./components/TimerTypeButton/TimerTypeButton";
import StartButton from "./components/StartButton/StartButton";
import Logo from "./components/Logo/Logo";
import LoginButton from "./components/LoginButton/LoginButton";
import RestartButton from "./components/RestartButton/RestartButton";
import PlayButton from "./components/AudioPlayerButtons/PlayButton";
import BeepBeep from "./assets/WristWatchAlarmSound.mp3";

import NextSongButton from "./components/AudioPlayerButtons/NextSongButton";
import MoreButton from "./components/AudioPlayerButtons/MoreButton";

function App() {
  const [timerRunning, setTimerRunning] = useState(false);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [currentMinute, setCurrentMinute] = useState(25);
  const [clickedIndex, setClickedIndex] = useState(0);
  const [isStartClicked, setStartClicked] = useState(false);
  const [startClickedNum, setStartClickedNum] = useState(0);

  const playBeepBeep = useCallback(() => {
    let audio = new Audio(BeepBeep);
    audio.play();
    pushNotification();
  }, []);

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

  const pushNotification = () => {
    addNotification({
      title: "Pomodoro + white noise",
      subtitle: "",
      message: "Timer is up!",
      theme: "darkblue",
      native: true, // when using native, your OS will handle theming.
    });
  };

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
          setStartClicked(false);
          playBeepBeep();
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [seconds, minutes, timerRunning, playBeepBeep]);

  useEffect(() => {
    if (startClickedNum === 0) {
      document.title = "Pomodoro + white noise";
    } else {
      document.title =
        minutes +
        ":" +
        (seconds < 10 ? `0${seconds}` : seconds) +
        " Pomodoro Timer";
    }
  }, [minutes, seconds, startClickedNum]);

  function handleRestartButton() {
    setMinutes(currentMinute);
    setSeconds(0);
    setTimerRunning(false);
    setStartClicked(false);
  }

  function handleTimerRunning() {
    // fix bug when timer is up we can click start multiple times
    // and notification keeps popping out

    if (minutes === 0 && seconds === 0) {
      if (isStartClicked === false) {
        setMinutes(currentMinute);
        setSeconds(0);
        setTimerRunning(true);
        setStartClicked(true);
      }
    } else {
      setTimerRunning(!timerRunning);
      setStartClicked(!isStartClicked);
      setStartClickedNum(startClickedNum + 1);
    }
  }

  function handleTimerTypeButton(time, index) {
    setCurrentMinute(time);
    setMinutes(time);
    setSeconds(0);
    setTimerRunning(true); // not a bug, user can start timer right away when clicking timer type
    setClickedIndex(index);
    setStartClicked(true);
  }

  return (
    <div className="background">
      <div className="nav-bar">
        <Logo name={`Pomodoro \n+ white noise`} />
        <div className="login-register">
          {/* <div className="settings-icon">
            <button className="material-symbols-outlined">settings</button>
          </div> */}
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
        <div className="audio-player">
          {/* <TimerTypeButton name="Scoreboard" index={1} /> */}
          <MoreButton />
          <PlayButton />
          <NextSongButton />
        </div>
      </div>

      <div className="bottom"></div>
    </div>
  );
}

export default App;
