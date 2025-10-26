import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   powerSwitch: false,
   driveSwitch: false,
   tonearmOnVinyl: false,
   volume: 25,
   twistSpinning: false,
   vinylSpinning: false,
};

const audioSlice = createSlice({
   name: "audio",
   initialState,
   reducers: {
      togglePowerSwitch(state) {
         const newPowerState = !state.powerSwitch;
         state.powerSwitch = newPowerState;
         state.twistSpinning = newPowerState;
         state.vinylSpinning = newPowerState;
      },
      toggleDriveSwitch(state) {
         state.driveSwitch = !state.driveSwitch;
      },
      toggleTonearmOnVinyl(state) {
         state.tonearmOnVinyl = !state.tonearmOnVinyl;
      },
      setVolume(state, action) {
         state.volume = action.payload;
      },
   },
});

export const {
   togglePowerSwitch,
   toggleDriveSwitch,
   toggleTonearmOnVinyl,
   setVolume,
} = audioSlice.actions;

export default audioSlice.reducer;
