import React from "react";
import { useSelector } from "react-redux";

const Tonearm = () => {
   const tonearmOnVinyl = useSelector((state) => state.audio.tonearmOnVinyl);

   return (
      <div className="tonearm">
         <div className="tonearm__base">
            <div className="tonearm__base-pt1"></div>
            <div className="tonearm__base-pt2"></div>
            <div className="tonearm__base-pt3"></div>
         </div>
         <div
            className={`tonearm__body ${
               tonearmOnVinyl ? "tonearm__body-playing" : ""
            }`}
         >
            <div className="tonearm__top"></div>
            <div className="tonearm__balance">
               <div className="tonearm__balance-pt1"></div>
               <div className="tonearm__balance-pt2"></div>
               <div className="tonearm__balance-pt3"></div>
               <div className="tonearm__balance-pt4"></div>
               <div className="tonearm__balance-pt5"></div>
               <div className="tonearm__balance-pt6"></div>
               <div className="tonearm__balance-pt7"></div>
               <div className="tonearm__balance-pt8"></div>
            </div>
            <div className="tonearm__center">
               <div className="tonearm__center-pt1"></div>
               <div className="tonearm__center-pt2"></div>
               <div className="tonearm__center-pt3"></div>
               <div className="tonearm__center-pt4"></div>
            </div>
            <div className="tonearm__back">
               <div className="tonearm__back-pt1"></div>
            </div>
            <div className="tonearm__neck">
               <div className="tonearm__neck-pt1"></div>
               <div className="tonearm__neck-pt2"></div>
               <div className="tonearm__neck-pt3"></div>
            </div>
            <div className="tonearm__head">
               <div className="tonearm__head-pt1"></div>
               <div className="tonearm__head-pt2"></div>
               <div className="tonearm__head-pt3">
                  {/* <div class="tonearm__head-stick">
                     <div class="tonearm__head-stick-pt1"></div>
                     <div class="tonearm__head-stick-pt2"></div>
                     <div class="tonearm__head-stick-pt3"></div>
                  </div> */}

                  <div className="tonearm__head-body1"></div>
                  <div className="tonearm__head-body2">
                     <div className="tonearm__head-stick">
                        <div className="tonearm__head-stick-pt1"></div>
                        <div className="tonearm__head-stick-pt2"></div>
                     </div>
                     <div className="tonearm__head-tail"></div>
                     <div className="tonearm__head-dots">
                        <div className="tonearm__head-dot">
                           <div className="tonearm__head-pin"></div>
                        </div>
                        <div className="tonearm__head-dot">
                           <div className="tonearm__head-pin"></div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="tonearm__head-pt5"></div>
               <div className="tonearm__head-pt6"></div>
            </div>
         </div>
      </div>
   );
};

export default Tonearm;
