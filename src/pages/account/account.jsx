import React, { useEffect, useState } from "react";
import "./Account.css";    // your zigaa theme

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function Account() {
 const [report, setReport] = useState({
  todayRevenue: 0,
  monthlyRevenue: 0,
  totalRevenue: 0,
  completedRevenue: 0,
  totalExpense: 0,
  profit: 0
});



  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [rangeRevenue, setRangeRevenue] = useState(0);

  const [months, setMonths] = useState([]);
  const [monthTotals, setMonthTotals] = useState([]);

  // Load full account report
  const loadReport = async () => {
    const res = await fetch("http://localhost:4000/accounts-report");
    const data = await res.json();
    setReport(data);
  };

  // Date range search
  const loadRangeRevenue = async () => {
    if (!from || !to) return alert("Select both dates");

    const res = await fetch("http://localhost:4000/revenue-range", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ startDate: from, endDate: to })
    });

    const data = await res.json();
    setRangeRevenue(data.total);
  };

  // Monthly graph data
  const loadMonthlyGraph = async () => {
    const res = await fetch("http://localhost:4000/monthly-graph");
    const data = await res.json();

    setMonths(data.map(d => d.month));
    setMonthTotals(data.map(d => d.total));
  };

  useEffect(() => {
    loadReport();
    loadMonthlyGraph();
  }, []);

  return (
    <div className="account-page">

      <div className="title">
        <h1>ZIGAA ACCOUNT MANAGEMENT</h1>
      </div>

      {/* ==================== SUMMARY CARDS ==================== */}
      <div className="stats-grid">

        <div className="card">
          <h2>Today Revenue</h2>
          <p>₹{report.todayRevenue}</p>
        </div>

        <div className="card">
          <h2>Monthly Revenue</h2>
          <p>₹{report.monthlyRevenue}</p>
        </div>

        <div className="card">
          <h2>Total Revenue</h2>
          <p>₹{report.totalRevenue}</p>
        </div>

        <div className="card">
          <h2>Total Expense</h2>
          <p>₹{report.totalExpense}</p>
        </div>

        <div className="card">
          <h2>PROFIT</h2>
          <p>₹{report.profit}</p>
        </div>

      </div>

      {/* ==================== DATE RANGE FILTER ==================== */}
      <div className="range-filter card" style={{ marginTop: 30 }}>
        <h2>Filter Revenue (Date Range)</h2>

        <div style={{ display: "flex", gap: 20, marginTop: 10 }}>
          <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
          <input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
          <button className="btn" onClick={loadRangeRevenue}>
            Search
          </button>
        </div>

        <h3 style={{ marginTop: 15 }}>Total: ₹{rangeRevenue}</h3>
      </div>

      {/* ==================== MONTHLY GRAPH ==================== */}
      <div className="card" style={{ marginTop: 30 }}>
        <h2>Monthly Revenue Graph</h2>

        <Line
          data={{
            labels: months,
            datasets: [
              {
                label: "Revenue",
                data: monthTotals,
                borderColor: "#ff4d4d",
                backgroundColor: "rgba(255,0,0,0.3)",
                borderWidth: 3
              }
            ]
          }}
        />
      </div>

    </div>
  );
}
