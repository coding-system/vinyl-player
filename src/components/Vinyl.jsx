import React from "react";
import "../styles/main.scss";

const Vinyl = () => {
   return (
      <div class="vinyl">
         <div class="vinyl__box">
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
