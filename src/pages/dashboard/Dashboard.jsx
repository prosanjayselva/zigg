import React, { useEffect, useState } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const [quotation, setQuotation] = useState([]);
  const [live, setLive] = useState([]);
  const [completed, setCompleted] = useState([]);

  // Dashboard Numbers
  const [todayOrders, setTodayOrders] = useState(0);
  const [todayRevenue, setTodayRevenue] = useState(0);
  const [completedRevenue, setCompletedRevenue] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  // Fetch all 3 tables from backend
  const fetchData = async () => {
    try {
      const q = await fetch("http://localhost:4000/quotation").then((r) => r.json());
      const l = await fetch("http://localhost:4000/live-orders").then((r) => r.json());
      const c = await fetch("http://localhost:4000/completed-orders").then((r) => r.json());

      setQuotation(q);
      setLive(l);
      setCompleted(c);

      // All stats
      computeTodayStats([...q, ...l, ...c]);
      computeCompletedRevenue(c);
      computeMonthlyRevenue([...q, ...l, ...c]);
      computeTotalOrders(q, l, c);
    } catch (err) {
      console.log("ERROR:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* -----------------------------------------
      TOTAL ORDERS (Quotation + Live + Completed)
  ------------------------------------------ */
  const computeTotalOrders = (q, l, c) => {
    setTotalOrders(q.length + l.length + c.length);
  };

  /* -----------------------------------------
      TODAY ORDERS + TODAY REVENUE
  ------------------------------------------ */
  const computeTodayStats = (orders) => {
    const today = new Date().toISOString().split("T")[0];

    const todayList = orders.filter((o) => o.date === today);

    setTodayOrders(todayList.length);

    const total = todayList.reduce((acc, o) => acc + Number(o.price || 0), 0);
    setTodayRevenue(total);
  };

  /* -----------------------------------------
      COMPLETED ORDERS REVENUE (TOTAL)
  ------------------------------------------ */
  const computeCompletedRevenue = (orders) => {
    const total = orders.reduce((sum, o) => sum + Number(o.price || 0), 0);
    setCompletedRevenue(total);
  };

  /* -----------------------------------------
      MONTHLY REVENUE
      (Quotation + Live + Completed for this month)
  ------------------------------------------ */
  const computeMonthlyRevenue = (orders) => {
    const now = new Date();
    const month = now.getMonth();     // 0-11
    const year = now.getFullYear();   // full year

    const list = orders.filter((o) => {
      if (!o.date) return false;
      const d = new Date(o.date);
      return d.getMonth() === month && d.getFullYear() === year;
    });

    const total = list.reduce((acc, o) => acc + Number(o.price || 0), 0);
    setMonthlyRevenue(total);
  };

  return (
    <div className="dash-container">
      <h1 className="dash-title">Dashboard</h1>

      <div className="dash-grid">
        <div className="dash-card red">
          <h3>Total Orders</h3>
          <p>{totalOrders}</p>
        </div>

        <div className="dash-card orange">
          <h3>Quotation</h3>
          <p>{quotation.length}</p>
        </div>

        <div className="dash-card blue">
          <h3>Live Orders</h3>
          <p>{live.length}</p>
        </div>

        <div className="dash-card green">
          <h3>Completed Orders</h3>
          <p>{completed.length}</p>
        </div>

        <div className="dash-card pink">
          <h3>Today Orders</h3>
          <p>{todayOrders}</p>
        </div>

        <div className="dash-card gold">
          <h3>Today Revenue</h3>
          <p>₹ {todayRevenue}</p>
        </div>

        <div className="dash-card purple">
          <h3>Completed Revenue</h3>
          <p>₹ {completedRevenue}</p>
        </div>

        <div className="dash-card cyan">
          <h3>Monthly Revenue</h3>
          <p>₹ {monthlyRevenue}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
