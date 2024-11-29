import React from "react";
import { useParams } from "react-router-dom";
import demoartwork from "../data/demoArtworks"; // Assuming demoartwork is exported from this path
import NavigationBar from "../components/NavigationBar";

const ArtworkDetails = () => {
  const artworkId = useParams();
  console.log(artworkId.artworkId);
  console.log(demoartwork);
  const artwork = demoartwork.find((art) => art._id == artworkId.artworkId);

  if (!artwork) {
    return <div>Artwork not found</div>;
  }

  return (
    <div>
      <NavigationBar />
      <div className="max-w-2xl mx-auto py-12">
        <h1 className="text-4xl font-bold">{artwork.title}</h1>
        <img
          src={artwork.image}
          alt={artwork.title}
          className="w-full h-auto mt-4"
        />
        <p className="mt-4">{artwork.description}</p>
        <p className="mt-2 text-gray-600">Artist ID: {artwork.artistId}</p>
        <p className="mt-2 text-gray-600">Category: {artwork.category}</p>
        <p className="mt-2 text-gray-600">Price: ${artwork.price}</p>
        <p className="mt-2 text-gray-600">Likes: {artwork.likes.length}</p>

        <div className="mt-4">
          <h2 className="text-2xl font-semibold">Comments:</h2>
          {artwork.comments.length > 0 ? (
            <ul className="list-disc pl-5">
              {artwork.comments.map((comment, index) => (
                <li key={index} className="mt-1">
                  {comment.text}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-gray-600">No comments yet.</p>
          )}
        </div>

        <div className="mt-6">
          <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
            Add to Cart
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetails;
