import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentTrack } from "../store/slices/audioSlice";

const TrackSwitcher = () => {
   const dispatch = useDispatch();
   const trackIndex = useSelector((state) => state.audio.currentTrackIndex);
   const tracks = useSelector((state) => state.audio.tracks);

   const handleClick = () => {
      // Циклически переключаем между треками 1-3
      const newIndex = trackIndex >= 2 ? 0 : trackIndex + 1;
      dispatch(setCurrentTrack(newIndex));
      console.log("Выбран трек:", tracks[newIndex].name);
   };

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
