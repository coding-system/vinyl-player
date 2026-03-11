import { configureStore } from "@reduxjs/toolkit";
import audioReducer from "./slices/audioSlice";

export const store = configureStore({
   reducer: {
      audio: audioReducer,
   },
});

if (typeof window !== "undefined") {
   store.subscribe(() => {
      const { audio } = store.getState();
      const payload = {
         volume: audio.volume,
         currentTrackIndex: audio.currentTrackIndex,
      };

      try {
         window.localStorage.setItem("radio-audio", JSON.stringify(payload));
      } catch (error) {
         // Ignore write errors (private mode, quota, etc.)
      }
   });
}
