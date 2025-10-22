import React from "react";
import Board from "./components/Board";
import Volume from "./components/Volume";
import Jack from "./components/Jack";
import PowerSwitcher from "./components/PowerSwitcher";
import Twist from "./components/Twist";
import Holder from "./components/Holder";
import Base from "./components/Base";
import Tonearm from "./components/Tonearm";
import Vinyl from "./components/Vinyl";
import Live from "./components/Live";

function App() {
   return (
      <div className="app">
         <Live />
         <Board />
         <Volume />
         <Jack />
         <Twist />
         <PowerSwitcher />
         <Base />
         <Tonearm />
         <Holder />
         <Vinyl />
      </div>
   );
}

export default App;
