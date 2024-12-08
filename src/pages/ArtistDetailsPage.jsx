import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import ArtworkCard from "../components/ArtworkCard";
import demoArtworks from "../data/demoArtworks";
import { userAPI } from "../services/api";

const fetchArtistDetails =  async (artistId) => {
  const token = localStorage.getItem('token');
  const response = await userAPI.getUserProfile(artistId, token);
  return response;
}


const ArtistDetailsPage = () => {
  const { artistId } = useParams();
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    const getArtistData = async () => {
      const artistData = await fetchArtistDetails(artistId);
      console.log(artistData);
      setArtist(artistData);
    };
    
    getArtistData();
  }, [artistId]);

  if (!artist) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NavigationBar />
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
          <img
            src={artist.user.profileImage}
            alt={artist.user.username}
            className="w-full h-48 object-cover"
          />
          <div className="px-6 py-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {artist.user.firstName} {artist.user.lastName}
            </h2>
            <p className="text-gray-600 text-base mb-4">{artist.user.bio}</p>
            <p className="text-gray-600 text-base mb-4">
              Email: {artist.email}
            </p>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Artworks</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 px-4 auto-rows-fr">
          {console.log(artist.artworks)}
          {artist.artworks &&
            artist.artworks.map((artwork) => (
              <div
                key={artwork.id}
                className="transform hover:scale-105 transition-transform duration-300 hover:shadow-xl"
              >
                <ArtworkCard
                  artwork={artwork}
                  showBuyNow={true}
                  showAddToCart={true}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistDetailsPage;
