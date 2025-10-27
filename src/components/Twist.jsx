import React, { useEffect, useRef } from "react";
import "../styles/main.scss";
import { useSelector } from "react-redux";

const Twist = () => {
   const twistTopRef = useRef(null);
   const twistSpinning = useSelector((state) => state.audio.twistSpinning);
   const animationFrameRef = useRef(null);
   const startTimeRef = useRef(null);
   const initialAngleRef = useRef(0);

   useEffect(() => {
      if (twistSpinning) {
         startTimeRef.current = performance.now();
         const animate = (timestamp) => {
            const elapsed = (timestamp - startTimeRef.current) / 1000; // секунды
            const angle = (initialAngleRef.current + elapsed * 1247.4) % 360;
            if (twistTopRef.current) {
               twistTopRef.current.style.rotate = `${angle}deg`;
            }
            animationFrameRef.current = requestAnimationFrame(animate);
         };
         animationFrameRef.current = requestAnimationFrame(animate);
      } else {
         if (twistTopRef.current && animationFrameRef.current) {
            const currentRotate = twistTopRef.current.style.rotate;
            const match = currentRotate.match(/(\d+\.?\d*)deg/);
            if (match) {
               initialAngleRef.current = parseFloat(match[1]);
            }
         }
         if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
         }
      }

      return () => {
         if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
         }
      };
   }, [twistSpinning]);

   return (
      <div className="twist">
         <div className="twist__base">
            <div className="twist__body">
               <div className="twist__body-pt1"></div>
               <div className="twist__body-pt2" ref={twistTopRef}>
                  <div className="twist__body-pt4"></div>
               </div>
               <div className="twist__body-pt3 twist__body-pt3-disabled"></div>
            </div>
         </div>
      </div>
   );
};

export default Twist;
