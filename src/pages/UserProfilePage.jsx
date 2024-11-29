import React from 'react';
import { useSelector } from 'react-redux';

const UserProfilePage = () => {
  const user = useSelector((state) => state.user.profile);

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/3">
          <img src={user.profilePicture} alt={user.name} className="w-32 h-32 rounded-full" />
          <h1 className="text-3xl font-bold text-gray-900 mt-4">{user.name}</h1>
          <p className="text-gray-700">{user.bio}</p>
          <div className="mt-4">
            <a href={user.socialLinks.twitter} className="text-blue-500 hover:text-blue-700">Twitter</a>
            <a href={user.socialLinks.instagram} className="ml-4 text-blue-500 hover:text-blue-700">Instagram</a>
          </div>
        </div>
        <div className="lg:w-2/3 lg:pl-8">
          <h2 className="text-2xl font-bold text-gray-900">Portfolio</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {user.artworks.map((artwork) => (
              <div key={artwork.id} className="group relative">
                <img src={artwork.image} alt={artwork.title} className="w-full h-auto rounded-md" />
                <div className="mt-2">
                  <h3 className="text-sm text-gray-700">{artwork.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
