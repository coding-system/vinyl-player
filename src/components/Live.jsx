import React, { useState, useEffect, useRef } from "react";

const Live = () => {
   const [isPlaying, setIsPlaying] = useState(false);
   const audioRef = useRef(null);

   useEffect(() => {
      // Создаем аудио элемент с ссылкой из плейлиста
      audioRef.current = new Audio("http://stream1.early1900s.org:8080"); 
      // https://2.mystreaming.net/uber/boomerang1920s/icecast.audio ----------------https://mytuner-radio.com/radio/greatest-hits-1920s-501210/ 
      // https://s1.voscast.com:10413/stream ------------https://www.swingstreetradio.org/old-time-radio/swing-street-ballroom/
      // https://uk3.internet-radio.com/proxy/1940sradio/stream-------------------https://www.1940sradio.com/


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
