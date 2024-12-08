import React, { useState } from "react";
import { FaEdit, FaSave } from "react-icons/fa";

function ProfileDetails() {
  const [isEditing, setIsEditing] = useState(false);
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [profile, setProfile] = useState(user);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  return (
    <div className="profile-details p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
      <img
        src={profile.profileImage}
        alt="Profile"
        className="w-24 h-24 rounded-full mx-auto mb-4"
      />
      <h3 className="text-2xl font-bold text-center mb-6">Profile Details</h3>
      <div className="space-y-4">
        {["username", "firstName", "lastName", "email", "bio"].map((field) => (
          <div key={field} className="flex flex-col items-start">
            <label className="text-sm font-semibold text-gray-600 mb-1">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <div className="flex items-center justify-between w-full">
              {isEditing ? (
                <input
                  type="text"
                  name={field}
                  value={profile[field]}
                  onChange={handleChange}
                  className="border-b-2 border-gray-300 focus:border-blue-500 outline-none flex-grow mr-2 p-1"
                />
              ) : (
                <p className="text-lg flex-grow">{profile[field]}</p>
              )}
              <button
                onClick={handleEditClick}
                className="text-blue-500 hover:text-blue-700"
              >
                {isEditing ? <FaSave /> : <FaEdit />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileDetails;
