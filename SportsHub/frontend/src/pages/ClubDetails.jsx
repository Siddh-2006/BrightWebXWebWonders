import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Check, Users, Trophy, Video, Play, Star } from 'lucide-react';

const ClubDetails = ({ isDarkMode }) => {
    const { clubName } = useParams();
    const decodedClubName = decodeURIComponent(clubName);

    const [club, setClub] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClub = async () => {
            try {
                const res = await axios.get("http://localhost:3000/clubs", {
                    withCredentials: true
                });

                const match = res.data.find(
                    c => c.name.toLowerCase() === decodedClubName.toLowerCase()
                );

                // Inject dummy data
                if (match) {
                    match.vlogs = [
                        {
                            title: 'Match Day Vlog',
                            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
                        },
                        {
                            title: 'Behind the Scenes',
                            videoUrl: 'https://www.youtube.com/embed/3GwjfUFyY6M'
                        }
                    ];

                    match.reels = [
                        {
                            title: 'Goal Highlights',
                            videoUrl: 'https://www.youtube.com/embed/9bZkp7q19f0'
                        },
                        {
                            title: 'Best Moments',
                            videoUrl: 'https://www.youtube.com/embed/V-_O7nl0Ii0'
                        }
                    ];
                }

                setClub(match);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching club:", err);
                setLoading(false);
            }
        };
        fetchClub();
    }, [decodedClubName]);


    if (loading) return <div className="p-10">Loading...</div>;
    if (!club) return <div className="p-10 text-red-500">Club not found.</div>;

    const accentColor = isDarkMode ? 'text-orange-500' : 'text-blue-500';
    const sectionBg = isDarkMode ? 'bg-white/5' : 'bg-black/5';

    return (
        <div className={`pt-28 px-6 md:px-12 lg:px-24 min-h-screen ${isDarkMode ? 'text-white' : 'text-black'}`}>
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
                <img
                    src={club.logo}
                    alt={club.name}
                    className="w-28 h-28 rounded-2xl object-cover border-2 shadow-md"
                />
                <div>
                    <h1 className={`text-4xl font-bold ${accentColor} mb-2`}>
                        {club.name}
                        {club.approved && (
                            <Check className="inline w-5 h-5 ml-2 text-green-400" />
                        )}
                    </h1>
                    <p className="text-sm text-gray-400">
                        Founded on {new Date(club.createdAt).toLocaleDateString()}
                    </p>
                </div>
            </div>

            {/* Description */}
            <p className="text-lg mb-8">{club.description}</p>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
                <div className={`${sectionBg} p-4 rounded-xl text-center`}>
                    <Users className={`${accentColor} mx-auto mb-2`} />
                    <p className="text-xl font-bold">{club.players?.length || 0}</p>
                    <p className="text-sm text-gray-400">Players</p>
                </div>
                <div className={`${sectionBg} p-4 rounded-xl text-center`}>
                    <Trophy className={`${accentColor} mx-auto mb-2`} />
                    <p className="text-xl font-bold">{club.matchHistory?.length || 0}</p>
                    <p className="text-sm text-gray-400">Matches</p>
                </div>
                <div className={`${sectionBg} p-4 rounded-xl text-center`}>
                    <Star className={`${accentColor} mx-auto mb-2`} />
                    <p className="text-xl font-bold">{club.highlights?.length || 0}</p>
                    <p className="text-sm text-gray-400">Highlights</p>
                </div>
            </div>

            {/* Sports (if any) */}
            {club.sports?.length > 0 && (
                <div className="mb-10">
                    <h2 className={`text-2xl font-semibold mb-3 ${accentColor}`}>Sports</h2>
                    <ul className="flex flex-wrap gap-3">
                        {club.sports.map((sport, index) => (
                            <li key={index} className="bg-gray-400/10 px-4 py-2 rounded-full text-sm">
                                {sport}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Players (if any) */}
            {club.players?.length > 0 && (
                <div>
                    <h2 className={`text-2xl font-semibold mb-3 mt-15 ${accentColor}`}>Players</h2>
                    <ul className="space-y-2">
                        {club.players.map((player, idx) => (
                            <li key={idx} className="bg-gray-500/10 p-3 rounded-lg text-sm">
                                {player.name || 'Unnamed Player'}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {/* Vlogs Section */}
            {club.vlogs?.length > 0 && (
                <div className="mb-12 mt-15">
                    <h2 className={`text-2xl font-semibold mb-4 ${accentColor}`}>Vlogs</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {club.vlogs.map((vlog, idx) => (
                            <div key={idx} className={`${sectionBg} p-4 rounded-xl shadow-md`}>
                                <div className="aspect-video mb-3">
                                    <iframe
                                        src={vlog.videoUrl}
                                        title={vlog.title}
                                        className="w-full h-full rounded-lg"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                                <p className="font-medium">{vlog.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Reels Section */}
            {club.reels?.length > 0 && (
                <div className="mb-12 mt-15">
                    <h2 className={`text-2xl font-semibold mb-4 ${accentColor}`}>Reels</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {club.reels.map((reel, idx) => (
                            <div key={idx} className={`${sectionBg} p-4 rounded-xl shadow-md`}>
                                <div className="aspect-video mb-3">
                                    <iframe
                                        src={reel.videoUrl}
                                        title={reel.title}
                                        className="w-full h-full rounded-lg"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                                <p className="font-medium">{reel.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
};

export default ClubDetails;
