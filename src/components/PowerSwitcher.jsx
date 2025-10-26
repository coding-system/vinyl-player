import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { togglePowerSwitch } from "../store/slices/audioSlice";

const PowerSwitcher = () => {
   const powerSwitch = useSelector((state) => state.audio.powerSwitch);
   const dispatch = useDispatch();

   const handleClick = () => {
      dispatch(togglePowerSwitch());
   };

   return (
      <div className="power-switcher" onClick={handleClick}>
         <div className="power-switcher__body">
            <div className="power-switcher__body-pt1"></div>
            <div className="power-switcher__body-pt2"></div>
            <div className="power-switcher__body-pt3">
               <div
                  className={`power-switcher__body-pt4 ${
                     powerSwitch
                        ? "power-switcher__body-pt4-track-on"
                        : "power-switcher__body-pt4-track-off"
                  }`}
               >
                  <div className="power-switcher__body-pt4-dot"></div>
               </div>
            </div>
            <div className="power-switcher__text power-switcher__text-off">
               <span className="power-switcher__text-content">off</span>
            </div>
            <div className="power-switcher__text power-switcher__text-on">
               <span className="power-switcher__text-content">on</span>
            </div>

            {/* <div className="power-switcher__text power-switcher__text-1">
               <span className="power-switcher__text-content">1</span>
            </div>
            <div className="power-switcher__text power-switcher__text-2">
               <span className="power-switcher__text-content">2</span>
            </div>
            <div className="power-switcher__text power-switcher__text-3">
               <span className="power-switcher__text-content">3</span>
            </div> */}
         </div>
      </div>
   );
};

export default PowerSwitcher;
