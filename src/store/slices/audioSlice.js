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
         // При выключении питания отключаем все
         if (!newPowerState) {
            state.twistSpinning = false;
            state.vinylSpinning = false;
            state.driveSwitch = false;
         } else {
            // При включении питания включаем вращение если driveSwitch уже включен
            state.vinylSpinning = state.driveSwitch;
            state.twistSpinning = state.driveSwitch;
         }
      },
      toggleDriveSwitch(state) {
         // Можно переключать привод только если включено питание
         if (state.powerSwitch) {
            state.driveSwitch = !state.driveSwitch;
            // Пластинка и twist крутятся когда включен привод
            state.vinylSpinning = state.driveSwitch;
            state.twistSpinning = state.driveSwitch;
         }
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
