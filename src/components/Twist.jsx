import React, { useEffect, useRef } from "react";
import "../styles/main.scss";
import { useSelector } from "react-redux";
import { createSmoothSpinner } from "../utils/smoothSpinner";

const Twist = () => {
   const twistTopRef = useRef(null);
   const twistSpinning = useSelector((state) => state.audio.twistSpinning);
   const powerSwitch = useSelector((state) => state.audio.powerSwitch);
   const spinnerRef = useRef(null);

   useEffect(() => {
      if (!twistTopRef.current) return;
      spinnerRef.current = createSmoothSpinner({
         element: twistTopRef.current,
         speedDegPerSec: 1247.4,
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
         spinnerRef.current.setSpinning(twistSpinning);
      }
   }, [twistSpinning]);

   return (
      <div className="twist">
         <div className="twist__base">
            <div className="twist__body">
               <div className="twist__body-pt1"></div>
               <div className="twist__body-pt2" ref={twistTopRef}>
                  <div className="twist__body-pt4"></div>
               </div>
               <div
                  className={`twist__body-pt3 ${
                     powerSwitch
                        ? "twist__body-pt3-playing"
                        : "twist__body-pt3-disabled"
                  }`}
               ></div>
            </div>
         </div>
      </div>
   );
};

export default Twist;
