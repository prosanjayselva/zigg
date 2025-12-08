import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Dashboard = () => {
  const [quotation, setQuotation] = useState(0);
  const [live, setLive] = useState(0);
  const [completed, setCompleted] = useState(0);

  const fetchData = async () => {
    try {
      const quote = await fetch("http://localhost:4000/quotation");
      const q = await quote.json();

      const liveRes = await fetch("http://localhost:4000/live-orders");
      const l = await liveRes.json();

      const compRes = await fetch("http://localhost:4000/complete");
      const c = await compRes.json();

      setQuotation(q.length);
      setLive(l.length);
      setCompleted(c.length);
      
    } catch (err) {
      console.log("ERROR:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="dash-container">
      <h1 className="dash-title">Dashboard</h1>

      <div className="dash-grid">

        <Link id="quot-bt" to="/quotation" className="dash-card orange">
          <button>Quotation</button>
          <p>{quotation}</p>
        </Link>

        <Link id="liv-bt" to="/Liveorder" className="dash-card blue">
          <button>Live Orders</button>
          <p>{live}</p>
        </Link>

       <Link id="com-bt" to="/completed" className="dash-card green">
       <button>Completed Orders</button>
        <p>{completed}</p>
      </Link>

      </div>
    </div>
  );
};

export default Dashboard;
