import React from "react";

const Volume = () => {
   return (
      <div className="volume">
         <div class="volume__text">Volume</div>
         <div class="volume__pit">
            <div class="volume__pit-pt1">
               <div class="volume__slid"></div>
            </div>
         </div>
         <div class="volume__scale">
            <div class="volume__dash-full"></div>
            <div class="volume__dash-long">
               <span class="volume__dash-text volume__dash-text-100">100</span>
            </div>
            <div class="volume__dash-short"></div>
            <div class="volume__dash-short"></div>
            <div class="volume__dash-short"></div>
            <div class="volume__dash-short"></div>
            <div class="volume__dash-long">
               <span class="volume__dash-text volume__dash-text-50">50</span>
            </div>
            <div class="volume__dash-short"></div>
            <div class="volume__dash-short"></div>
            <div class="volume__dash-short"></div>
            <div class="volume__dash-short"></div>
            <div class="volume__dash-long">
               <span class="volume__dash-text volume__dash-text-0">0</span>
            </div>
         </div>
      </div>
   );
};

export default Volume;
