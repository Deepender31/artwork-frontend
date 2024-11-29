import React, { useEffect, useState } from "react";
import { fetchArtworks } from "../services/api";
import demoartwork from "../data/demoArtworks";
import ArtworkCard from "./ArtworkCard";

const FeaturedArtworks = () => {
  const [artworks, setArtworks] = useState(demoartwork);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadArtworks = async () => {
      try {
        const data = await fetchArtworks();
        setArtworks(data);
      } catch (err) {
        setError("Failed to load artworks");
      }
    };

    loadArtworks();
  }, []);

  

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900">
          Featured Artworks
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {artworks.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork}
             showAddToCart={true}
             showBuyNow={true} 
             onLike={(artwork) => {
              artwork.likes.push({_id: "1", text: "Liked"}) ; 
             }}
             onAddComment={(artwork, comment) => {
              artwork.comments.push({_id: "1", text: comment}) ; 
             }}


             />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedArtworks;
