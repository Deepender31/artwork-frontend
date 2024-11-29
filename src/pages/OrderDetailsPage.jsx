import React from "react";
import { demoOrderDetails } from "../data/demoOrderDetails";
import { useParams } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  console.log(orderId);
  const order = demoOrderDetails.find((order) => order.id == orderId);

  if (!order) {
    return <div className="text-center text-red-500">Order not found</div>;
  }

  return (
    <div className="p-5 mx-auto bg-gray-100 rounded-lg shadow-md">
      <NavigationBar />
      <div>
        <h1 className="text-3xl font-bold text-center mb-5">Order Details</h1>
        <p className="text-lg mb-2">Order ID: {order.id}</p>
        <p className="text-lg mb-5">Order Date: {order.date}</p>
        <h2 className="text-2xl font-semibold mb-3">Items</h2>
        <ul className="list-none p-0">
          {order.items.map((item) => (
            <li
              key={item.id}
              className="flex items-center mb-4 p-4 bg-white rounded-lg shadow-sm"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-cover rounded-md mr-4"
              />
              <div>
                <h3 className="text-xl font-medium">{item.title}</h3>
                <p className="text-gray-600">Price: ${item.price}</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
              </div>
            </li>
          ))}
        </ul>
        <h2 className="text-xl font-bold text-right mt-5">
          Total: ${order.total}
        </h2>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
