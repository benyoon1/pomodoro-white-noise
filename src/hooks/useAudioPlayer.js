import { useState, useCallback } from "react";
import Sound1 from "../assets/UnderwaterLoop.wav";
import Sound2 from "../assets/UnderwaterNoiseFixed.wav";
import Sound3 from "../assets/PlaneNoiseFixed.wav";

const useAudioPlayer = (audioRef, setSelectedButton) => {
  const [isPlayClicked, setPlayClicked] = useState(false);
  const [isVolumeClicked, setVolumeClicked] = useState(false);
  const [isVolumeMuted, setVolumeMuted] = useState(false);
  const [volume, setVolume] = useState(70);
  const [whiteNoise, setWhiteNoise] = useState(Sound1);
  const sounds = [Sound1, Sound2, Sound3];
  const [soundCount, setSoundCount] = useState(0);
  const [audioContext, setAudioContext] = useState(null);
  const [source, setSource] = useState(null);
  const [gainNode, setGainNode] = useState(null);

  const playAudio = useCallback(
    (sound) => {
      const context = new AudioContext();
      setAudioContext(context);

      fetch(sound)
        .then((response) => response.arrayBuffer())
        .then((arrayBuffer) => context.decodeAudioData(arrayBuffer))
        .then((audioBuffer) => {
          const sourceNode = context.createBufferSource();
          sourceNode.buffer = audioBuffer;
          sourceNode.loop = true;

          const gainNode = context.createGain();
          const fadeDuration = 0.6;
          gainNode.gain.setValueAtTime(0, context.currentTime);
          gainNode.gain.linearRampToValueAtTime(
            volume / 100,
            context.currentTime + fadeDuration
          );

          sourceNode.connect(gainNode).connect(context.destination);
          sourceNode.start(0);
          setSource(sourceNode);
          setGainNode(gainNode);
        });

      setPlayClicked(true);
    },
    [volume]
  );

  const stopAudio = useCallback(() => {
    if (source && gainNode && audioContext) {
      const currentTime = audioContext.currentTime;
      gainNode.gain.setValueAtTime(gainNode.gain.value, currentTime);
      const fadeDuration = 0.25;
      gainNode.gain.linearRampToValueAtTime(0, currentTime + fadeDuration);

      setTimeout(() => {
        source.stop();
      }, fadeDuration * 1000);

      setPlayClicked(false);
    }
  }, [audioContext, gainNode, source]);

  const handleAudioPlayer = useCallback(() => {
    const audioElement = audioRef.current;
    if (!isPlayClicked) {
      audioElement.play();
      playAudio(whiteNoise);
    } else {
      stopAudio();
      audioElement.pause();
    }
  }, [isPlayClicked, playAudio, stopAudio, whiteNoise, audioRef]);

  const handleVolumeClick = () => {
    if (!isVolumeClicked) {
      setVolumeClicked(true);
    } else {
      setVolumeClicked(false);
    }
  };

  const handleVolumeChange = (volume) => {
    if (volume === 0) {
      setVolumeMuted(true);
    } else {
      setVolumeMuted(false);
    }
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
      nextSound();
      if (soundCount === 2) {
        setSoundCount(0);
        playAudio(sounds[0]);
      } else {
        playAudio(sounds[soundCount + 1]);
      }
    } else {
      nextSound();
    }
  };

  const nextSound = () => {
    if (soundCount === 2) {
      setSoundCount(0);
      setWhiteNoise(sounds[0]);
      setSelectedButton(0);
    } else {
      setSoundCount(soundCount + 1);
      setWhiteNoise(sounds[soundCount + 1]);
      setSelectedButton(soundCount + 1);
    }
  };

  const handleAudioSelection = (sound) => {
    setWhiteNoise(sounds[sound]);
    setSoundCount(sound);
    if (isPlayClicked) {
      stopAudio();
      playAudio(sounds[sound]);
    }
  };

  // Media Session API
  if ("mediaSession" in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: "Pomodoro and white noise.",
    });

    const audioElement = document.getElementById("myAudio");

    navigator.mediaSession.setActionHandler("play", function () {
      //handleAudioPlayer();
      audioElement.play();
      playAudio(whiteNoise);
    });

    navigator.mediaSession.setActionHandler("pause", function () {
      //handleAudioPlayer();
      stopAudio();
      audioElement.pause();
    });

    navigator.mediaSession.setActionHandler("nexttrack", function () {
      handleNextButton();
    });
  }

  return {
    isPlayClicked,
    isVolumeClicked,
    isVolumeMuted,
    volume,
    handleAudioPlayer,
    handleVolumeClick,
    handleVolumeChange,
    handleNextButton,
    setVolumeMuted,
    handleAudioSelection,
  };
};

export default useAudioPlayer;
