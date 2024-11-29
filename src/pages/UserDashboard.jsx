import React, { useState } from "react";
import NavigationBar from "../components/NavigationBar";
import ProfileDetails from "../components/ProfileDetails";
import OrderDetails from "../components/OrderDetails";
import LikedArtworks from "../components/LikedArtworks";

function UserDashboard() {
  const [activeTab, setActiveTab] = useState("profile");

  const orders = [
    { id: 1234, status: "Completed", date: "2023-10-01" },
    { id: 5678, status: "Pending", date: "2023-10-05" },
    { id: 9101, status: "Shipped", date: "2023-10-10" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <ProfileDetails />
          </div>
        );
      case "orders":
        return (
          <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <OrderDetails orders={orders} />
          </div>
        );
      case "likedArtworks":
        return (
          <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <LikedArtworks />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <NavigationBar />
      <div className="p-6 bg-white bg-opacity-70 backdrop-blur-md shadow-xl rounded-2xl">
        <h2 className="text-2xl font-bold mb-4">User Dashboard</h2>
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-4 py-2 ${
              activeTab === "profile" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2 ${
              activeTab === "orders" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Orders
          </button>
          <button
            onClick={() => setActiveTab("likedArtworks")}
            className={`px-4 py-2 ${
              activeTab === "likedArtworks" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Liked Artworks
          </button>
        </div>
        {renderContent()}
      </div>
    </>
  );
}

export default UserDashboard;
