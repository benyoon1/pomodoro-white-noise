import { useState, useEffect, useCallback } from "react";
import { clearInterval, setInterval } from "worker-timers";
import BeepBeep from "../assets/WristWatchAlarmSound.mp3";

const useTimer = ({ handleAudioPlayer, isPlayClicked }) => {
  const [timerRunning, setTimerRunning] = useState(false);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [currentMinute, setCurrentMinute] = useState(25);
  const [isStartClicked, setStartClicked] = useState(false);
  const [startClickedNum, setStartClickedNum] = useState(0);
  const [clickedIndex, setClickedIndex] = useState(0);

  const playBeepBeep = useCallback(() => {
    let audio = new Audio(BeepBeep);
    audio.play();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!timerRunning) return () => clearInterval(intervalId);

      if (seconds > 0 && timerRunning) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          setStartClicked(false);
          setTimerRunning(false);
          handleAudioPlayer();
          playBeepBeep();
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [seconds, minutes, timerRunning, playBeepBeep, handleAudioPlayer]);

  useEffect(() => {
    document.title =
      startClickedNum === 0
        ? "Pomodoro + white noise"
        : `${minutes}:${seconds < 10 ? `0${seconds}` : seconds} Pomodoro Timer`;
  }, [minutes, seconds, startClickedNum]);

  const handleStartTimer = () => {
    if (minutes === 0 && seconds === 0 && !isStartClicked) {
      setMinutes(currentMinute);
      setSeconds(0);
      setTimerRunning(true);
      setStartClicked(true);
    } else {
      setTimerRunning(!timerRunning);
      setStartClicked(!isStartClicked);
      setStartClickedNum(startClickedNum + 1);
    }
    if (!isStartClicked && !isPlayClicked) {
      handleAudioPlayer();
    } else if (isStartClicked && isPlayClicked) {
      handleAudioPlayer();
    }
  };

  const handleRestartButton = () => {
    setMinutes(currentMinute);
    setSeconds(0);
    setTimerRunning(false);
    setStartClicked(false);
  };

  const handleTimerTypeButton = (time, index) => {
    setCurrentMinute(time);
    setMinutes(time);
    setSeconds(0);
    setTimerRunning(false);
    setClickedIndex(index);
    setStartClicked(false);
  };

  return {
    timerRunning,
    minutes,
    seconds,
    isStartClicked,
    clickedIndex,
    handleStartTimer,
    handleRestartButton,
    handleTimerTypeButton,
  };
};

export default useTimer;
