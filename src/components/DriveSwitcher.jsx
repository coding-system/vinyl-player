import React, { useEffect } from "react";
import "../styles/main.scss";
import { useSelector, useDispatch } from "react-redux";
import {
   startVinyl,
   togglePowerSwitch,
   toggleTonearmOnVinyl,
} from "../store/slices/audioSlice";

const DriveSwitcher = () => {
   const powerSwitch = useSelector((state) => state.audio.powerSwitch);
   const tonearmOnVinyl = useSelector((state) => state.audio.tonearmOnVinyl);
   const dispatch = useDispatch();

   const handleClick = () => {
      if (!powerSwitch && typeof window !== "undefined") {
         window.dispatchEvent(new Event("radio:unlock"));
      }
      dispatch(togglePowerSwitch());
   };

   useEffect(() => {
      if (!powerSwitch) {
         return;
      }

      dispatch(startVinyl());
      if (!tonearmOnVinyl) {
         dispatch(toggleTonearmOnVinyl());
      }
   }, [powerSwitch, tonearmOnVinyl, dispatch]);

   return (
      <div className="drive-switcher" onClick={handleClick}>
         <div className="drive-switcher__label">
            <span
               className={`drive-switcher__label-text ${
                  powerSwitch ? "drive-switcher__label-text-playing" : ""
               }`}
            >
               <i className="bi bi-power"></i>
            </span>
            {/* <span className="drive-switcher__label-text">
               /
            </span>
            <span className="drive-switcher__label-text drive-switcher__label-text--special">
               <i className="bi bi-circle"></i>
            </span> */}
         </div>
         <div
            className={`drive-switcher__base ${
               powerSwitch ? "drive-switcher__base-playing" : ""
            }`}
         >
            <div className="drive-switcher__body">
               <div
                  className={`drive-switcher__body-pt1 ${
                     powerSwitch ? "drive-switcher__body-pt1-playing" : ""
                  }`}
               ></div>
               <div
                  className={`drive-switcher__body-pt2 ${
                     powerSwitch ? "drive-switcher__body-pt2-playing" : ""
                  }`}
               ></div>
            </div>
         </div>
      </div>
   );
};

export default DriveSwitcher;
