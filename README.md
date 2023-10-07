# Description

This project is a Pomodoro timer with a built-in white noise player. It uses Web Audio API to loop short audio files seamlessly and control the volume.

Once the timer ends, it triggers a beeping audio and notifies the user.


![ezgif com-video-to-gif (1)](https://github.com/benyoon1/pomodoro-white-noise/assets/86860367/51a2a941-1e99-4d6c-a398-b9840048383c)

By clicking **Pomodoro**, **Short Break**, and **Long Break**, you can choose from 3 different types of timer - 25, 5, and 10 minutes respectively.

By clicking the **next** button, you can choose from three white noise samples.




## After cloning:
- Run npm install.
- Run npm start.

## Known Bugs:
- When the timer is left in the background and is no longer an active tab in Chrome, a slight slowdown is noticed when compared to a real timer (~ 10 sec.)
- In rare cases, the timer gets stuck during the performance due to fixing the accuracy problem mentioned above. It employs the *performance.now()* method to get an accurate measure of *seconds* left. However, it misbehaves sometimes by subtracting one more second which leads to the *seconds* value going below zero. Please refer to the *App.js* file for more details.
