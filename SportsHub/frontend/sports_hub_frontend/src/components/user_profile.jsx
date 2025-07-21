import React from "react";

export default function UserProfile() {
  const user = {
    name: "Bhaskar Sahu",
    sport: "Football",
    location: "Mumbai, India",
    bio: "Passionate midfielder with 5+ years of club experience. Looking to join a competitive team and grow.",
    achievements: [
      "MVP - Intercollege Football 2023",
      "Captain - Mumbai United FC",
      "AIFF Certified Training - 2022",
    ],
    clubs: ["Mumbai United FC", "Thane Strikers"],
    profilePic: "https://i.pravatar.cc/150?img=3",
    coverPhoto: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d",
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Cover Photo */}
      <div className="relative h-48 rounded-xl overflow-hidden">
        <img
          src={user.coverPhoto}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        {/* Profile Picture */}
        <div className="absolute -bottom-12 left-4">
          <img
            src={user.profilePic}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white shadow-md"
          />
        </div>
      </div>

      {/* User Info */}
      <div className="mt-16 px-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-sm text-gray-500">
              {user.sport} • {user.location}
            </p>
          </div>
          <div className="flex gap-2">
            <button className="bg-blue-600 text-white px-4 py-1 rounded-lg">
              Follow
            </button>
            <button className="border px-4 py-1 rounded-lg">Message</button>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold">About</h3>
          <p className="text-gray-700 mt-1">{user.bio}</p>
        </div>

        {/* Achievements */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Achievements</h3>
          <ul className="list-disc list-inside text-gray-700">
            {user.achievements.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Clubs */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Clubs</h3>
          <div className="flex flex-wrap gap-2 mt-1">
            {user.clubs.map((club, i) => (
              <span
                key={i}
                className="bg-gray-100 text-sm px-3 py-1 rounded-full border"
              >
                {club}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
