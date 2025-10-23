import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Timer from "./components/Timer/Timer";
import TimerTypeButton from "./components/TimerTypeButton/TimerTypeButton";
import StartButton from "./components/StartButton/StartButton";
import Logo from "./components/Logo/Logo";
import LogoBottom from "./components/Logo/LogoBottom";
import RestartButton from "./components/RestartButton/RestartButton";
import PlayButton from "./components/AudioPlayerButtons/PlayButton";
import MoreButton from "./components/AudioPlayerButtons/MoreButton";
import SoundButton from "./components/AudioPlayerButtons/SoundButton";
import VolumeSlider from "./components/AudioPlayerButtons/VolumeSlider";
import NextSongButton from "./components/AudioPlayerButtons/NextSongButton";
import DarkMode from "./components/DarkMode/DarkMode";
import SilentSound from "./assets/15-seconds-of-silence.mp3";
import useTimer from "./hooks/useTimer";
import useAudioPlayer from "./hooks/useAudioPlayer";
import useRespiration from "./hooks/useRespiration";
import Respiration from "./components/RespirationContainer/Respiration";

const App = () => {
  const audioRef = useRef(null);
  const [selectedButton, setSelectedButton] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Load the dark mode state from localStorage
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const {
    isPlayClicked,
    isVolumeClicked,
    isVolumeMuted,
    volume,
    handleAudioPlayer,
    handleVolumeClick,
    handleVolumeChange,
    handleNextButton,
    handleAudioSelection,
  } = useAudioPlayer(audioRef, setSelectedButton);

  const {
    timerRunning,
    minutes,
    seconds,
    isStartClicked,
    clickedIndex,
    handleStartTimer,
    handleRestartButton,
    handleTimerTypeButton,
  } = useTimer({
    handleAudioPlayer,
    isPlayClicked,
  });

  const {
    counter,
    handleRespiration,
    isResp,
    respirationStage
  } = useRespiration()

  useEffect(() => {
    // Apply the dark mode class to the document element
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light"
    );
    // Save the dark mode state to localStorage
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const timerBar = [
    { name: "25", time: 25 },
    { name: "5", time: 5 },
    { name: "10", time: 10 },
  ];

  return (
    <div className="global-container">
      <div className="nav-bar">
        <DarkMode isDarkMode={isDarkMode} onToggle={toggleDarkMode} />
      </div>
      <div className="main-container">
        <div className="logo-timer-container">
          <Logo name={`Pomodoro.`} />
          <LogoBottom name={`and white noise.`} />
          <Timer
            timerRunning={timerRunning}
            minutes={minutes}
            seconds={seconds}
          />
          <div className="left-empty-space">&nbsp;</div>
        </div>
        <div className="larger-matrix-container">
          <div className="matrix-container">
            <div className="timer-row">
              {timerBar.map((value, index) => (
                <TimerTypeButton
                  key={index}
                  name={value.name}
                  index={index}
                  clickedIndex={clickedIndex}
                  onTypeClick={() => handleTimerTypeButton(value.time, index)}
                />
              ))}
            </div>
            <div className="start-row">
              <MoreButton
                onAudioSelected={handleAudioSelection}
                selectedButton={selectedButton}
                setSelectedButton={setSelectedButton}
              />
              <StartButton
                className="start-button"
                isStartClicked={isStartClicked}
                onStartClick={handleStartTimer}
              />
              <RestartButton onRestartClick={handleRestartButton} />
            </div>
            <div>
              <div className="audio-row">
                <SoundButton
                  onVolumeClick={handleVolumeClick}
                  isVolumeMuted={isVolumeMuted}
                />
                <PlayButton
                  alt="audio"
                  isPlayClicked={isPlayClicked}
                  onPlayClick={handleAudioPlayer}
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
                <div>
                  <audio id="myAudio" ref={audioRef} loop>
                    <source src={SilentSound} type="audio/mpeg" />
                  </audio>
                </div>
              </div>
            </div>
          </div>
          <Respiration counter={counter} handleRespiration={handleRespiration} isResp={isResp} respirationStage={respirationStage}></Respiration>
        </div>
      </div>
      <div className="footer">
        This is an open source project, feel free to contribute on{" "}
        <a href="https://github.com/benyoon1/pomodoro-white-noise">GitHub.</a>
        <br />
        For bugs and feature requests, please create an issue{" "}
        <a href="https://github.com/benyoon1/pomodoro-white-noise/issues">
          here.
        </a>
      </div>
    </div>
  );
};

export default App;
