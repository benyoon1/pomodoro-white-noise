# Description

This project is a Pomodoro timer with a built-in white noise player. It uses Web Audio API to loop short audio files seamlessly and control the volume.

Feel free to try it out at: https://pomodoroandwhitenoise.com/

## Preview:

![gif1](https://github.com/benyoon1/pomodoro-white-noise/assets/86860367/a94fc995-f211-4822-bb6f-510b022eeb96)

![gif2](https://github.com/benyoon1/pomodoro-white-noise/assets/86860367/a1732d21-5c13-4152-b340-568404273556)

## After cloning:

- Run npm install.
- Run npm start.

## Known Bugs:

- When the timer is left in the background and is no longer an active tab in Chrome, a slight slowdown is noticed when compared to a real timer (~ 10 sec.)
- In rare cases, the timer gets stuck during the performance due to fixing the accuracy problem mentioned above. It employs the _performance.now()_ method to get an accurate measure of _seconds_ left. However, it misbehaves sometimes by subtracting one more second which leads to the _seconds_ value going below zero. Please refer to the _App.js_ file for more details.
