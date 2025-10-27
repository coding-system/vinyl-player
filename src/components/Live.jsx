import React, { useState, useEffect, useRef } from "react";

const Live = () => {
   const [isPlaying, setIsPlaying] = useState(false);
   const audioRef = useRef(null);

   useEffect(() => {
      // Создаем аудио элемент с ссылкой из плейлиста
      audioRef.current = new Audio("http://stream1.early1900s.org:8080");
      // audioRef.current = new Audio("http://radio.bigblueswing.com:8002/");
      audioRef.current.loop = true;

      return () => {
         if (audioRef.current) {
            audioRef.current.pause();
         }
      };
   }, []);

   const toggleRadio = () => {
      if (audioRef.current) {
         if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
         } else {
            audioRef.current.play().catch((error) => {
               console.error("Ошибка воспроизведения радио:", error);
            });
            setIsPlaying(true);
         }
      }
   };

   return (
      <div className="live">
         <button
            className={`live__switcher ${
               isPlaying ? "live__switcher--active" : ""
            }`}
            onClick={toggleRadio}
         >
            {isPlaying ? "STOP" : "LIVE"}
         </button>
      </div>
   );
};

export default Live;
