import React, { useEffect, useState } from "react";
import "./quotation.css";

const Quatation = () => {
    const [details, setDetails] = useState([]);

    const [uniqueList, setUniqueList] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userItems, setUserItems] = useState([]);

    const getToday = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const dd = String(today.getDate()).padStart(2, "0");
        return `${yyyy}-${mm}-${dd}`;
    };


    const [startDate, setStartDate] = useState(getToday());
    const [endDate, setEndDate] = useState(getToday());


    useEffect(() => {
        fetch("http://localhost:4000/quotation")
            .then((res) => res.json())
            .then((data) => setDetails(data))
            .catch((err) => console.log(err));
    }, []);


    // Filter based on date
    const applyDateFilter = (data) => {
        if (!startDate && !endDate) return data;

        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        return data.filter((item) => {
            if (!item.date) return false;

            const itemDate = new Date(item.date);

            if (start && itemDate < start) return false;
            if (end && itemDate > end) return false;

            return true;
        });
    };

    // Convert to live order function 

    
    // Convert to live order function 
const convertToLive = async (item) => {
  try {
    //  Add to live order
    const res = await fetch("http://localhost:4000/live-orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });

    if (!res.ok) throw new Error("Failed to add Live");

    //  Delete from quotation
    const delRes = await fetch(`http://localhost:4000/quotation/${item.id}`, {
      method: "DELETE",
    });

    if (!delRes.ok) throw new Error("Failed to delete from quotation");

    //  Update UI immediately
    setDetails((prev) => prev.filter((d) => d.id !== item.id));

    //  Optional: update userItems if this user is selected
    setUserItems((prev) => prev.filter((d) => d.id !== item.id));

  } catch (err) {
    console.log(err);
    alert(err.message);
  }
};









    // Build unique list with count
    useEffect(() => {
        const filtered = applyDateFilter(details);

        const map = new Map();

        filtered.forEach((item) => {
            const key = item.name + "_" + item.phone;

            if (!map.has(key)) {
                map.set(key, {
                    name: item.name,
                    phone: item.phone,
                    count: 1,
                });
            } else {
                map.get(key).count++;
            }
        });

        setUniqueList([...map.values()]);
    }, [details, startDate, endDate]);

    // When clicking a user
    const handleSelectUser = (u) => {
        setSelectedUser(u);

        const filtered = applyDateFilter(details).filter(
            (item) => item.name === u.name && item.phone === u.phone
        );

        setUserItems(filtered);
    };

    return (
        <>
        <div className="Qh1"> <h1>Quotation</h1></div>
        <div className="container">
            {/* ---------------- LEFT SIDE ---------------- */}
            <div className="left">
                
                <h2>User List</h2>

                {/* Date Filter */}
                <div className="filter-box">
                    <label>Start Date:</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />

                    <label>End Date:</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />

                    <button
                        onClick={() => {
                            setStartDate("");
                            setEndDate("");
                        }}


                        className="clear-btn"
                    >
                        Clear
                    </button>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>

                    <tbody>
                        {uniqueList.map((u, i) => (
                            <tr
                                key={i}
                                onClick={() => handleSelectUser(u)}
                                className="click-row"
                            >
                                <td>{u.name}</td>
                                <td>{u.phone}</td>
                                <td>{u.count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
      
            {/* ------------- RIGHT SIDE ---------------- */}
            <div className="right">

                <div className="user-card">
                    <h2>Selected User Details</h2>

                    {!selectedUser && <p className="placeholder">Click a user from the list</p>}

                    {selectedUser && (
                        <>
                            <p><b>Name:</b> {selectedUser.name}</p>
                            <p><b>Phone:</b> {selectedUser.phone}</p>
                            <p><b>Total Records:</b> {selectedUser.count}</p>

                            <h3>Repeated Records</h3>

                            <table className="records-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Material Type</th>
                                        <th>Price</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userItems.map((x, i) => (
                                        <tr key={i}>
                                            <td>{x.date}</td>
                                            <td>{x.materialtype}</td>
                                            <td>{x.price}</td>
                                            <td className="live-bt">
                                                <button
                                                    className="live-btn"
                                                    onClick={() => convertToLive(x)}
                                                >
                                                    <span id="bton" >Convert to Live</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </>
                    )}
                </div>
            </div>
        </div>
        </>
    );
};

export default Quatation;
