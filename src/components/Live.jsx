import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setVolume } from "../store/slices/audioSlice";

const Live = () => {
   const [isPlaying, setIsPlaying] = useState(false);
   const audioRef = useRef(null);
   const playTimerRef = useRef(null);
   const shouldPlayRef = useRef(false);
   const volumeRef = useRef(25);
   const dispatch = useDispatch();
   const tracks = useSelector((state) => state.audio.tracks);
   const currentTrackIndex = useSelector(
      (state) => state.audio.currentTrackIndex,
   );
   const safeTrackIndex = tracks?.length
      ? Math.min(Math.max(currentTrackIndex, 0), tracks.length - 1)
      : 0;
   const currentTrack = tracks?.[safeTrackIndex];
   const powerSwitch = useSelector((state) => state.audio.powerSwitch);
   const tonearmOnVinyl = useSelector((state) => state.audio.tonearmOnVinyl);
   const volume = useSelector((state) => state.audio.volume);

   useEffect(() => {
      if (audioRef.current) {
         audioRef.current.pause();
      }

      // Создаем аудио элемент с текущей ссылкой на стрим
      if (!currentTrack) {
         return;
      }
      const nextAudio = new Audio(currentTrack.stream);
      // Проигрывание и громкость управляются в отдельном эффекте
      // https://2.mystreaming.net/uber/boomerang1920s/icecast.audio ----------------https://mytuner-radio.com/radio/greatest-hits-1920s-501210/
      // https://s1.voscast.com:10413/stream ------------https://www.swingstreetradio.org/old-time-radio/swing-street-ballroom/
      // https://uk3.internet-radio.com/proxy/1940sradio/stream-------------------https://www.1940sradio.com/

      nextAudio.loop = true;
      audioRef.current = nextAudio;

      // Старт/пауза и громкость будут обработаны ниже

      return () => {
         nextAudio.pause();
      };
   }, [safeTrackIndex, currentTrack?.stream]);

   useEffect(() => {
      const handleUnlock = () => {
         const player = audioRef.current;
         if (!player) return;

         player.volume = volume / 100;
         const playPromise = player.play();
         if (playPromise && typeof playPromise.then === "function") {
            playPromise
               .then(() => {
                  player.pause();
               })
               .catch((error) => {
                  console.error("Ошибка разблокировки аудио:", error);
               });
         }
      };

      window.addEventListener("radio:unlock", handleUnlock);

      return () => {
         window.removeEventListener("radio:unlock", handleUnlock);
      };
   }, [volume]);

   // Управляем громкостью
   useEffect(() => {
      if (audioRef.current) {
         audioRef.current.volume = volume / 100;
      }
      volumeRef.current = volume;
   }, [volume]);

   useEffect(() => {
      const shouldPlay = powerSwitch && tonearmOnVinyl;
      const player = audioRef.current;
      if (!player) return;

      const playNow = () => {
         player.volume = volumeRef.current / 100;
         player
            .play()
            .then(() => setIsPlaying(true))
            .catch((error) => {
               console.error("Ошибка воспроизведения радио:", error);
            });
      };

      if (shouldPlay) {
         if (playTimerRef.current) {
            clearTimeout(playTimerRef.current);
         }

         if (!shouldPlayRef.current) {
            const delay = 3000;
            playTimerRef.current = setTimeout(() => {
               playNow();
            }, delay);
         } else {
            playNow();
         }
      } else {
         if (playTimerRef.current) {
            clearTimeout(playTimerRef.current);
         }
         player.pause();
         setIsPlaying(false);
      }

      shouldPlayRef.current = shouldPlay;
   }, [powerSwitch, tonearmOnVinyl, safeTrackIndex]);

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
