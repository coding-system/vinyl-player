import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setVolume } from "../store/slices/audioSlice";

const Live = () => {
   const [isPlaying, setIsPlaying] = useState(false);
   const audioRef = useRef(null);
   const dispatch = useDispatch();
   const currentTrack = useSelector(
      (state) => state.audio.tracks[state.audio.currentTrackIndex]
   );
   const currentTrackIndex = useSelector(
      (state) => state.audio.currentTrackIndex
   );
   const powerSwitch = useSelector((state) => state.audio.powerSwitch);
   const tonearmOnVinyl = useSelector((state) => state.audio.tonearmOnVinyl);
   const volume = useSelector((state) => state.audio.volume);

   useEffect(() => {
      // Останавливаем текущий трек если играет
      if (audioRef.current && isPlaying) {
         audioRef.current.pause();
      }

      // Создаем аудио элемент с текущей ссылкой на стрим
      audioRef.current = new Audio(currentTrack.stream);
      // Проигрывание и громкость управляются в отдельном эффекте
      // https://2.mystreaming.net/uber/boomerang1920s/icecast.audio ----------------https://mytuner-radio.com/radio/greatest-hits-1920s-501210/
      // https://s1.voscast.com:10413/stream ------------https://www.swingstreetradio.org/old-time-radio/swing-street-ballroom/
      // https://uk3.internet-radio.com/proxy/1940sradio/stream-------------------https://www.1940sradio.com/

      audioRef.current.loop = true;

      // Старт/пауза и громкость будут обработаны ниже

      return () => {
         if (audioRef.current) {
            audioRef.current.pause();
         }
      };
   }, [currentTrackIndex, currentTrack.stream, isPlaying]);

   // Управляем громкостью
   useEffect(() => {
      if (audioRef.current) {
         audioRef.current.volume = volume / 100;
      }
   }, [volume]);

   useEffect(() => {
      const shouldPlay = powerSwitch && tonearmOnVinyl;
      const player = audioRef.current;
      if (!player) return;

      if (shouldPlay) {
         player.volume = volume / 100; // всегда берем из стора
         player
            .play()
            .then(() => setIsPlaying(true))
            .catch((error) => {
               console.error("Ошибка воспроизведения радио:", error);
            });
      } else {
         player.pause();
         setIsPlaying(false);
      }
   }, [powerSwitch, tonearmOnVinyl, currentTrackIndex, volume]);

   // Обработка колесика мыши для изменения громкости
   useEffect(() => {
      const handleWheel = (e) => {
         if (audioRef.current) {
            e.preventDefault();
            const delta = e.deltaY > 0 ? -1 : 1;
            const newVolume = Math.max(0, Math.min(100, volume + delta));
            dispatch(setVolume(newVolume));
         }
      };

      window.addEventListener("wheel", handleWheel, { passive: false });

      return () => {
         window.removeEventListener("wheel", handleWheel);
      };
   }, [volume, dispatch]);

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
