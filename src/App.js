import React, { useState, useEffect, useCallback } from "react";
//import addNotification from "react-push-notification";
import "./App.css";
import Timer from "./components/Timer/Timer";
import TimerTypeButton from "./components/TimerTypeButton/TimerTypeButton";
import StartButton from "./components/StartButton/StartButton";
import Logo from "./components/Logo/Logo";
import LogoBottom from "./components/Logo/LogoBottom";
import ProfileButton from "./components/ProfileButton/ProfileButton";
import GithubButton from "./components/ProfileButton/GithubButton";
import RestartButton from "./components/RestartButton/RestartButton";
import PlayButton from "./components/AudioPlayerButtons/PlayButton";
import BeepBeep from "./assets/WristWatchAlarmSound.mp3";
import Sound1 from "./assets/UnderwaterLoop.wav";
import Sound2 from "./assets/UnderwaterNoiseFixed.wav";
import Sound3 from "./assets/PlaneNoiseFixed.wav";
import NextSongButton from "./components/AudioPlayerButtons/NextSongButton";
import MoreButton from "./components/AudioPlayerButtons/MoreButton";
import SoundButton from "./components/AudioPlayerButtons/SoundButton";
import VolumeSlider from "./components/AudioPlayerButtons/VolumeSlider";

import { clearInterval, setInterval } from "worker-timers";

const App = () => {
  const [timerRunning, setTimerRunning] = useState(false);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);

  const [currentMinute, setCurrentMinute] = useState(25);
  const [clickedIndex, setClickedIndex] = useState(0);
  const [isStartClicked, setStartClicked] = useState(false);
  const [isPlayClicked, setPlayClicked] = useState(false);
  const [isVolumeClicked, setVolumeClicked] = useState(false);
  const [startClickedNum, setStartClickedNum] = useState(0);

  // Volume Slider
  const [audioContext, setAudioContext] = useState(null);
  const [source, setSource] = useState(null);
  const [gainNode, setGainNode] = useState(null);
  const [volume, setVolume] = useState(50);
  const [whiteNoise, setWhiteNoise] = useState(Sound1);
  const sounds = [Sound1, Sound2, Sound3];
  const [soundCount, setSoundCount] = useState(0);

  // Temp fix user gesture
  const playAudio = () => {
    const context = new AudioContext();
    setAudioContext(context);

    fetch(whiteNoise)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => context.decodeAudioData(arrayBuffer))
      .then((audioBuffer) => {
        const sourceNode = context.createBufferSource();
        sourceNode.buffer = audioBuffer;
        sourceNode.loop = true;

        const gainNode = context.createGain();
        gainNode.gain.value = volume / 100;

        sourceNode.connect(gainNode).connect(context.destination);
        sourceNode.start(0);
        setSource(sourceNode);
        setGainNode(gainNode);
      });

    //console.log(soundCount);
  };

  const stopAudio = () => {
    if (source) {
      source.stop();
    }
  };

  const playBeepBeep = useCallback(() => {
    let audio = new Audio(BeepBeep);
    audio.play();
    //pushNotification();
  }, []);

  const timerBar = [
    {
      name: "25",
      time: 25,
    },
    {
      name: "5",
      time: 5,
    },
    {
      name: "10",
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
          setStartClicked(false);
          playBeepBeep();
          setTimerRunning(false);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [seconds, minutes, timerRunning, playBeepBeep]);

  // Bar title
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

  const handleRestartButton = () => {
    setMinutes(currentMinute);
    setSeconds(0);
    setTimerRunning(false);
    setStartClicked(false);
  };

  const handleTimerRunning = () => {
    // Fixed bug when timer is up we can click start multiple times
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
  };

  const handleTimerTypeButton = (time, index) => {
    setCurrentMinute(time);
    setMinutes(time);
    setSeconds(0);
    setTimerRunning(false);
    setClickedIndex(index);
    setStartClicked(false);
  };

  const handlePlayer = () => {
    setPlayClicked(!isPlayClicked);
    if (!isPlayClicked) {
      playAudio();
    } else {
      stopAudio();
    }
  };

  const handleVolumeClick = () => {
    setVolumeClicked(!isVolumeClicked);
  };

  const handleVolumeChange = (volume) => {
    if (audioContext === null) {
      setVolume(volume);
    } else {
      setVolume(volume);
      gainNode.gain.value = volume / 100;
    }
  };

  const handleNextButton = () => {
    if (isPlayClicked) {
      stopAudio();
      setPlayClicked(!isPlayClicked);
    }
    nextSound();
  };

  const nextSound = () => {
    if (soundCount === 2) {
      setSoundCount(0);
      setWhiteNoise(sounds[0]);
    } else {
      setSoundCount(soundCount + 1);
      setWhiteNoise(sounds[soundCount + 1]);
    }
  };

  return (
    <div className="background">
      <div className="nav-bar">
        <GithubButton />
        <ProfileButton name={"B"} />
      </div>
      <div className="global-container">
        <div className="left-div">
          <Logo name={`Pomodoro.`} />
          <LogoBottom name={`and white noise.`} />
          <Timer
            timerRunning={timerRunning}
            minutes={minutes}
            seconds={seconds}
          />
          <div className="left-empty-space">&nbsp;</div>
          <div className="bottom">
            Pomodoro timer and white noise player. Designed to save you time.
            <br />© 2024 Ben Yoon. All rights reserved.
          </div>
        </div>
        <div className="right-div">
          <div className="matrix-container">
            <div className="timer-row">
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

            <div className="start-row">
              <MoreButton />
              <StartButton
                className="start-button"
                isStartClicked={isStartClicked}
                onStartClick={handleTimerRunning}
              />
              <RestartButton onRestartClick={handleRestartButton} />
            </div>
            <div>
              <div className="audio-row">
                <SoundButton onVolumeClick={handleVolumeClick} />
                <PlayButton
                  alt="audio"
                  isPlayClicked={isPlayClicked}
                  onPlayClick={handlePlayer}
                />

                <NextSongButton onNextClick={handleNextButton} />
              </div>
              <div className="volume-slider">
                {isVolumeClicked ? (
                  <VolumeSlider
                    onVolumeChange={handleVolumeChange}
                    vol={volume}
                  />
                ) : (
                  <div>&nbsp;</div>
                )}
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
