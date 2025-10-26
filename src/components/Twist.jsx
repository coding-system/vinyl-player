import React from "react";
import "../styles/main.scss";

const Twist = () => {
   return (
      <div className="twist">
         <div className="twist__base">
            <div className="twist__body">
               <div className="twist__body-pt1"></div>
               <div className="twist__body-pt2">
                  <div className="twist__body-pt4"></div>
               </div>
               <div className="twist__body-pt3 twist__body-pt3-disabled"></div>
            </div>
         </div>
      </div>
   );
};

export default Twist;
