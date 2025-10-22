import React from "react";

const PowerSwitcher = () => {
   return (
      <div class="power-switcher">
         <div class="power-switcher__body">
            <div class="power-switcher__body-pt1"></div>
            <div class="power-switcher__body-pt2"></div>
            <div class="power-switcher__body-pt3">
               <div class="power-switcher__body-pt4 power-switcher__body-pt4-track-off">
                  <div class="power-switcher__body-pt4-dot"></div>
               </div>
            </div>
            <div class="power-switcher__text power-switcher__text-off">
               <span class="power-switcher__text-content">off</span>
            </div>
            <div class="power-switcher__text power-switcher__text-on">
               <span class="power-switcher__text-content">on</span>
            </div>

            {/* <div class="power-switcher__text power-switcher__text-1">
               <span class="power-switcher__text-content">1</span>
            </div>
            <div class="power-switcher__text power-switcher__text-2">
               <span class="power-switcher__text-content">2</span>
            </div>
            <div class="power-switcher__text power-switcher__text-3">
               <span class="power-switcher__text-content">3</span>
            </div> */}
         </div>
      </div>
   );
};

export default PowerSwitcher;
