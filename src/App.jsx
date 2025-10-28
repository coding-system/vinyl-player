import React from "react";
import Board from "./components/Board";
import Volume from "./components/Volume";
import Jack from "./components/Jack";
import TrackSwitcher from "./components/TrackSwitcher";
import Twist from "./components/Twist";
import Holder from "./components/Holder";
import Base from "./components/Base";
import Tonearm from "./components/Tonearm";
import Vinyl from "./components/Vinyl";
import DriveSwitcher from "./components/DriveSwitcher";

function App() {
   return (
      <div className="app">
         <Board />
         <Volume />
         <Jack />
         <Twist />
         <TrackSwitcher />
         <Base />
         <Tonearm />
         <Holder />
         <Vinyl />   
         <DriveSwitcher />
      </div>
   );
}

export default App;
