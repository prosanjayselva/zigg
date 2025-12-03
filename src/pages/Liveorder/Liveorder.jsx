import React, { useEffect, useState } from "react";
import "./Liveorder.css";

const LiveOrderTable = () => {
  const [liveOrders, setLiveOrders] = useState([]);
  const [search, setSearch] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [materialFilter, setMaterialFilter] = useState("");

  // Fetch live orders
  const fetchLiveOrders = () => {
    fetch("http://localhost:4000/live-orders")
      .then((res) => res.json())
      .then((data) => setLiveOrders(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchLiveOrders();
  }, []);

  // Move back to quotation
  const backToQuotation = async (order) => {
    try {
      const res = await fetch(`http://localhost:4000/backTo/${order.id}`, {
        method: "POST",
      });

      if (!res.ok) throw new Error("Failed to move back to Quotation!");

      setLiveOrders((prev) => prev.filter((o) => o.id !== order.id));
    } catch (err) {
      alert(err.message);
    }
  };

  // Mark as completed
  const markCompleted = async (order) => {
    try {
      const res = await fetch("http://localhost:4000/completed-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      if (!res.ok) throw new Error("Failed to mark as completed!");

      // Remove from live orders
      await fetch(`http://localhost:4000/live-orders/${order.id}`, {
        method: "DELETE",
      });

      setLiveOrders((prev) => prev.filter((o) => o.id !== order.id));
    } catch (err) {
      alert(err.message);
    }
  };

  // Filter logic
  const filteredOrders = liveOrders.filter((order) => {
    const query = search.toLowerCase();

    const matchesSearch =
      order.name.toLowerCase().includes(query) ||
      order.phone.includes(query) ||
      order.materialtype.toLowerCase().includes(query);

    const orderDate = new Date(order.date);
    const afterStart = startDate ? orderDate >= new Date(startDate) : true;
    const beforeEnd = endDate ? orderDate <= new Date(endDate) : true;

    const matchesMaterial =
      materialFilter === "" || order.materialtype === materialFilter;

    return matchesSearch && afterStart && beforeEnd && matchesMaterial;
  });

  return (
    <div className="live-container">
      <h2>Live Orders</h2>

      {/* FILTER BAR */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search Name / Phone / Material..."
          className="search-box"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="date-filter">
          <label>Start:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <label>End:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <select
          className="material-filter"
          value={materialFilter}
          onChange={(e) => setMaterialFilter(e.target.value)}
        >
          <option value="">All Materials</option>
          <option value="SS">SS</option>
          <option value="MS">MS</option>
          <option value="AL">AL</option>
          <option value="BRASS">BRASS</option>
          <option value="GI">GI</option>
          <option value="SPRING STEEL">SPRING STEEL</option>
        </select>

        <button
          className="clear-filter"
          onClick={() => {
            setSearch("");
            setStartDate("");
            setEndDate("");
            setMaterialFilter("");
          }}
        >
          Clear
        </button>
      </div>

      {/* TABLE */}
      <table className="live-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Material Type</th>
            <th>Price</th>
            <th>Remarks</th>
            <th>Undo</th>
            <th>Completed</th>
          </tr>
        </thead>

        <tbody>
          {filteredOrders.length === 0 && (
            <tr>
              <td colSpan="9" style={{ textAlign: "center", color: "gray" }}>
                No matching records
              </td>
            </tr>
          )}

          {filteredOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.name}</td>
              <td>{order.phone}</td>
              <td>{order.date}</td>
              <td>{order.materialtype}</td>
              <td>{order.price}</td>
              <td>{order.remarks}</td>

              <td className="back-btn">
                <button onClick={() => backToQuotation(order)}>
                  Back
                </button>
              </td>

              <td className="done-btn">
                <button onClick={() => markCompleted(order)}>Done</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  );
};

export default LiveOrderTable;
