import React from "react";
import Home from "./pages/Home/Home";
import Quatation from "./pages/Quotion/quotion";
import LiveOrderTable from "./pages/Liveorder/Liveorder"
const App=()=>{
  return(
    <div className="app-container">
      <Home/>
      
      <Quatation/>
      <LiveOrderTable/>
    </div>
  )
}

export default App;