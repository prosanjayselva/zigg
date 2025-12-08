import React, { useEffect, useState } from "react";
import "./completeOrder.css";

export default function CompletedOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
  fetch("http://localhost:4000/move-to-completed")
    .then((res) => res.json())
    .then((data) => setOrders(data))
    .catch(err => console.log("Error fetching:", err));
}, []);


  return (
    <div className="completed-page">
      <h1 className="title">Completed Orders</h1>

      <table className="completed-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Material Type</th>
            <th>Material Thickness</th>
            <th>Material Owner</th>
            <th>Material Len</th>
            <th>Material Wid</th>
            
          </tr>
        </thead>
        <tbody>
          {orders.map((o, index) => (
            <tr key={index}>
              <td>{o.id}</td>
              <td>{o.name}</td>
              <td>{o.phone}</td>
              <td>{o.date}</td>
              <td>{o.materialtype}</td>
              <td>{o.materialthickness}</td>
              <td>{o.materialowner}</td>
              <td>{o.materialLen}</td>
              <td>{o.materialWid}</td>
              <td>₹{o.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
