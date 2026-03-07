import React from "react";
import { useSelector } from "react-redux";

const Paper = () => {
   const tracks = useSelector((state) => state.audio.tracks);

   return (
      <div className="paper" aria-label="Track list">
         <div className="paper__sheet">
            <div className="paper__rows">
               {tracks.map((track, index) => (
                  <div className="paper__row" key={track.name}>
                     <span className="paper__num">{index + 1}.</span>
                     <a
                        className="paper__link"
                        href={track.source}
                        target="_blank"
                        rel="noreferrer"
                     >
                        <span className="paper__name">{track.name}</span>
                     </a>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default Paper;
