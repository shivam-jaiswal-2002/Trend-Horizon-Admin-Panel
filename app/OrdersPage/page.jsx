"use client";
// MyOrderPage.js
import React, { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import { useRouter } from "next/navigation";

const MyOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const session = await getSession();
      if (!session) {
        router.push("/");
        throw new Error('User not authenticated');
      }

      const response = await fetch("/api/order");
      const responseData = await response.json();
      setOrders(responseData.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Error fetching orders. Please try again later.');
      setLoading(false);
    }
  };

  const handleSave = async (orderId) => {
    try {
      const orderToUpdate = orders.find(order => order._id === orderId);
      orderToUpdate.status = "Delivered";

      const response = await fetch('/api/orderUpdate', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderToUpdate),
      });

      if (response.ok) {
        // Refresh order list
        fetchOrders();
      } else {
        console.error('Failed to update order');
      }
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-4">My Orders</h1>
      {loading ? (
        <div className="fixed top-0 left-0 w-full h-full z-50 bg-gray-900 bg-opacity-75 flex justify-center items-center">
          <div className="spinner">
            <div className="dot dot-1 bg-blue-500"></div>
            <div className="dot dot-2 bg-green-500"></div>
            <div className="dot dot-3 bg-red-500"></div>
          </div>
        </div>
      ) : error ? (
        <div className="text-center mt-8 text-red-500">{error}</div>
      ) : (
        <div>
          {orders.map((order) => (
            <div key={order._id} className="bg-white shadow-md rounded-md p-4 mb-4">
              <h2 className="text-xl font-semibold mb-2">Order ID: {order._id}</h2>
              <p className="mb-2">Payment Method: {order.paymentMethod}</p>
              <p className="mb-2">Address: {order.shippingDetails.address}</p>
              <p className="mb-2">User: {order.user}</p>
              <p className="mb-2">Status: {order.status}</p>
              <p className="mb-2">Created At: {new Date(order.createdAt).toLocaleString()}</p>
              {order.status==="in progress" && 
              <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleSave(order._id)}>Delivered</button>

              }
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrderPage;
