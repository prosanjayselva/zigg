
import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Nav/nav";

import Home from "./pages/Home/Home";
import Quotation from "./pages/Quotation/quotation";
import LiveOrders from "./pages/Liveorder/Liveorder";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  return (
    <HashRouter>
      <Navbar />

      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/quotation" element={<Quotation />} />
        <Route path="/Liveorder" element={<LiveOrders />} />
        <Route path="/Dashboard" element={<Dashboard/>}/>
      </Routes>
    </HashRouter>
  );
}

export default App;
