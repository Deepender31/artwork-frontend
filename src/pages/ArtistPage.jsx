import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";

// Demo data with avatar images
const demoArtists = [
  {
    id: 1,
    name: "Artist One",
    bio: "Bio of Artist One",
    artworks: ["Artwork 1", "Artwork 2"],
    profile: "Profile of Artist One",
    image: "https://ui-avatars.com/api/?name=Artist+One&background=random"
  },
  {
    id: 2,
    name: "Artist Two",
    bio: "Bio of Artist Two",
    artworks: ["Artwork 1"],
    profile: "Profile of Artist Two",
    image: "https://ui-avatars.com/api/?name=Artist+Two&background=random"
  },
  {
    id: 3,
    name: "Artist Three",
    bio: "Bio of Artist Three",
    artworks: ["Artwork 1", "Artwork 2", "Artwork 3"],
    profile: "Profile of Artist Three",
    image: "https://ui-avatars.com/api/?name=Artist+Three&background=random"
  },
  {
    id: 4,
    name: "Artist Four",
    bio: "Bio of Artist Four",
    artworks: ["Artwork 1"],
    profile: "Profile of Artist Four",
    image: "https://ui-avatars.com/api/?name=Artist+Four&background=random"
  },
  {
    id: 5,
    name: "Artist Five",
    bio: "Bio of Artist Five",
    artworks: ["Artwork 1", "Artwork 2"],
    profile: "Profile of Artist Five",
    image: "https://ui-avatars.com/api/?name=Artist+Five&background=random"
  },
];

const ArtistPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [artists, setArtists] = useState(demoArtists);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredArtists = artists.filter(artist =>
    artist.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <NavigationBar />
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Artists</h1>
      <input
        type="text"
        placeholder="Search for an artist..."
        value={searchTerm}
        onChange={handleSearch}
        className="border p-2 mb-6 w-full max-w-md mx-auto block"
      />
      <div className="flex flex-wrap justify-center">
        {filteredArtists.map((artist) => (
          <div key={artist.id} className="w-full sm:w-1/2 lg:w-1/3 p-4">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={artist.image} alt={artist.name} className="w-full h-48 object-cover" />
              <div className="px-6 py-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{artist.name}</h2>
                <p className="text-gray-600 text-base mb-4">{artist.profile}</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span className="mr-2">
                    {artist.artworks.length} {artist.artworks.length === 1 ? 'Artwork' : 'Artworks'}
                  </span>
                </div>
                <Link 
                  to={`/artist/${artist.id}`}
                  className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                >
                  View Portfolio
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistPage;
