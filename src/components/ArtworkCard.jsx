import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHeart,
  FaComment,
  FaShoppingCart,
  FaPaperPlane,
} from "react-icons/fa";

const ArtworkCard = ({
  artwork,
  onAddToCart,
  onBuyNow,
  onLike,
  onAddComment,
  showBuyNow,
  showAddToCart,
}) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(artwork.comments);
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    onLike(artwork);
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      const newComment = {
        id: Date.now(),
        text: comment,
      };
      setComments(comments.concat(newComment));
      setComment("");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden h-full  ">
      {/** Artist name */}
      <div className="flex items-center justify-between px-6 pt-4 pb-2 border-b border-gray-100">
        <div className="flex items-center">
          <img
            src={"https://ui-avatars.com/api/?name=" + artwork.artistId}
            alt={artwork.artistId}
            className="w-8 h-8 rounded-full object-cover mr-3 ring-2 ring-blue-100 shadow-sm"
          />
          <h4 className="text-gray-900 text-base font-medium tracking-wide hover:text-blue-600 transition-colors duration-200">
            {(artwork.artistId || "Unknown").toUpperCase()}
          </h4>
        </div>
      </div>
      <Link to={`/artwork/${artwork._id}`}>
        <img
          src={artwork.image}
          alt={artwork.title}
          className="w-full h-48 object-cover transition-opacity hover:opacity-90"
        />
        <div className="px-6 py-4">
          <h4 className="text-xl font-bold text-gray-800 mb-2">
            {artwork.title}
          </h4>
          <p className="text-gray-600 text-base mb-2">{artwork.description}</p>
          <p className="text-gray-600 text-base mb-2">
            Price: ${artwork.price}
          </p>
          <p className="text-gray-600 text-base mb-2">
            Category: {artwork.category}
          </p>
        </div>
      </Link>
      <div className="flex justify-between items-center mt-4 px-6">
        <button
          onClick={handleLike}
          className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300 flex items-center"
        >
          <FaHeart className="mr-2" />
          {artwork.likes.length}
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition duration-300 flex items-center"
        >
          <FaComment className="mr-2" />
        </button>
      </div>
      {showComments && (
        <div className="mt-4 px-6">
          <h5 className="text-lg font-bold text-gray-800 mb-2">Comments</h5>
          <ul className="mb-4 overflow-y-auto" style={{ maxHeight: "150px" }}>
            {comments.map((comment, index) => (
              <li key={index} className="text-gray-600 text-base mb-1">
                {comment.text}
              </li>
            ))}
          </ul>
          <div className="flex items-center ">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment"
              className="border border-gray-300 bg-white rounded-full w-full py-2 px-4 text-gray-700 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddComment}
              className="bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition duration-300 ml-2 flex items-center"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
      <div className="flex justify-between items-center mt-4 px-6 pb-4">
        {showAddToCart && (
          <button
            onClick={() => onAddToCart(artwork)}
            className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300 flex items-center"
          >
            <FaShoppingCart className="mr-2" />
            Add to Cart
          </button>
        )}
        {showBuyNow && (
          <button
            onClick={() => onBuyNow(artwork)}
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300 flex items-center"
          >
            ₹ Buy Now
          </button>
        )}
      </div>
    </div>
  );
};

export default ArtworkCard;
