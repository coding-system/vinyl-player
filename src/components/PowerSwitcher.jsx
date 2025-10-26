import React from "react";

const PowerSwitcher = () => {

   return (
      <div className="power-switcher">
         <div className="power-switcher__body">
            <div className="power-switcher__body-pt1"></div>
            <div className="power-switcher__body-pt2"></div>
            <div className="power-switcher__body-pt3">
               <div
                  className="power-switcher__body-pt4 power-switcher__body-pt4-track-on"
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
