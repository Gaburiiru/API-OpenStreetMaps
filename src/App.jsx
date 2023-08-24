import React, { useState } from "react";
import Maps from "./components/Maps";
import SeachBox from "./components/SearchBox";
import "./index.css";

function App() {
  const [posicion, SetPosicion] = useState(null);

  return (
    <>
      <div style={{backgroundColor:'#303134'}} className="grid grid-col p-4 text-center">
        <h1 className="text-white text-3xl font-extrabold">
          Bienvenido a Maps
        </h1>
      </div>
      <div className="flex flex-col items-center space-y-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 items-start  gap-10 p-4 ">
          <div style={{backgroundColor:'#303134'}} className="shadow-xl rounded-xl p-2">
            <SeachBox posicion={posicion} SetPosicion={SetPosicion} />
          </div>
          <div className="max-w-screen h-96 sm:w-128 sm:h-128">
            <Maps posicion={posicion} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
