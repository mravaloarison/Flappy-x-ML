# Flaappy-x-ML

The classic **Flappy Bird** game but with face detection. Using **Mediapipe** for face detection and **Kaboom.js** for the game mechanics, the bird's vertical position is controlled by the movement of your nose detected through your webcam.

## Demo Links

- [Live Demo](#)  
- [Video Demo](#)

⚠️ **First-time users may need to refresh the page twice for the game to work correctly.** This is due to the face detection initialization timing and will be addressed.

## How It Works

1. **Face Detection**: The game uses **Mediapipe's face detection model** to detect the position of your nose in real time.
   
   ```js
   function getLandmarks(results) {
       if (results.detections.length > 0) {
           const newPos = results.detections[0].landmarks[4].y * 591;
           const event = new CustomEvent("updatedPosition", {
               detail: { newPos },
           });
           window.dispatchEvent(event);
       }
   }
   ```

2. **Bird Movement**: The bird's movement is based on the nose's vertical position, and smooth transition is achieved using linear interpolation.

   ```js
   window.addEventListener("updatedPosition", (event) => {
       targetY = event.detail.newPos;
   });
   
   function smoothMove() {
       if (GAME_OVER) return;
   
       const delta = targetY - currentY;
       if (Math.abs(delta) > 0.1) {
           currentY = currentY + delta * lerpFactor;
           player.pos.y = currentY;
       } else {
           currentY = targetY;
           player.pos.y = currentY;
       }
   }
   ```
   
## Technology used
- Kaboom.js: For the game mechanics and gamification.
- Mediapipe: For face detection and landmark tracking.

  
