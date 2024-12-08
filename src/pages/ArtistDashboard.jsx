import React, { useEffect, useState } from "react";
import ArtworkCard from "../components/ArtworkCard";
import demoArtworks from "../data/demoArtworks";
import { FaEdit } from "react-icons/fa";
import NavigationBar from "../components/NavigationBar";
import ProfileDetails from "../components/ProfileDetails";
import OrderDetails from "../components/OrderDetails";
import LikedArtworks from "../components/LikedArtworks";
import CreateArtwork from "../components/CreateArtwork";
import UpdateArtwork from "../components/UpdateArtwork";
import { artworkAPI, orderAPI } from "../services/api";
import { useSelector } from "react-redux";

function ArtistDashboard() {
  const [activeTab, setActiveTab] = useState("profile");
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [orders, setOrders] = useState([]);
  const [soldArtworks, setSoldArtworks] = useState([]);

  const token = localStorage.getItem("token");
  //getUser from store
  const userId = useSelector((state) => state.user.currentUser._id)|| JSON.parse(localStorage.getItem("currentUser"))._id;
  console.log(userId);
  const [AllArtistArtworks, setAllArtistArtworks] = useState([]);
  useEffect(() => {
    const fetchAllArtistArtworks = async () => {
      const response = await artworkAPI.getArtworksByArtist(userId);
      const data = await response;
      
      setAllArtistArtworks(data);
    };
    fetchAllArtistArtworks();
  }, []);
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await orderAPI.getOrders(userId);
      console.log(response);
      const data = await response;
      setOrders(data);
    };
    fetchOrders();
  }, []);
  useEffect(() => {
    const fetchSoldArtworks = async () => {
      try {
        const response = await orderAPI.getOrdersByArtist(userId);
        setSoldArtworks(response);
      } catch (error) {
        console.error('Error fetching sold artworks:', error);
      }
    };
    fetchSoldArtworks();
  }, [userId]);

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="profile-details">
            <ProfileDetails />
          </div>
        );
      case "artworks":
        return selectedArtwork ? (
          <UpdateArtwork 
            artwork={selectedArtwork} 
            onClose={() => setSelectedArtwork(null)}
          />
        ) : (
          <div className="artwork-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {AllArtistArtworks && AllArtistArtworks.map((artwork) => (
              <div key={artwork._id} className="relative">
                <ArtworkCard artwork={artwork} />
                <button 
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                  onClick={() => handleEditArtwork(artwork)}
                >
                  <FaEdit className="text-blue-500" />
                </button>
              </div>
            ))}
          </div>
        );
      case "orders":
        return (
          orders.length > 0 ? (
            console.log(orders),
          <div className="orders-list">
            <OrderDetails orders={orders} />
          </div>
        ) : (
          <div className="no-orders">
            <p>No orders found</p>
          </div>
        )  )
      case "sold":
        return (
          <div className="sold-artworks bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Artworks Sold
            </h3>
            {soldArtworks.length > 0 ? (
              <ul className="space-y-4">
                {console.log(soldArtworks)}
                {soldArtworks.map((order) => (
                  <li 
                    key={order._id} 
                    className="flex flex-col p-4 bg-white rounded-md shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold text-lg">{order.artworkId.title}</span>
                      <span className="text-green-600 font-medium">${order.price}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                      <div>
                        <p><strong>Buyer:</strong> {order.buyerId.firstName} {order.buyerId.lastName}</p>
                        <p><strong>Email:</strong> {order.buyerId.email}</p>
                      </div>
                      <div>
                        <p><strong>Category:</strong> {order.artworkId.category}</p>
                        <p><strong>Status:</strong> <span className="capitalize">{order.status}</span></p>
                        <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">No sold artworks found</p>
            )}
          </div>
        );
      case "liked":
        return (
          <div className="liked-artworks">
            <LikedArtworks userId={userId} />
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

  const handleEditArtwork = (artwork) => {
    setSelectedArtwork(artwork);
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
