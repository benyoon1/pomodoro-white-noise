# Description

This project is a Pomodoro timer with a built-in white noise player. It uses Web Audio API to loop short audio files seamlessly and control the volume.

Once the timer ends, it triggers a beeping audio and notifies the user.

Feel free to try it out at: https://pomodoroandwhitenoise.com/

## After cloning:

- Run npm install.
- Run npm start.

## Known Bugs:

- When the timer is left in the background and is no longer an active tab in Chrome, a slight slowdown is noticed when compared to a real timer (~ 10 sec.)
- In rare cases, the timer gets stuck during the performance due to fixing the accuracy problem mentioned above. It employs the _performance.now()_ method to get an accurate measure of _seconds_ left. However, it misbehaves sometimes by subtracting one more second which leads to the _seconds_ value going below zero. Please refer to the _App.js_ file for more details.
