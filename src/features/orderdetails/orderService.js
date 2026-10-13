import axios from "axios";

const API_URL = 'https://api.lavisheventzz.com/api/orders';
// const API_URL = "http://localhost:5000/api/orders";

// Create neww order
const createOrder = async (orderData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, orderData, config);
  return response.data;
};

// Get user orders
const getMyOrders = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/my-orders`, config);
  return response.data;
};

const orderService = {
  createOrder,
  getMyOrders,
};

export default orderService;
