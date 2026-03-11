const readAngle = (element) => {
   const raw = element.style.rotate || "0deg";
   const match = raw.match(/(-?\d+\.?\d*)deg/);
   if (!match) return 0;
   const value = Number.parseFloat(match[1]);
   return Number.isFinite(value) ? value : 0;
};

export const createSmoothSpinner = ({
   element,
   speedDegPerSec,
   accelMs = 1500,
   decelMs = 1500,
}) => {
   let angle = readAngle(element);
   let currentSpeed = 0;
   let targetSpeed = 0;
   let frameId = null;
   let lastTime = null;

   const accelRate = speedDegPerSec / (accelMs / 1000);
   const decelRate = speedDegPerSec / (decelMs / 1000);

   const tick = (timestamp) => {
      if (lastTime === null) {
         lastTime = timestamp;
      }

      const delta = Math.min(0.05, (timestamp - lastTime) / 1000);
      lastTime = timestamp;

      if (targetSpeed > currentSpeed) {
         currentSpeed = Math.min(targetSpeed, currentSpeed + accelRate * delta);
      } else if (targetSpeed < currentSpeed) {
         currentSpeed = Math.max(targetSpeed, currentSpeed - decelRate * delta);
      }

      angle = (angle + currentSpeed * delta) % 360;
      element.style.rotate = `${angle}deg`;

      if (targetSpeed === 0 && currentSpeed === 0) {
         frameId = null;
         lastTime = null;
         return;
      }

      frameId = requestAnimationFrame(tick);
   };

   const setSpinning = (spinning) => {
      targetSpeed = spinning ? speedDegPerSec : 0;
      if (!frameId) {
         frameId = requestAnimationFrame(tick);
      }
   };

   const dispose = () => {
      if (frameId) {
         cancelAnimationFrame(frameId);
         frameId = null;
      }
   };

   return {
      setSpinning,
      dispose,
   };
};
