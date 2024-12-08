import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import { userAPI } from "../services/api";
import { useEffect } from "react";

const ArtistPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    const response = await userAPI.getAllArtist();
   
    setArtists(response);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredArtists = artists?.filter(artist =>
    artist.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    artist.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    artist.username.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div>
      <NavigationBar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center ">Artists</h1>
      <input
        type="text"
        placeholder="Search for an artist..."
        value={searchTerm}
        onChange={handleSearch}
        className="border p-2 mb-6 w-full max-w-md mx-auto block"
      />
      <div className="flex flex-wrap justify-center">
        {filteredArtists && filteredArtists.map((artist) => (
          <div key={artist._id} className="w-full sm:w-1/2 lg:w-1/3 p-4">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={artist.profileImage} alt={artist.name} className="w-full h-48 object-cover" />
              <div className="px-6 py-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{artist.firstName} {artist.lastName}</h2>
                <p className="text-gray-600 text-base mb-4">{artist.bio}</p>
                {/* <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span className="mr-2">
                    {artist.artworks.length} {artist.artworks.length === 1 ? 'Artwork' : 'Artworks'}
                  </span>
                </div> */}
                <Link 
                  to={`/artist/${artist._id}`}
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
    </div>
  );
};

export default ArtistPage;
