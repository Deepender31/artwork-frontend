import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GalleryPage from "./pages/GalleryPage";
import UserProfilePage from "./pages/UserProfilePage";
import AdminDashboard from "./pages/AdminDashboard";
import LoginPage from "./components/LoginPage";
import ArtistPage from "./pages/ArtistPage";
import RegisterPage from "./components/RegisterPage";
import ArtistDetailsPage from "./pages/ArtistDetailsPage";
import ArtworkDetails from "./pages/ArtworkDetails";
import CartPage from "./pages/CartPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import UserDashboard from "./pages/UserDashboard";
import ArtistDashboard from "./pages/ArtistDashboard";
import CheckoutForm from "./components/CheckoutForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/checkout" element={<CheckoutForm />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/artwork/:artworkId" element={<ArtworkDetails />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/artists" element={<ArtistPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/artist/:artistId" element={<ArtistDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/order/:orderId" element={<OrderDetailsPage />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/artist" element={<ArtistDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
