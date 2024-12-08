import React,{useState,useEffect} from "react";
import { artworkAPI } from "../services/api";
import { useParams } from "react-router-dom"; // Assuming demoartwork is exported from this path
import NavigationBar from "../components/NavigationBar";

const ArtworkDetails = () => {
  const artworkId = useParams();
  console.log(artworkId);
  const [artwork, setArtwork] = useState(null);

  useEffect(() => {
    const fetchArtwork = async () => {
      const response = await artworkAPI.getArtworkById(artworkId.artworkId);
      console.log(response);
      setArtwork(response);
    };
    fetchArtwork();
  }, [artworkId]);

  

  return (

    <div>
      <NavigationBar />
      <div className="max-w-2xl mx-auto py-12">
        {artwork && (
          <>
            <h1 className="text-4xl font-bold">{artwork.title}</h1>
            <img
          src={artwork.image}
          alt={artwork.title}
          className="w-full h-auto mt-4"
        />
        <p className="mt-4">{artwork.description}</p>
        
        {/* Artist Information */}
        <div className="mt-4 bg-gray-50 p-4 rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">Artist</h2>
          <div className="flex items-center">
            <img 
              src={artwork.artistId.profileImage} 
              alt={`${artwork.artistId.firstName} ${artwork.artistId.lastName}`}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <p className="font-medium">{artwork.artistId.firstName} {artwork.artistId.lastName}</p>
              <p className="text-gray-600">@{artwork.artistId.username}</p>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-gray-600">Category: {artwork.category}</p>
          <p className="text-gray-600">Price: ${artwork.price.toFixed(2)}</p>
          <p className="text-gray-600">Likes: {artwork.likes.length}</p>
        </div>

        {/* Comments Section */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Comments ({artwork.comments.length})</h2>
          {artwork.comments && artwork.comments.length > 0 ? (
            <ul className="mt-4 space-y-4">
              {artwork.comments.map((comment, index) => (
                <li key={index} className="bg-gray-50 p-3 rounded">
                  {comment.text}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-gray-600">No comments yet.</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2">
            Add to Cart
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
            Buy Now
          </button>
        </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ArtworkDetails;
