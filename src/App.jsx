
import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Nav/nav";
// import "./theme.css";
import Home from "./pages/dashboard/Home";
import NewQuotat from "./pages/newQuotat/newQuotat";
import Quotation from "./pages/Quotation/quotation";
import LiveOrders from "./pages/Liveorder/Liveorder";
import Account from "./pages/account/account";
import CompletedOrders from "./pages/dashboard/completeOrder/completeOrder";

function App() {
  return (
    <HashRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/newQuotat" element={<NewQuotat />} />
        <Route path="/quotation" element={<Quotation />} />
        <Route path="/Liveorder" element={<LiveOrders />} />
        <Route path="/Account"  element={<Account/>}/>
        <Route path="/completed" element={<CompletedOrders />} />

      </Routes>
      
    </HashRouter>
  );
}

export default App;
