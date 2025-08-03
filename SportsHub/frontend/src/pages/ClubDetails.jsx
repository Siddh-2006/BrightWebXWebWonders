import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import {
  Check,
  Users,
  Trophy,
  Video,
  Play,
  Star,
  Zap,
  ArrowLeft,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Globe,
  Award,
  Instagram,
  Twitter,
  Youtube,
  ExternalLink,
  Newspaper,
  MessageSquare,
} from "lucide-react";
import { Link } from "react-router-dom";
import loginContext from "../context/loginContext";
import { challengeService } from "../services/challengeService";
import ChallengeModal from "../components/ChallengeModal";
import ClubUploadModal from "../components/ClubUploadMoodal";
import EditClubProfileModal from "../components/EditClubProfileModal";

const ClubDetails = ({ isDarkMode }) => {
  const { clubName } = useParams();
  const decodedClubName = decodeURIComponent(clubName);

  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userClub, setUserClub] = useState(null);
  const [isClubOwner, setIsClubOwner] = useState(false);
  const [challengeModalOpen, setChallengeModalOpen] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);

  const login_info = useContext(loginContext);

  useEffect(() => {
    const fetchClub = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/clubs`, {
          withCredentials: true,
        });
        console.log("Fetched clubs:", res.data);
        const match = res.data.find(
          (c) => c.name.toLowerCase() === decodedClubName.toLowerCase()
        );

        setClub(match);
        console.log(match);

        // Check if user owns a club (only if logged in)
        if (login_info.isLoggedIn) {
          try {
            const myClubRes = await challengeService.getMyClub();
            setUserClub(myClubRes);
            setIsClubOwner(true);
          } catch (err) {
            // User doesn't own a club
            setIsClubOwner(false);
          }
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching club:", err);
        setLoading(false);
      }
    };
    fetchClub();
  }, [decodedClubName, login_info.isLoggedIn]);

  useEffect(() => {
    const fetchClubPosts = async () => {
      try {
        if (club && club._id) {
          const res = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/clubs/${club._id}/posts`
          );
          setPosts(res.data.posts || []); // assuming backend sends { posts: [...] }
        }
      } catch (error) {
        console.error("Error fetching club posts:", error);
      }
    };
    fetchClubPosts();
  }, [club]);

  // Handle challenge club
  const handleChallengeClub = () => {
    if (!isClubOwner) {
      alert("You need to own a club to challenge other clubs!");
      return;
    }
    if (userClub && club._id === userClub._id) {
      alert("You cannot challenge your own club!");
      return;
    }
    setChallengeModalOpen(true);
  };

  // Helper function to check if URL is YouTube
  const isYouTubeUrl = (url) => {
    return url && (url.includes("youtube.com") || url.includes("youtu.be"));
  };

  // Helper function to convert YouTube URL to embed
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return "";

    if (url.includes("youtube.com/watch?v=")) {
      const videoId = url.split("v=")[1]?.split("&")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1]?.split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes("youtube.com/embed/")) {
      return url;
    }

    return url;
  };

  if (loading) return <div className="p-10">Loading...</div>;
  if (!club) return <div className="p-10 text-red-500">Club not found.</div>;

  const accentColor = isDarkMode ? "text-orange-500" : "text-blue-500";
  const sectionBg = isDarkMode ? "bg-white/5" : "bg-black/5";
  const cardBg = isDarkMode ? "bg-white/10" : "bg-black/10";

  return (
    <div
      className={`pt-28 px-6 md:px-12 lg:px-24 min-h-screen ${
        isDarkMode ? "text-white" : "text-black"
      }`}
    >
      {/* Back Button */}
      <div className="mb-6">
        <Link
          to="/club"
          className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            isDarkMode
              ? "bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white"
              : "bg-black/10 hover:bg-black/20 text-gray-700 hover:text-black"
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Clubs</span>
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
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
            <div className="space-y-1">
              <p className="text-sm text-gray-400 flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Founded in {club.foundedYear}
              </p>
              {club.location && (
                <p className="text-sm text-gray-400 flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {club.location.city}, {club.location.state},{" "}
                  {club.location.country}
                </p>
              )}
              <p className="text-sm text-gray-400">
                {club.followersCount} followers
              </p>
            </div>
          </div>
        </div>

        {/* Challenge Button - Only show for club owners */}
        {isClubOwner && userClub && club._id !== userClub._id && (
          <button
            onClick={handleChallengeClub}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02] ${
              isDarkMode
                ? "bg-orange-500/20 hover:bg-orange-500/30 backdrop-blur-sm border border-orange-500/30 hover:border-orange-500/50 text-orange-300 hover:text-orange-200"
                : "bg-blue-500/20 hover:bg-blue-500/30 backdrop-blur-sm border border-blue-500/30 hover:border-blue-500/50 text-blue-600 hover:text-blue-700"
            } flex items-center space-x-2 focus:outline-none`}
          >
            <Zap className="w-5 h-5" />
            <span>Challenge Club</span>
          </button>
        )}

        {/* Show "Your Club" indicator */}
        {isClubOwner && userClub && club._id === userClub._id && (
          <>
            <div className="flex  gap-3 mt-0">
              <div
                className={`px-1 py-1 sm:px-6 sm:py-3 rounded-xl ${
                  isDarkMode
                    ? "bg-green-500/20 border border-green-500/30 text-green-400"
                    : "bg-green-500/20 border border-green-500/30 text-green-600"
                } sm:font-medium flex items-center sm:space-x-2 backdrop-blur-sm`}
              >
                <Check className="w-5 h-5" />
                <span>Your Club</span>
              </div>
              <button
                onClick={() => setUploadModal(true)}
                className={
                  isDarkMode
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white px-5 py-3 rounded-2xl font-semibold shadow hover:from-orange-600 hover:to-red-600 transition-all"
                    : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-5 py-3 rounded-2xl font-semibold shadow hover:from-blue-600 hover:to-cyan-600 transition-all"
                }
              >
                Create Post
              </button>
              <button
                onClick={() => setEditProfileModalOpen(true)}
                className={
                  isDarkMode
                    ? "bg-gradient-to-r from-orange-400 to-yellow-400 text-white px-5 py-3 rounded-2xl font-semibold shadow hover:from-orange-500 hover:to-yellow-500 transition-all"
                    : "bg-gradient-to-r from-orange-500 to-yellow-300 text-white px-5 py-3 rounded-2xl font-semibold shadow hover:from-orange-600 hover:to-yellow-400 transition-all"
                }
              >
                Edit Profile
              </button>
              {/* Edit Club Profile Modal */}
              <EditClubProfileModal
                isOpen={editProfileModalOpen}
                onClose={() => setEditProfileModalOpen(false)}
                club={club}
                isDarkMode={isDarkMode}
                onSave={async (form) => {
                  if (!club || !club._id) return;
                  const formData = new FormData();
                  for (const key in form) {
                    if (
                      form[key] !== undefined &&
                      form[key] !== null &&
                      form[key] !== ""
                    ) {
                      if (key === "logo" && form.logo) {
                        formData.append("logo", form.logo);
                      } else {
                        formData.append(key, String(form[key]));
                      }
                    }
                  }
                  try {
                    const res = await axios.put(
                      `${import.meta.env.VITE_BACKEND_URL}/club-profile/edit/${club._id}`,
                      formData,
                      {
                        withCredentials: true,
                        headers: { "Content-Type": "multipart/form-data" },
                      }
                    );
                    alert(res.data?.message || "Profile updated!");
                    setClub(res.data.club);
                  } catch (err) {
                    console.error("Edit club error:", err?.response || err);
                    alert("Failed to update club profile.");
                  }
                }}
              />
            </div>
          </>
        )}
      </div>

      {/* Description */}
      <p className="text-lg mb-8">{club.description}</p>

      {/* Contact & Social Info */}
      <div className={`${sectionBg} p-6 rounded-xl mb-8`}>
        <h3 className={`text-xl font-semibold mb-4 ${accentColor}`}>
          Contact Information
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            {club.officialEmail && (
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4 text-gray-400" />
                <a
                  href={`mailto:${club.officialEmail}`}
                  className="hover:underline"
                >
                  {club.officialEmail}
                </a>
              </div>
            )}
            {club.contactNumber && (
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4 text-gray-400" />
                <a
                  href={`tel:${club.contactNumber}`}
                  className="hover:underline"
                >
                  {club.contactNumber}
                </a>
              </div>
            )}
            {club.website && (
              <div className="flex items-center space-x-2 text-sm">
                <Globe className="w-4 h-4 text-gray-400" />
                <a
                  href={club.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center"
                >
                  Visit Website <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            )}
          </div>

          {/* Social Links */}
          {club.socialLinks && (
            <div>
              <h4 className="font-medium mb-2">Follow Us</h4>
              <div className="flex space-x-3">
                {club.socialLinks.instagram && (
                  <a
                    href={club.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-500 hover:text-pink-400"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                )}
                {club.socialLinks.twitter && (
                  <a
                    href={club.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-500 hover:text-sky-400"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
                {club.socialLinks.youtube && (
                  <a
                    href={club.socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-500 hover:text-red-400"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Performance Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className={`${cardBg} p-4 rounded-xl text-center`}>
          <Trophy className={`${accentColor} mx-auto mb-2`} />
          <p className="text-xl font-bold">
            {club.performance?.totalMatches || 0}
          </p>
          <p className="text-xs text-gray-400">Total Matches</p>
        </div>
        <div className={`${cardBg} p-4 rounded-xl text-center`}>
          <div className="w-6 h-6 bg-green-500 rounded-full mx-auto mb-2"></div>
          <p className="text-xl font-bold">{club.performance?.wins || 0}</p>
          <p className="text-xs text-gray-400">Wins</p>
        </div>
        <div className={`${cardBg} p-4 rounded-xl text-center`}>
          <div className="w-6 h-6 bg-yellow-500 rounded-full mx-auto mb-2"></div>
          <p className="text-xl font-bold">{club.performance?.draws || 0}</p>
          <p className="text-xs text-gray-400">Draws</p>
        </div>
        <div className={`${cardBg} p-4 rounded-xl text-center`}>
          <div className="w-6 h-6 bg-red-500 rounded-full mx-auto mb-2"></div>
          <p className="text-xl font-bold">{club.performance?.losses || 0}</p>
          <p className="text-xs text-gray-400">Losses</p>
        </div>
        <div className={`${cardBg} p-4 rounded-xl text-center`}>
          <Star className={`${accentColor} mx-auto mb-2`} />
          <p className="text-xl font-bold">{club.performance?.points || 0}</p>
          <p className="text-xs text-gray-400">Points</p>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className={`${sectionBg} p-4 rounded-xl text-center`}>
          <Users className={`${accentColor} mx-auto mb-2`} />
          <p className="text-xl font-bold">{club.players?.length || 0}</p>
          <p className="text-sm text-gray-400">Players</p>
        </div>
        <div className={`${sectionBg} p-4 rounded-xl text-center`}>
          <Video className={`${accentColor} mx-auto mb-2`} />
          <p className="text-xl font-bold">{club.vlogs?.length || 0}</p>
          <p className="text-sm text-gray-400">Vlogs</p>
        </div>
        <div className={`${sectionBg} p-4 rounded-xl text-center`}>
          <Award className={`${accentColor} mx-auto mb-2`} />
          <p className="text-xl font-bold">{club.achievements?.length || 0}</p>
          <p className="text-sm text-gray-400">Achievements</p>
        </div>
      </div>

      {/* Achievements */}
      {club.achievements?.length > 0 && (
        <div className="mb-10">
          <h2
            className={`text-2xl font-semibold mb-4 ${accentColor} flex items-center`}
          >
            <Award className="w-6 h-6 mr-2" />
            Achievements
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {club.achievements.map((achievement, index) => (
              <div key={index} className={`${cardBg} p-4 rounded-xl`}>
                <div className="flex items-center space-x-3">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm">{achievement}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sports */}
      {club.sports?.length > 0 && (
        <div className="mb-10">
          <h2 className={`text-2xl font-semibold mb-4 ${accentColor}`}>
            Sports
          </h2>
          <div className="flex flex-wrap gap-3">
            {club.sports.map((sport, index) => (
              <span
                key={index}
                className={`${cardBg} px-4 py-2 rounded-full text-sm`}
              >
                {sport}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Club Posts */}
      {posts && posts.length > 0 && (
        <div className="mb-10">
          <h2
            className={`text-2xl font-semibold mb-4 ${accentColor} flex items-center`}
          >
            <Newspaper className="w-6 h-6 mr-2" />
            Club Posts
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {posts.map((post, index) => (
              <div key={index} className={`${cardBg} p-4 rounded-xl shadow`}>
                <div className="mb-2 text-lg font-semibold flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-blue-500" />
                  {post?.title || "Untitled Post"}
                </div>
                <p className="text-sm text-gray-300 mb-2">
                  {post?.text || "No content available."}
                </p>
                <p className="text-xs text-right text-gray-400">
                  {post?.createdAt
                    ? new Date(post.createdAt).toLocaleDateString()
                    : "No date"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Players */}
      {club.players?.length > 0 && (
        <div className="mb-10">
          <h2
            className={`text-2xl font-semibold mb-4 ${accentColor} flex items-center`}
          >
            <Users className="w-6 h-6 mr-2" />
            Players ({club.players.length})
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {club.players.map((player, idx) => (
              <div key={idx} className={`${cardBg} p-4 rounded-xl`}>
                <p className="font-medium">{player.name || "Unnamed Player"}</p>
                {player.position && (
                  <p className="text-sm text-gray-400">{player.position}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Vlogs Section */}
      {club.vlogs?.length > 0 && (
        <div className="mb-12">
          <h2
            className={`text-2xl font-semibold mb-4 ${accentColor} flex items-center`}
          >
            <Video className="w-6 h-6 mr-2" />
            Vlogs ({club.vlogs.length})
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {club.vlogs.map((vlogUrl, idx) => (
              <div
                key={idx}
                className={`${sectionBg} p-4 rounded-xl shadow-md`}
              >
                <div className="aspect-video mb-3">
                  {isYouTubeUrl(vlogUrl) ? (
                    <iframe
                      src={getYouTubeEmbedUrl(vlogUrl)}
                      title={`Vlog ${idx + 1}`}
                      className="w-full h-full rounded-lg"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      controls
                      className="w-full h-full rounded-lg object-cover"
                      src={vlogUrl}
                    >
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
                <p className="font-medium text-sm">Vlog {idx + 1}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reels Section */}
      {club.reels?.length > 0 && (
        <div className="mb-12">
          <h2
            className={`text-2xl font-semibold mb-4 ${accentColor} flex items-center`}
          >
            <Play className="w-6 h-6 mr-2" />
            Reels ({club.reels.length})
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {club.reels.map((reelUrl, idx) => (
              <div
                key={idx}
                className={`${sectionBg} p-4 rounded-xl shadow-md`}
              >
                <div className="aspect-[9/16] mb-3">
                  {isYouTubeUrl(reelUrl) ? (
                    <iframe
                      src={getYouTubeEmbedUrl(reelUrl)}
                      title={`Reel ${idx + 1}`}
                      className="w-full h-full rounded-lg"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      controls
                      className="w-full h-full rounded-lg object-cover"
                      src={reelUrl}
                    >
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
                <p className="font-medium text-sm">Reel {idx + 1}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Challenge Modal */}
      <ChallengeModal
        isOpen={challengeModalOpen}
        onClose={() => setChallengeModalOpen(false)}
        targetClub={club}
        isDarkMode={isDarkMode}
      />
      <ClubUploadModal
        isOpen={uploadModal}
        onClose={() => setUploadModal(false)}
        club={club}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default ClubDetails;
