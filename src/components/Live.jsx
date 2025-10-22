import React from "react";

const Live = () => {
   return (
      <div class="live">
         <iframe
            id="youtube-player"
            class="live__player"
            src="http://74.208.228.126:8020/;stream.mp3"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
         ></iframe>
      </div>
   );
};

export default Live;
