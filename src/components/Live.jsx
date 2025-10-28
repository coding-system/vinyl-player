import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Live = () => {
   const [isPlaying, setIsPlaying] = useState(false);
   const audioRef = useRef(null);
   const currentTrack = useSelector(
      (state) => state.audio.tracks[state.audio.currentTrackIndex]
   );
   const currentTrackIndex = useSelector(
      (state) => state.audio.currentTrackIndex
   );
   const powerSwitch = useSelector((state) => state.audio.powerSwitch);
   const tonearmOnVinyl = useSelector((state) => state.audio.tonearmOnVinyl);

   useEffect(() => {
      // Останавливаем текущий трек если играет
      if (audioRef.current && isPlaying) {
         audioRef.current.pause();
      }

      // Создаем аудио элемент с текущей ссылкой на стрим
      audioRef.current = new Audio(currentTrack.stream);
      // https://2.mystreaming.net/uber/boomerang1920s/icecast.audio ----------------https://mytuner-radio.com/radio/greatest-hits-1920s-501210/
      // https://s1.voscast.com:10413/stream ------------https://www.swingstreetradio.org/old-time-radio/swing-street-ballroom/
      // https://uk3.internet-radio.com/proxy/1940sradio/stream-------------------https://www.1940sradio.com/

      audioRef.current.loop = true;

      // Если был включен, запускаем новый трек
      if (isPlaying) {
         audioRef.current.play().catch((error) => {
            console.error("Ошибка воспроизведения радио:", error);
         });
      }

      return () => {
         if (audioRef.current) {
            audioRef.current.pause();
         }
      };
   }, [currentTrackIndex, currentTrack.stream, isPlaying]);

   useEffect(() => {
      const shouldPlay = powerSwitch && tonearmOnVinyl;

      if (audioRef.current) {
         if (shouldPlay && !isPlaying) {
            audioRef.current.play().catch((error) => {
               console.error("Ошибка воспроизведения радио:", error);
            });
            setIsPlaying(true);
         } else if (!shouldPlay && isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
         }
      }
   }, [powerSwitch, tonearmOnVinyl, isPlaying]);

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
