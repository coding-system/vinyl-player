import React, { useEffect, useRef } from "react";
import "../styles/main.scss";
import { useSelector } from "react-redux";

const Vinyl = () => {
   const vinylBoxRef = useRef(null);
   const vinylSpinning = useSelector((state) => state.audio.vinylSpinning);
   const animationFrameRef = useRef(null);
   const startTimeRef = useRef(null);
   const initialAngleRef = useRef(0);

   useEffect(() => {
      if (vinylSpinning) {
         startTimeRef.current = performance.now();
         const animate = (timestamp) => {
            const elapsed = (timestamp - startTimeRef.current) / 1000; // секунды
            const angle = (initialAngleRef.current + elapsed * 198) % 360;
            if (vinylBoxRef.current) {
               vinylBoxRef.current.style.rotate = `${angle}deg`;
            }
            animationFrameRef.current = requestAnimationFrame(animate);
         };
         animationFrameRef.current = requestAnimationFrame(animate);
      } else {
         if (vinylBoxRef.current && animationFrameRef.current) {
            const currentRotate = vinylBoxRef.current.style.rotate;
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
   }, [vinylSpinning]);

   return (
      <div class="vinyl">
         <div class="vinyl__box" ref={vinylBoxRef}>
            <div class="vinyl__body">
               <div class="vinyl__center">
                  <div class="vinyl__out"></div>
                  <div class="vinyl__in">
                     <span class="vinyl__in-text-time"></span>
                     <svg viewBox="0 0 200 200" class="vinyl__text-circle">
                        <defs>
                           <path
                              id="circlePath"
                              d="M 100,100
                         m -80,0
                         a 80,80 0 1,1 160,0
                         a 80,80 0 1,1 -160,0"
                           />
                        </defs>
                        <text class="vinyl__circle-text">
                           <textPath
                              xlink:href="#circlePath"
                              startOffset="0%"
                              textLength="490"
                              lengthAdjust="spacing"
                           >
                              VINTAGE RETRO RADIO FOR RELAXING SLEEPING STUDYING
                           </textPath>
                        </text>
                     </svg>
                  </div>
                  <div class="vinyl__dot"></div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Vinyl;
