import React,{useState,useEffect} from "react";
import ArtworkCard from "./ArtworkCard";
import { likeAPI } from "../services/api";

function LikedArtworks({ userId }) {
  const [likedArtworks, setLikedArtworks] = useState([]);

  useEffect(() => {
    const fetchLikedArtworks = async () => {
      const response = await likeAPI.getLikesByUser(userId);
      setLikedArtworks(response);
    };
    fetchLikedArtworks();
  }, [userId]);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Liked Artworks</h3>
      <ul className="list-disc pl-5">
        {likedArtworks.map((artwork) => (
          <li key={artwork._id} className="mb-2">
            <ArtworkCard artwork={artwork} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LikedArtworks; 