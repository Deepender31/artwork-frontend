import React from "react";

function OrderDetails({ orders }) {
  return (
    <div className="order-details p-8 bg-white rounded-xl shadow-xl max-w-4xl mx-auto">
      <h3 className="text-3xl font-bold mb-6 text-gray-800 text-center">Order History</h3>
      <ul className="divide-y divide-gray-200 space-y-4">
        {orders.map((order) => (
          <li key={order._id} className="py-6 flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <img 
                src={order.artworkId.image} 
                alt={order.artworkId.title}
                className="w-32 h-32 object-cover rounded-lg shadow-md"
              />
            </div>
            <div className="flex-grow space-y-2">
              <h4 className="text-xl font-semibold text-gray-900">
                {order.artworkId.title}
              </h4>
              <p className="text-gray-600">{order.artworkId.description}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Order ID</p>
                  <p className="text-gray-800">{order._id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                    order.status === 'completed' ? 'bg-green-100 text-green-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Buyer</p>
                  <p className="text-gray-800">
                    {order.buyerId.firstName} {order.buyerId.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Price</p>
                  <p className="text-gray-800">${order.price.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderDetails; 