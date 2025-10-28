import React, { useState } from "react";

const TrackSwitcher = () => {
   const [trackIndex, setTrackIndex] = useState(0); // 0-2 = track numbers 1-3

   // Массив треков (пока заглушка, потом добавим реальные данные)
   const TRACKS = [
      {
         stream: "http://stream1.early1900s.org:8080",
         image: "",
         name: "Dismuke",
      },
      {
         stream: "https://uk3.internet-radio.com/proxy/1940sradio/stream",
         image: "",
         name: "Track 2",
      },
      {
         stream: "https://s1.voscast.com:10413/stream",
         image: "",
         name: "Track 3",
      },
      {
         stream: "https://2.mystreaming.net/uber/boomerang1920s/icecast.audio",
         image: "",
         name: "Track 3",
      },
   ];

   const handleClick = () => {
      // Циклически переключаем между треками 1-3
      setTrackIndex((prev) => (prev >= 2 ? 0 : prev + 1));
   };

   // Определяем класс для track-switcher__body-pt4
   const getTrackClass = () => {
      return `track-switcher__body-pt4-track-${trackIndex + 1}`;
   };

   return (
      <div className="track-switcher" onClick={handleClick}>
         <div className="track-switcher__body">
            <div className="track-switcher__body-pt1"></div>
            <div className="track-switcher__body-pt2"></div>
            <div className="track-switcher__body-pt3">
               <div className={`track-switcher__body-pt4 ${getTrackClass()}`}>
                  <div className="track-switcher__body-pt4-dot"></div>
               </div>
            </div>
            {/* <div className="track-switcher__text track-switcher__text-off">
               <span className="track-switcher__text-content">off</span>
            </div>
            <div className="track-switcher__text track-switcher__text-on">
               <span className="track-switcher__text-content">on</span>
            </div> */}

            <div className="track-switcher__text track-switcher__text-1">
               <span className="track-switcher__text-content">1</span>
            </div>
            <div className="track-switcher__text track-switcher__text-2">
               <span className="track-switcher__text-content">2</span>
            </div>
            <div className="track-switcher__text track-switcher__text-3">
               <span className="track-switcher__text-content">3</span>
            </div>
         </div>
      </div>
   );
};

export default TrackSwitcher;
