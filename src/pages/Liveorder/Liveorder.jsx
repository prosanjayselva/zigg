import React, { useEffect, useState } from "react";
import './Liveorder.css'

const LiveOrderTable = () => {
    const [liveOrders, setLiveOrders] = useState([]);

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

    return (
        <div className="live-container">
            <h2>Live Orders</h2>

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
                    </tr>
                </thead>

                <tbody>
                    {liveOrders.length === 0 && (
                        <tr>
                            <td colSpan="7" style={{ textAlign: "center", color: "gray" }}>
                                No live orders yet
                            </td>
                        </tr>
                    )}

                    {liveOrders.map((order, index) => (
                        <tr key={index}>
                            <td>{order.id}</td>
                            <td>{order.name}</td>
                            <td>{order.phone}</td>
                            <td>{order.date}</td>
                            <td>{order.materialtype}</td>
                            <td>{order.price}</td>
                            <td>{order.remarks}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LiveOrderTable;
