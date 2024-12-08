import React, { useState, useEffect } from "react";
import ArtworkCard from "../components/ArtworkCard";
import NavigationBar from "../components/NavigationBar";
import { artworkAPI } from "../services/api";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
import { addToCartStart, addToCartSuccess, addToCartFailure } from '../store/slices/cartSlice';
// import { cartAPI } from '../services/api';

const GalleryPage = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading: cartLoading } = useSelector((state) => state.cart);

  useEffect(() => {
    fetchArtworks();
  }, []);

  const fetchArtworks = async () => {
    try {
      const response = await artworkAPI.getAllArtworks();
      console.log(response);
      setArtworks(response);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching artworks:', error);
      setLoading(false);
    }
  };

  const handleAddToCart = async (artwork) => {
    try {
      dispatch(addToCartStart());
      
      dispatch(addToCartSuccess(artwork));
      // toast.success(`${artwork.title} added to cart`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      dispatch(addToCartFailure(error.message));
      // toast.error(error.message || 'Failed to add item to cart');
    }
  };

  const handleBuyNow = async (artwork) => {
    try {
      dispatch(addToCartStart());
      
      dispatch(addToCartSuccess(artwork));
      
      navigate('/checkout');
    } catch (error) {
      console.error('Error proceeding to checkout:', error);
      dispatch(addToCartFailure(error.message));
      // toast.error(error.message || 'Failed to proceed to checkout');
    }
  };
  
  const filteredArtworks = artworks
    .filter(artwork => {
      const matchesSearch = artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          artwork.artistId.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          artwork.artistId.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          artwork.artistId.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          artwork.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filter === "all" || artwork.category === filter;
      return matchesSearch && matchesFilter;
    });

  return (
    <>
      <NavigationBar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Gallery</h1>
        
        {/* Search and Filter Controls */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search artworks..."
            className="px-4 py-2 border rounded-md flex-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="px-4 py-2 border rounded-md"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="painting">Paintings</option>
            <option value="sculpture">Sculptures</option>
            <option value="digital">Digital Art</option>
            <option value="photography">Photography</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 auto-rows-auto">
            {filteredArtworks.map((artwork) => (
              <ArtworkCard
                key={artwork._id}
                artwork={artwork}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                showBuyNow={true}
                showAddToCart={true}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default GalleryPage;
