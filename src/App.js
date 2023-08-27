import React, { useState, useEffect, useCallback } from "react";
import addNotification from "react-push-notification";
import "./App.css";
import Timer from "./components/Timer/Timer";
import TimerTypeButton from "./components/TimerTypeButton/TimerTypeButton";
import StartButton from "./components/StartButton/StartButton";
import Logo from "./components/Logo/Logo";
// import LoginButton from "./components/LoginButton/LoginButton";
import RestartButton from "./components/RestartButton/RestartButton";
import PlayButton from "./components/AudioPlayerButtons/PlayButton";
import BeepBeep from "./assets/WristWatchAlarmSound.mp3";
import Sound1 from "./assets/UnderwaterLoop.wav";
import Sound2 from "./assets/UnderwaterNoise2.mp3";
import Sound3 from "./assets/PlaneNoise.mp3";
//import Sound4 from "./assets/60minNoise.mp3";
import NextSongButton from "./components/AudioPlayerButtons/NextSongButton";
import MoreButton from "./components/AudioPlayerButtons/MoreButton";
import SoundButton from "./components/AudioPlayerButtons/SoundButton";
import VolumeSlider from "./components/AudioPlayerButtons/VolumeSlider";

function App() {
  const [timerRunning, setTimerRunning] = useState(false);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);

  const [currentMinute, setCurrentMinute] = useState(25);
  const [clickedIndex, setClickedIndex] = useState(0);
  const [isStartClicked, setStartClicked] = useState(false);
  const [isPlayClicked, setPlayClicked] = useState(false);
  const [isVolumeClicked, setVolumeClicked] = useState(false);
  const [startClickedNum, setStartClickedNum] = useState(0);

  const [atStart, setAtStart] = useState(0);
  const [timeNow, setTimeNow] = useState(0);
  const [timeThen, setTimeThen] = useState(0);

  // Volume Slider
  const [audioContext, setAudioContext] = useState(null);
  const [source, setSource] = useState(null);
  const [gainNode, setGainNode] = useState(null);
  const [volume, setVolume] = useState(75);
  const [whiteNoise, setWhiteNoise] = useState(Sound1);
  const sounds = [Sound1, Sound2, Sound3];
  const [soundCount, setSoundCount] = useState(0);

  const [count, setCount] = useState(0);

  useEffect(() => {
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
        setSource(sourceNode);
        setGainNode(gainNode);
      });

    console.log(soundCount);
  }, [whiteNoise, soundCount]);

  const playAudio = () => {
    const newSource = audioContext.createBufferSource();
    newSource.buffer = source.buffer;
    newSource.loop = true;
    newSource.connect(gainNode).connect(audioContext.destination);
    newSource.start(0);
    setSource(newSource);
  };

  const stopAudio = () => {
    if (source) {
      source.stop();
    }
  };

  //Webaudio API
  // const audioContextRef = useRef();

  // const initSound = () => {
  //   const audioContext = new AudioContext();
  //   const volumeControl = audioContext.createGain();

  //   volumeControl.gain.setValueAtTime(volume / 100, 0);

  //   let source = audioContext.createBufferSource();
  //   let buf;
  //   fetch(Sound1) // can be XHR as well
  //     .then((resp) => resp.arrayBuffer())
  //     .then((buf) => audioContext.decodeAudioData(buf)) // can be callback as well
  //     .then((decoded) => {
  //       source.buffer = buf = decoded;
  //       source.loop = true;
  //     });
  //   //source.connect(audioContext.destination);
  //   source.connect(volumeControl);
  //   volumeControl.connect(audioContext.destination);
  //   source.start();

  //   // Store context and start suspended
  //   audioContextRef.current = audioContext;
  //   audioContext.suspend();
  // };

  // const togglePlayer = () => {
  //   if (audioPlaying) {
  //     audioContextRef.current.suspend();
  //   } else {
  //     audioContextRef.current.resume();
  //   }
  //   setaudioPlaying((play) => !play);
  // };

  // useEffect(() => {
  //   if (audioContextRef.current) {
  //     audioContextRef.current.gain = volume / 100;
  //     console.log(volume);
  //   }
  // }, [volume]);

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
    let timeElapsed = timeNow - atStart;

    // timeThen - 1 because setInterval has 1000ms delay on first iteration
    // and timeElapsed on that timing is 0, which does not change value
    let secondsLeft = Math.ceil(timeThen - 1 - timeElapsed / 1000);

    const intervalId = setInterval(() => {
      setTimeNow(performance.now());
      if (!timerRunning) {
        return () => clearInterval(intervalId);
      }

      // reset performance.now at 1 sec because setInterval delay 1000ms, reset before cycle
      if (seconds === 1 && timerRunning) {
        setAtStart(performance.now());
      }
      if (seconds > 0 && timerRunning) {
        setSeconds(secondsLeft);
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
          setTimeThen(60);
        }
      }
      // console.log("time then: " + timeThen);
      // console.log("milisec: " + timeElapsed / 1000);
      // console.log("seconds: " + seconds);
      // console.log("\n");
    }, 1000);

    return () => clearInterval(intervalId);
  }, [
    seconds,
    minutes,
    timerRunning,
    playBeepBeep,
    atStart,
    timeNow,
    timeThen,
  ]);

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

    if (!timerRunning) {
      setTimeThen(seconds);
    }

    setAtStart(performance.now()); // initialize start time
    setTimeNow(performance.now()); // set time now because timenow-atstart later so no neg num
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
    setVolume(volume);
    gainNode.gain.value = volume / 100;
  };

  const handleNextButton = () => {
    stopAudio();
    nextSound();
    //testCount();
    //setPlayClicked(!isPlayClicked);
  };

  const nextSound = () => {
    if (soundCount === 2) {
      setSoundCount(0);
      //setWhiteNoise(sounds[0]);
      changeSound(sounds[0]);
    } else {
      setSoundCount(soundCount + 1);
      //setWhiteNoise(sounds[soundCount + 1]);
      changeSound(sounds[soundCount + 1]);
    }
  };

  const changeSound = (newSound) => {
    fetch(newSound)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
      .then((audioBuffer) => {
        const newSource = audioContext.createBufferSource();
        newSource.buffer = audioBuffer;
        newSource.loop = true;
        newSource.connect(gainNode).connect(audioContext.destination);
        newSource.start(0);
        source.stop(0);
        setSource(newSource);
      });
  };

  const testCount = () => {
    setCount(count + 1);
  };

  return (
    <div className="background">
      <div className="nav-bar">
        <Logo name={`Pomodoro \n+ white noise`} />
        <div className="login-register">
          {/* <div className="settings-icon">
            <button className="material-symbols-outlined">settings</button>
          </div> */}
          {/* <LoginButton name="Login / Register" /> */}
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
          <MoreButton />
          <StartButton
            className="start-button"
            isStartClicked={isStartClicked}
            onStartClick={handleTimerRunning}
          />
          <RestartButton onRestartClick={handleRestartButton} />
        </div>
        <div className="audio-player">
          {/* <TimerTypeButton name="Scoreboard" index={1} /> */}
          <SoundButton onVolumeClick={handleVolumeClick} />
          <PlayButton
            id="audio"
            isPlayClicked={isPlayClicked}
            onPlayClick={handlePlayer}
          />
          <NextSongButton onNextClick={handleNextButton} />
        </div>
        {isVolumeClicked ? (
          <VolumeSlider onVolumeChange={handleVolumeChange} vol={volume} />
        ) : (
          <div style={{ marginTop: "1.25rem" }}>&nbsp;</div>
        )}
      </div>

      <div className="bottom"></div>
    </div>
  );
}

export default App;
