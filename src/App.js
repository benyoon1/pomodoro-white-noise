import React, { useState, useEffect, useCallback, useRef } from "react";
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

function App() {
  const [timerRunning, setTimerRunning] = useState(false);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [minutes2, setMinutes2] = useState(25);
  const [seconds2, setSeconds2] = useState(0);

  const [currentMinute, setCurrentMinute] = useState(25);
  const [clickedIndex, setClickedIndex] = useState(0);
  const [isStartClicked, setStartClicked] = useState(false);
  const [isPlayClicked, setPlayClicked] = useState(false);
  const [startClickedNum, setStartClickedNum] = useState(0);
  const [playClickedNum, setPlayClickedNum] = useState(0);

  const [atStart, setAtStart] = useState(0);
  const [timeNow, setTimeNow] = useState(0);
  const [timeThen, setTimeThen] = useState(0);

  const [audioPlaying, setaudioPlaying] = useState(false);
  const audioContextRef = useRef();

  const initSound = () => {
    const audioContext = new AudioContext();

    let source = audioContext.createBufferSource();
    let buf;
    fetch(Sound1) // can be XHR as well
      .then((resp) => resp.arrayBuffer())
      .then((buf) => audioContext.decodeAudioData(buf)) // can be callback as well
      .then((decoded) => {
        source.buffer = buf = decoded;
        source.loop = true;
      });
    source.connect(audioContext.destination);
    source.start();

    // Store context and start suspended
    audioContextRef.current = audioContext;
    audioContext.suspend();
  };

  const togglePlayer = () => {
    if (audioPlaying) {
      audioContextRef.current.suspend();
    } else {
      audioContextRef.current.resume();
    }
    setaudioPlaying((play) => !play);
  };

  // useEffect(() => {
  //   const audioContext = new AudioContext();

  //   let source = audioContext.createBufferSource();
  //   let buf;
  //   fetch(Sound1) // can be XHR as well
  //     .then((resp) => resp.arrayBuffer())
  //     .then((buf) => audioContext.decodeAudioData(buf)) // can be callback as well
  //     .then((decoded) => {
  //       source.buffer = buf = decoded;
  //       source.loop = true;
  //     });
  //   source.connect(audioContext.destination);
  //   source.start();

  //   // Store context and start suspended
  //   audioContextRef.current = audioContext;
  //   audioContext.suspend();

  //   // Effect cleanup function to disconnect
  //   return () => source.disconnect(audioContext.destination);
  // }, []);

  //test
  // const [dataPlaying, setDataPlaying] = useState(false);
  // const audioContextRef2 = useRef();

  // useEffect(() => {
  //   const audioContext = new AudioContext();
  //   const osc = audioContext.createOscillator();
  //   osc.type = "sine";
  //   osc.frequency.value = 880;

  //   // Connect and start
  //   osc.connect(audioContext.destination);
  //   osc.start();

  //   // Store context and start suspended
  //   audioContextRef2.current = audioContext;
  //   audioContext.suspend();

  //   // Effect cleanup function to disconnect
  //   return () => osc.disconnect(audioContext.destination);
  // }, []);

  // const toggleOscillator = () => {
  //   if (dataPlaying) {
  //     audioContextRef2.current.suspend();
  //   } else {
  //     audioContextRef2.current.resume();
  //   }
  //   setDataPlaying((play) => !play);
  // };

  // let audioContext = new AudioContext(),
  //   src = Sound1,
  //   audioData,
  //   source; // global so we can access them from handlers

  // // Load some audio (CORS need to be allowed or we won't be able to decode the data)
  // function initAudio() {
  //   fetch(src, { mode: "cors" })
  //     .then(function (resp) {
  //       return resp.arrayBuffer();
  //     })
  //     .then(decode);
  // }

  // // Decode the audio file, then start the show
  // function decode(buffer) {
  //   audioContext.decodeAudioData(buffer, playLoop);
  // }

  // // Sets up a new source node as needed as stopping will render current invalid
  // function playLoop(abuffer) {
  //   if (!audioData) audioData = abuffer; // create a reference for control buttons
  //   source = audioContext.createBufferSource(); // create audio source
  //   source.buffer = abuffer; // use decoded buffer
  //   source.connect(audioContext.destination); // create output
  //   source.loop = true; // takes care of perfect looping
  //   source.start(); // play...
  // }

  // function startmfker() {
  //   console.log(source);
  //   if (source) {
  //     console.log("123");
  //     source.stop();
  //     source = null;
  //   } else {
  //     console.log("321");
  //     playLoop(audioData);
  //   }
  // }

  // window.onload = function () {
  //   playSound();
  // };

  // function playSound() {
  //   if (AudioContext) {
  //     playAudio();
  //   } else {
  //     console.log("not working");
  //     //playNormally();
  //   }
  // }

  // function playAudio() {
  //   let audioContext = new AudioContext(),
  //     src = Sound1,
  //     audioData,
  //     source; // global so we can access them from handlers

  //   // Load some audio (CORS need to be allowed or we won't be able to decode the data)
  //   fetch(src, { mode: "cors" })
  //     .then(function (resp) {
  //       return resp.arrayBuffer();
  //     })
  //     .then(decode);

  //   // Decode the audio file, then start the show
  //   function decode(buffer) {
  //     audioContext.decodeAudioData(buffer, playLoop);
  //   }

  //   // Sets up a new source node as needed as stopping will render current invalid
  //   function playLoop(abuffer) {
  //     if (!audioData) audioData = abuffer; // create a reference for control buttons
  //     source = audioContext.createBufferSource(); // create audio source
  //     source.buffer = abuffer; // use decoded buffer
  //     source.connect(audioContext.destination); // create output
  //     source.loop = true; // takes care of perfect looping
  //     source.start(); // play...
  //   }

  //   let check2 = document.getElementById("audio2");
  //   check2.onclick = () => {
  //     console.log(source);
  //     if (source) {
  //       console.log("123");
  //       source.stop();
  //       source = null;
  //     } else {
  //       console.log("321");
  //       playLoop(audioData);
  //     }
  //   };

  //   // const audioContext = new AudioContext();
  //   // let source = audioContext.createBufferSource();
  //   // let buf;
  //   // fetch(Sound1) // can be XHR as well
  //   //   .then((resp) => resp.arrayBuffer())
  //   //   .then((buf) => audioContext.decodeAudioData(buf)) // can be callback as well
  //   //   .then((decoded) => {
  //   //     source.buffer = buf = decoded;
  //   //     source.loop = true;
  //   //     source.connect(audioContext.destination);
  //   //     check.disabled = false;
  //   //   });

  //   //let check = document.getElementById("check");
  //   // check.onchange = (e) => {
  //   //   console.log(e);
  //   //   if (check.checked) {
  //   //     source.start(0); // start our bufferSource
  //   //   } else {
  //   //     source.stop(0); // this destroys the buffer source
  //   //     source = audioContext.createBufferSource(); // so we need to create a new one
  //   //     source.buffer = buf;
  //   //     source.loop = true;
  //   //     source.connect(audioContext.destination);
  //   //   }
  // }

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
      setTimeNow(Date.now());
      if (!timerRunning) {
        return () => clearInterval(intervalId);
      }

      // reset date.now at 1 sec because setInterval delay 1000ms, reset before cycle
      if (seconds === 1 && timerRunning) {
        setAtStart(Date.now());
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
      console.log("time then: " + timeThen);
      console.log("milisec: " + timeElapsed / 1000);
      console.log("seconds: " + seconds);
      //console.log("seconds left: " + secondsLeft);
      console.log("\n");
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

  //test old timer
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!timerRunning) {
        return () => clearInterval(intervalId);
      }
      if (seconds2 > 0 && timerRunning) {
        setSeconds2(seconds2 - 1);
      }
      if (seconds2 === 0) {
        if (minutes2 === 0) {
          clearInterval(intervalId);
          //setStartClicked(false);
          //playBeepBeep();
        } else {
          setMinutes2(minutes2 - 1);
          setSeconds2(59);
        }
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [seconds2, minutes2, timerRunning]);

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
    //handleTimer2();

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

    setAtStart(Date.now()); // initialize start time
    setTimeNow(Date.now()); // set time now because timenow-atstart later so no neg num
  }

  function handleTimerTypeButton(time, index) {
    setCurrentMinute(time);
    setMinutes(time);
    setSeconds(0);
    setTimerRunning(true); // not a bug, user can start timer right away when clicking timer type
    setClickedIndex(index);
    setStartClicked(true);
  }

  function handlePlayer(e) {
    setPlayClicked(!isPlayClicked);
    if (playClickedNum === 0) {
      //playSound();
      //initAudio();
      initSound();
    }
    setPlayClickedNum(playClickedNum + 1);
    togglePlayer();
    //startmfker();
  }

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
          <PlayButton
            id="audio"
            isPlayClicked={isPlayClicked}
            onPlayClick={handlePlayer}
          />
          <NextSongButton />
        </div>
        <Timer minutes={minutes2} seconds={seconds2} />
      </div>

      <div className="bottom"></div>
    </div>
  );
}

export default App;
