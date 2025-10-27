import React from "react";
import "../styles/main.scss";
import { useSelector, useDispatch } from "react-redux";
import { toggleDriveSwitch } from "../store/slices/audioSlice";

const DriveSwitcher = () => {
   const driveSwitch = useSelector((state) => state.audio.driveSwitch);
   const dispatch = useDispatch();

   const handleClick = () => {
      dispatch(toggleDriveSwitch());
   };

   return (
      <div className="drive-switcher" onClick={handleClick}>
         <div className="drive-switcher__label">
            <span
               className={`drive-switcher__label-text ${
                  driveSwitch ? "drive-switcher__label-text-playing" : ""
               }`}
            >
               <i class="bi bi-power"></i>
            </span>
            {/* <span className="drive-switcher__label-text">
               /
            </span>
            <span className="drive-switcher__label-text drive-switcher__label-text--special">
               <i class="bi bi-circle"></i>
            </span> */}
         </div>
         <div
            className={`drive-switcher__base ${
               driveSwitch ? "drive-switcher__base-playing" : ""
            }`}
         >
            <div className="drive-switcher__body">
               <div
                  className={`drive-switcher__body-pt1 ${
                     driveSwitch ? "drive-switcher__body-pt1-playing" : ""
                  }`}
               ></div>
               <div
                  className={`drive-switcher__body-pt2 ${
                     driveSwitch ? "drive-switcher__body-pt2-playing" : ""
                  }`}
               ></div>
            </div>
         </div>
      </div>
   );
};

export default DriveSwitcher;
