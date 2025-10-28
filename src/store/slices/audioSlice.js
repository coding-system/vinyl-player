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
   },
});

export const {
   togglePowerSwitch,
   toggleDriveSwitch,
   toggleTonearmOnVinyl,
   startVinyl,
   setVolume,
} = audioSlice.actions;

export default audioSlice.reducer;
