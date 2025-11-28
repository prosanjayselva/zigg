const API_URL = "http://localhost:5000";

// Save order API
export const saveOrder = async (orderData) => {
  try {
    const res = await fetch(`${API_URL}/api/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    return await res.json();
  } catch (error) {
    console.log("Save API Error:", error);
    return { success: false, error: "Network Error" };
  }
};

// Fetch all orders
export const getAllOrders = async () => {
  try {
    const res = await fetch(`${API_URL}/api/order`);
    return await res.json();
  } catch (error) {
    console.log("Fetch API Error:", error);
    return [];
  }
};
