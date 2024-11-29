import React from "react";
import ArtworkCard from "../components/ArtworkCard";
import demoArtworks from "../data/demoArtworks";
import NavigationBar from "../components/NavigationBar";

const GalleryPage = () => {
  const handleAddToCart = (artwork) => {
    console.log(`Added to cart: ${artwork.title}`);
  };

  const handleBuyNow = (artwork) => {
    console.log(`Buying now: ${artwork.title}`);
  };

  const handleLike = (artwork) => {
    // TODO: Implement like functionality
    const userId = "123";
    artwork.likes.push(userId);

    console.log(`Liked artwork with ID: ${artwork}`);
  };

  const handleAddComment = (artwork, comment) => {
    // add comment to artwork
    artwork.comments.push(comment);

    console.log(`Added comment to artwork with ID: ${artwork}: ${comment}`);
  };

  return (
    <>
      <NavigationBar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Gallery</h1>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 auto-rows-auto">
          {demoArtworks.map((artwork) => (
            <ArtworkCard
              key={artwork._id}
              artwork={artwork}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              onLike={handleLike}
              onAddComment={handleAddComment}
              showBuyNow={true}
              showAddToCart={true}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default GalleryPage;
