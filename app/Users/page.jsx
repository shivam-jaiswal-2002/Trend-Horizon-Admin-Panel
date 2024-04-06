"use client";
// MyOrderPage.js
import React, { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import { useRouter } from "next/navigation";

export const MyOrderPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const session = await getSession();
      if (!session) {
        router.push("/");
        throw new Error('User not authenticated');
      }

      const response = await fetch("/api/users");
      const responseData = await response.json();
      setUsers(responseData.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Error fetching orders. Please try again later.');
      setLoading(false);
    }
  };


  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-4">Registered Users</h1>
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
          {users.map((user) => (
            <div key={user._id} className="bg-white shadow-md rounded-md p-4 mb-4">
              <h2 className="text-xl font-semibold mb-2">User ID: {user._id}</h2>
              <p className="mb-2">User Email: {user.email}</p>
              <p className="mb-2">User Password: {user.password}</p>
              {/* {order.status==="in progress" && 
              <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleSave(order._id)}>Delivered</button>
              } */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrderPage;
