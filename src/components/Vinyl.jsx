import React, { useEffect, useRef } from "react";
import "../styles/main.scss";
import { useSelector } from "react-redux";
import { createSmoothSpinner } from "../utils/smoothSpinner";

const Vinyl = () => {
   const vinylBoxRef = useRef(null);
   const vinylSpinning = useSelector((state) => state.audio.vinylSpinning);
   const spinnerRef = useRef(null);

   useEffect(() => {
      if (!vinylBoxRef.current) return;
      spinnerRef.current = createSmoothSpinner({
         element: vinylBoxRef.current,
         speedDegPerSec: 198,
         accelMs: 2000,
         decelMs: 2000,
      });

      return () => {
         if (spinnerRef.current) {
            spinnerRef.current.dispose();
            spinnerRef.current = null;
         }
      };
   }, []);

   useEffect(() => {
      if (spinnerRef.current) {
         spinnerRef.current.setSpinning(vinylSpinning);
      }
   }, [vinylSpinning]);

   return (
      <div className="vinyl">
         <div className="vinyl__box" ref={vinylBoxRef}>
            <div className="vinyl__body">
               <div className="vinyl__center">
                  <div className="vinyl__out">
                     <div className="vinyl__label">
                        {/* <div className="vinyl__label-box">
                           <div className="vinyl__label-title">RETRO RADIO</div>
                        </div> */}
                     </div>
                  </div>
                  <div className="vinyl__in"></div>
                  <div className="vinyl__dot"></div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Vinyl;
