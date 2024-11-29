import React from "react";

function OrderDetails({ orders }) {
  return (
    <div className="order-details p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
      <h3 className="text-2xl font-bold mb-4 text-center">Order History</h3>
      <ul className="divide-y divide-gray-200">
        {orders.map((order) => (
          <li key={order.id} className="py-4 flex justify-between items-center">
            <div>
              <p className="text-lg font-semibold">Order #{order.id}</p>
              <p className="text-sm text-gray-500">Status: {order.status}</p>
              <p className="text-sm text-gray-500">Date: {order.date}</p>
            </div>
            <button className="text-blue-500 hover:text-blue-700">
              View Details
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderDetails; 