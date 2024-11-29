import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Example card */}
        
        <div className="bg-white shadow p-4 rounded-lg">
          <h2 className="text-xl font-bold text-gray-900">Manage Users</h2>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">View</button>
        </div>
        {/* Add more cards for managing artworks, comments, etc. */}
        
      </div>
    </div>
  );
};

export default AdminDashboard;
