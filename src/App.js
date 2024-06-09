import React, { useRef } from "react";
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
import SilentSound from "./assets/15-seconds-of-silence.mp3";
import useTimer from "./hooks/useTimer";
import useAudioPlayer from "./hooks/useAudioPlayer";

const App = () => {
  const audioRef = useRef(null);

  const {
    isPlayClicked,
    isVolumeClicked,
    isVolumeHovered,
    volume,
    handleAudioPlayer,
    handleVolumeClick,
    handleVolumeChange,
    handleNextButton,
    setVolumeHovered,
    handleAudioSelection,
  } = useAudioPlayer(audioRef);

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

  const timerBar = [
    { name: "25", time: 25 },
    { name: "5", time: 5 },
    { name: "10", time: 10 },
  ];

  return (
    <div className="global-container">
      <div className="nav-bar">&nbsp;</div>
      <div className="main-container">
        <div className="left-div">
          <Logo name={`Pomodoro.`} />
          <LogoBottom name={`and white noise.`} />
          <Timer
            timerRunning={timerRunning}
            minutes={minutes}
            seconds={seconds}
          />
          <div className="left-empty-space">&nbsp;</div>
        </div>
        <div className="right-div">
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
              <MoreButton onAudioSelected={handleAudioSelection} />
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
                  isVolumeClicked={isVolumeClicked}
                  onMouseEnter={() => setVolumeHovered(true)}
                  onMouseLeave={() => setVolumeHovered(false)}
                />
                <PlayButton
                  alt="audio"
                  isPlayClicked={isPlayClicked}
                  onPlayClick={handleAudioPlayer}
                />
                <NextSongButton onNextClick={handleNextButton} />
              </div>
              <div className="volume-slider">
                {isVolumeHovered ? (
                  <VolumeSlider
                    onVolumeChange={handleVolumeChange}
                    vol={volume}
                    onMouseEnter={() => setVolumeHovered(true)}
                    onMouseLeave={() => setVolumeHovered(false)}
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
        </div>
      </div>
      <div className="footer">
        Pomodoro timer and white noise player.
        <br />
        Boost your productivity and focus.{" "}
        <span className="hide-on-small-screen">
          Feel free to contribute on{" "}
          <a href="https://github.com/benyoon1/pomodoro-white-noise">GitHub.</a>
        </span>
      </div>
    </div>
  );
};

export default App;
