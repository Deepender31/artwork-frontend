import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import ArtworkCard from "../components/ArtworkCard";
import demoArtworks from "../data/demoArtworks";

// Mock function to simulate fetching data from a backend
const fetchArtistDetails = (artistId) => {
  const artists = {
    1: {
      username: "Artist One",
      email: "artistone@example.com",
      bio: "This is a bio of Artist One. A talented painter focused on abstract expressionism.",
      profileImage:
        "https://ui-avatars.com/api/?name=Artist+One&background=random",
      role: "artist",
      artworks: [demoArtworks[1], demoArtworks[7]], // Use demoArtworks for artist 1
    },
    2: {
      username: "Artist Two",
      email: "artisttwo@example.com",
      bio: "This is a bio of Artist Two. A sculptor who works primarily with metal and stone.",
      profileImage:
        "https://ui-avatars.com/api/?name=Artist+Two&background=random",
      role: "artist",
      artworks: [demoArtworks[2]], // Use demoArtworks for artist 2
    },
    3: {
      username: "Artist Three",
      email: "artistthree@example.com",
      bio: "This is a bio of Artist Three. A digital artist pushing the boundaries of technology and art.",
      profileImage:
        "https://ui-avatars.com/api/?name=Artist+Three&background=random",
      role: "artist",
      artworks: [demoArtworks[3]], // Use demoArtworks for artist 3
    },
  };

  return artists[artistId] || null;
};

const ArtistDetailsPage = () => {
  const { artistId } = useParams();
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    const artistData = fetchArtistDetails(artistId);
    setArtist(artistData);
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
            src={artist.profileImage}
            alt={artist.username}
            className="w-full h-48 object-cover"
          />
          <div className="px-6 py-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {artist.username}
            </h2>
            <p className="text-gray-600 text-base mb-4">{artist.bio}</p>
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
