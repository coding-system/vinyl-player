import { createSlice } from "@reduxjs/toolkit";

const TRACKS = [
   {
      // stream: "https://1.restream.one/56_1",
      stream: "https://stream03.pcradio.ru/dismuke_radio-med",
      source: "https://radiodismuke.com/",
      image: "",
      name: "Dismuke",
   },
   {
      stream: "https://uk3.internet-radio.com/proxy/1940sradio/stream",
      source: "https://www.1940sradio.com/",
      image: "",
      name: "1940s Radio",
   },
   {
      stream: "https://s1.voscast.com:10413/stream",
      source: "https://www.swingstreetradio.org/",
      image: "",
      name: "Swing Street",
   },
   {
      stream: "https://2.mystreaming.net/uber/boomerang1920s/icecast.audio",
      source: "https://mytuner-radio.com/radio/greatest-hits-1920s-501210/",
      image: "",
      name: "Greatest Hits 1920s",
   },
];
// https://2.mystreaming.net/uber/boomerang1920s/icecast.audio ----------------https://mytuner-radio.com/radio/greatest-hits-1920s-501210/
// https://s1.voscast.com:10413/stream ------------https://www.swingstreetradio.org/old-time-radio/swing-street-ballroom/
// https://uk3.internet-radio.com/proxy/1940sradio/stream-------------------https://www.1940sradio.com/

const loadPersistedAudio = () => {
   if (typeof window === "undefined") {
      return {};
   }

   try {
      const raw = window.localStorage.getItem("radio-audio");
      if (!raw) return {};
      const parsed = JSON.parse(raw);

      const volume = Number.isFinite(parsed.volume)
         ? Math.max(0, Math.min(100, parsed.volume))
         : undefined;
      const currentTrackIndex = Number.isFinite(parsed.currentTrackIndex)
         ? Math.max(0, Math.min(TRACKS.length - 1, parsed.currentTrackIndex))
         : undefined;

      return {
         volume,
         currentTrackIndex,
      };
   } catch {
      return {};
   }
};

const persisted = loadPersistedAudio();

const initialState = {
   powerSwitch: false,
   // driveSwitch: false,
   tonearmOnVinyl: false,
   volume: Number.isFinite(persisted.volume) ? persisted.volume : 25,
   twistSpinning: false,
   vinylSpinning: false,
   currentTrackIndex: Number.isFinite(persisted.currentTrackIndex)
      ? persisted.currentTrackIndex
      : 0,
   tracks: TRACKS,
};

const audioSlice = createSlice({
   name: "audio",
   initialState,
   reducers: {
      togglePowerSwitch(state) {
         const newPowerState = !state.powerSwitch;
         state.powerSwitch = newPowerState;
         // При выключении питания отключаем все
         if (!newPowerState) {
            state.twistSpinning = false;
            state.vinylSpinning = false;
            state.driveSwitch = false;
            state.tonearmOnVinyl = false;
         }
      },
      toggleDriveSwitch(state) {
         // Можно переключать привод только если включено питание
         if (state.powerSwitch) {
            state.driveSwitch = !state.driveSwitch;
         }
      },
      toggleTonearmOnVinyl(state) {
         // Можно работать с тонармом только если включено питание
         if (!state.powerSwitch) return;

         state.tonearmOnVinyl = !state.tonearmOnVinyl;

         // При поднятии тонарма останавливаем диск
         if (!state.tonearmOnVinyl) {
            state.vinylSpinning = false;
            state.twistSpinning = false;
         }
      },
      startVinyl(state) {
         // Запускаем диск (без опускания тонарма)
         if (state.powerSwitch && !state.vinylSpinning) {
            state.vinylSpinning = true;
            state.twistSpinning = true;
         }
      },
      setVolume(state, action) {
         state.volume = action.payload;
      },
      setCurrentTrack(state, action) {
         state.currentTrackIndex = action.payload;
      },
   },
});

export const {
   togglePowerSwitch,
   toggleDriveSwitch,
   toggleTonearmOnVinyl,
   startVinyl,
   setVolume,
   setCurrentTrack,
} = audioSlice.actions;

export default audioSlice.reducer;
