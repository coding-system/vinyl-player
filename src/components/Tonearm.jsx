import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTonearmOnVinyl, startVinyl } from "../store/slices/audioSlice";

const Tonearm = () => {
   const dispatch = useDispatch();
   const tonearmOnVinyl = useSelector((state) => state.audio.tonearmOnVinyl);
   const powerSwitch = useSelector((state) => state.audio.powerSwitch);
   const vinylSpinning = useSelector((state) => state.audio.vinylSpinning);
   const hasStartedRef = useRef(false);

   const handleHeadClick = () => {
      // Можно кликать только если включено питание
      if (powerSwitch) {
         if (!vinylSpinning && !tonearmOnVinyl) {
            // Первый клик: запускаем диск
            dispatch(startVinyl());
            hasStartedRef.current = true;
         } else {
            // Второй клик: поднимаем тонарм (диск остановится)
            dispatch(toggleTonearmOnVinyl());
            hasStartedRef.current = false;
         }
      }
   };

   useEffect(() => {
      // При запуске диска ждем 2000мс и опускаем тонарм
      if (vinylSpinning && !tonearmOnVinyl && hasStartedRef.current) {
         hasStartedRef.current = false;
         const timer = setTimeout(() => {
            dispatch(toggleTonearmOnVinyl());
         }, 500);
         return () => clearTimeout(timer);
      }
   }, [vinylSpinning, tonearmOnVinyl, dispatch]);

   return (
      <div className="tonearm">
         <div class="tonearm__base">
            <div class="tonearm__base-pt1"></div>
            <div class="tonearm__base-pt2"></div>
            <div class="tonearm__base-pt3"></div>
         </div>
         <div
            class={`tonearm__body ${
               tonearmOnVinyl ? "tonearm__body-playing" : ""
            }`}
         >
            <div class="tonearm__top"></div>
            <div class="tonearm__balance">
               <div class="tonearm__balance-pt1"></div>
               <div class="tonearm__balance-pt2"></div>
               <div class="tonearm__balance-pt3"></div>
               <div class="tonearm__balance-pt4"></div>
               <div class="tonearm__balance-pt5"></div>
               <div class="tonearm__balance-pt6"></div>
               <div class="tonearm__balance-pt7"></div>
               <div class="tonearm__balance-pt8"></div>
            </div>
            <div class="tonearm__center">
               <div class="tonearm__center-pt1"></div>
               <div class="tonearm__center-pt2"></div>
               <div class="tonearm__center-pt3"></div>
               <div class="tonearm__center-pt4"></div>
            </div>
            <div class="tonearm__back">
               <div class="tonearm__back-pt1"></div>
            </div>
            <div class="tonearm__neck">
               <div class="tonearm__neck-pt1"></div>
               <div class="tonearm__neck-pt2"></div>
               <div class="tonearm__neck-pt3"></div>
            </div>
            <div class="tonearm__head" onClick={handleHeadClick}>
               <div class="tonearm__head-pt1"></div>
               <div class="tonearm__head-pt2"></div>
               <div class="tonearm__head-pt3">
                  {/* <div class="tonearm__head-stick">
                     <div class="tonearm__head-stick-pt1"></div>
                     <div class="tonearm__head-stick-pt2"></div>
                     <div class="tonearm__head-stick-pt3"></div>
                  </div> */}

                  <div class="tonearm__head-body1"></div>
                  <div class="tonearm__head-body2">
                     <div className="tonearm__head-stick">
                        <div class="tonearm__head-stick-pt1"></div>
                        <div class="tonearm__head-stick-pt2"></div>
                     </div>
                     <div class="tonearm__head-tail"></div>
                     <div class="tonearm__head-dots">
                        <div class="tonearm__head-dot">
                           <div class="tonearm__head-pin"></div>
                        </div>
                        <div class="tonearm__head-dot">
                           <div class="tonearm__head-pin"></div>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="tonearm__head-pt5"></div>
               <div class="tonearm__head-pt6"></div>
            </div>
         </div>
      </div>
   );
};

export default Tonearm;
