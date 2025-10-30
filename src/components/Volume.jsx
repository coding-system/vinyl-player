import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Volume = () => {
   const volume = useSelector((state) => state.audio.volume);
   const slidRef = useRef(null);

   // Обновляем позицию слайдера при изменении громкости
   useEffect(() => {
      if (slidRef.current) {
         // Формула: bottom = minBottom + (volume / 100) * (maxBottom - minBottom)
         // minBottom = -6.2%, maxBottom = 93%
         const minBottom = -6.2;
         const maxBottom = 93;
         const bottom = minBottom + (volume / 100) * (maxBottom - minBottom);
         slidRef.current.style.bottom = `${bottom}%`;
         console.log(`Громкость: ${volume}%`);
      }
   }, [volume]);

   return (
      <div className="volume">
         <div class="volume__text">Volume</div>
         <div class="volume__pit">
            <div class="volume__pit-pt1">
               <div class="volume__slid" ref={slidRef}></div>
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
