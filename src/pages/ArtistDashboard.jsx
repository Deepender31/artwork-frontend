import React, { useState } from "react";
import ArtworkCard from "../components/ArtworkCard";
import demoArtworks from "../data/demoArtworks";
import { FaEdit } from "react-icons/fa";
import NavigationBar from "../components/NavigationBar";
import ProfileDetails from "../components/ProfileDetails";
import OrderDetails from "../components/OrderDetails";
import LikedArtworks from "../components/LikedArtworks";
import CreateArtwork from "../components/CreateArtwork";
function ArtistDashboard() {
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
          <div className="profile-details">
            <ProfileDetails />
          </div>
        );
      case "artworks":
        return (
          <div className="artwork-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {demoArtworks.map((artwork) => (
              <ArtworkCard key={artwork._id} artwork={artwork} />
            ))}
          </div>
        );
      case "orders":
        return (
          <div className="orders-list">
            <OrderDetails orders={orders} />
          </div>
        );
      case "sold":
        return (
          <div className="sold-artworks bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Artworks Sold
            </h3>
            <ul className="space-y-2">
              <li className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-2 bg-white rounded-md shadow-sm">
                <span className="mb-1 sm:mb-0">Artwork A</span>
                <span className="text-gray-600">Sold for $200</span>
                <span className="text-sm text-gray-500">Date: 2023-09-15</span>
              </li>
              <li className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-2 bg-white rounded-md shadow-sm">
                <span className="mb-1 sm:mb-0">Artwork B</span>
                <span className="text-gray-600">Sold for $350</span>
                <span className="text-sm text-gray-500">Date: 2023-09-20</span>
              </li>
              {/* Add more items as needed */}
            </ul>
          </div>
        );
      case "liked":
        return (
          <div className="liked-artworks">
            <LikedArtworks />
          </div>
        );
      case "create":
        return (
          <div className="create-artwork">
            <CreateArtwork />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <NavigationBar />
      <div className="p-4 sm:p-6 bg-white bg-opacity-70 backdrop-blur-md shadow-xl rounded-2xl mx-2 sm:mx-4 my-4">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Artist Dashboard</h2>
        
        {/* Mobile Tab Menu */}
        <div className="block sm:hidden">
          <select 
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md bg-white"
          >
            <option value="profile">Profile</option>
            <option value="artworks">Artworks</option>
            <option value="orders">Orders</option>
            <option value="sold">Artworks Sold</option>
            <option value="liked">Liked Artworks</option>
            <option value="create">Create Artwork</option>
          </select>
        </div>

        {/* Desktop Tab Menu */}
        <div className="hidden sm:flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === "profile" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab("artworks")}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === "artworks" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Artworks
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === "orders" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Orders
          </button>
          <button
            onClick={() => setActiveTab("sold")}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === "sold" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Artworks Sold
          </button>
          <button
            onClick={() => setActiveTab("liked")}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === "liked" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Liked Artworks
          </button>
          <button
            onClick={() => setActiveTab("create")}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === "create" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Create Artwork
          </button>
        </div>

        <div className="overflow-x-auto">
          {renderContent()}
        </div>
      </div>
    </>
  );
}

export default ArtistDashboard;
