import React, { useState ,useContext} from "react";
import {Search,MapPin,Star,Users,Calendar,Trophy,Heart,MessageCircle,Share2,Plus,} from "lucide-react";
import PlayerCard from "./PlayerCard";
import ClubCard from "./ClubCard";
import navContext from "../context/navContext";
const players = [
  {
    id: 1,
    name: "Alex Rodriguez",
    sport: "Football",
    position: "Midfielder",
    location: "New York, NY",
    rating: 4.8,
    image: "/api/placeholder/150/150",
    experience: "5 years",
    achievements: ["State Champion 2023", "MVP Award"],
    bio: "Passionate midfielder looking for competitive team opportunities.",
    availability: "Weekends",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    sport: "Basketball",
    position: "Point Guard",
    location: "Los Angeles, CA",
    rating: 4.9,
    image: "/api/placeholder/150/150",
    experience: "7 years",
    achievements: ["College All-Star", "League Top Scorer"],
    bio: "Experienced point guard seeking professional opportunities.",
    availability: "Flexible",
  },
  {
    id: 3,
    name: "Mike Chen",
    sport: "Tennis",
    position: "Singles",
    location: "Miami, FL",
    rating: 4.6,
    image: "/api/placeholder/150/150",
    experience: "3 years",
    achievements: ["Regional Champion", "Tournament Winner"],
    bio: "Competitive tennis player looking for doubles partner.",
    availability: "Evenings",
  },
];

const clubs = [
  {
    id: 1,
    name: "Elite Sports Club",
    sport: "Multi-Sport",
    location: "Chicago, IL",
    members: 245,
    rating: 4.7,
    image: "/api/placeholder/200/120",
    description:
      "Premier sports facility offering training in multiple disciplines.",
    facilities: ["Swimming Pool", "Tennis Courts", "Gym", "Football Field"],
    founded: "2015",
    joinFee: "$150/month",
  },
  {
    id: 2,
    name: "Thunder Basketball Academy",
    sport: "Basketball",
    location: "Houston, TX",
    members: 180,
    rating: 4.9,
    image: "/api/placeholder/200/120",
    description:
      "Professional basketball training academy for all skill levels.",
    facilities: ["Indoor Courts", "Training Gym", "Recovery Center"],
    founded: "2018",
    joinFee: "$120/month",
  },
  {
    id: 3,
    name: "Coastal Football Club",
    sport: "Football",
    location: "San Diego, CA",
    members: 320,
    rating: 4.5,
    image: "/api/placeholder/200/120",
    description:
      "Community football club with competitive and recreational teams.",
    facilities: ["Multiple Fields", "Locker Rooms", "Equipment Storage"],
    founded: "2012",
    joinFee: "$80/month",
  },
];

function Home() {
  const nav_context=useContext(navContext)
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-8 bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500">
              <option>All Sports</option>
              <option>Football</option>
              <option>Basketball</option>
              <option>Tennis</option>
              <option>Baseball</option>
            </select>
            <select className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500">
              <option>All Locations</option>
              <option>New York</option>
              <option>Los Angeles</option>
              <option>Chicago</option>
              <option>Houston</option>
            </select>
            <select className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500">
              <option>Experience Level</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
              <option>Professional</option>
            </select>
            <select className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500">
              <option>Availability</option>
              <option>Weekdays</option>
              <option>Weekends</option>
              <option>Evenings</option>
              <option>Flexible</option>
            </select>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nav_context.activeTab === "players"
            ? players.map((player) => (
                <PlayerCard key={player.id} player={player} />
              ))
            : clubs.map((club) => <ClubCard key={club.id} club={club} />)}
        </div>
      </main>
    </div>
  );
}

export default Home;
