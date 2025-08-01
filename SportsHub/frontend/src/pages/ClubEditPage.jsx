import React, { useState, useEffect } from "react";
import axios from "axios";

const ClubEditPage = ({ clubId }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    officialEmail: "",
    contactNumber: "",
    website: "",
    foundedYear: "",
    sports: [],
    achievements: [],
    location: {
      city: "",
      state: "",
      country: "India"
    },
    socialLinks: {
      instagram: "",
      twitter: "",
      youtube: "",
      email: ""
    },
    performance: {
      totalMatches: 0,
      wins: 0,
      losses: 0,
      draws: 0,
      points: 0
    }
  });

  const [logoFile, setLogoFile] = useState(null);

  useEffect(() => {
    // Fetch club data
    const fetchClub = async () => {
      try {
        const { data } = await axios.get(`/api/clubs/${clubId}`);
        setFormData(prev => ({
          ...prev,
          ...data,
          location: data.location || prev.location,
          socialLinks: data.socialLinks || prev.socialLinks,
          performance: data.performance || prev.performance
        }));
      } catch (err) {
        console.error("Failed to load club details", err);
      }
    };

    fetchClub();
  }, [clubId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("location.")) {
      const key = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        location: {
          ...prev.location,
          [key]: value
        }
      }));
    } else if (name.startsWith("socialLinks.")) {
      const key = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [key]: value
        }
      }));
    } else if (name.startsWith("performance.")) {
      const key = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        performance: {
          ...prev.performance,
          [key]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleLogoChange = (e) => {
    setLogoFile(e.target.files[0]);
  };

  const handleArrayChange = (e, field) => {
    const values = e.target.value.split(",").map(v => v.trim());
    setFormData(prev => ({ ...prev, [field]: values }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    if (logoFile) form.append("logo", logoFile);

    Object.entries(formData).forEach(([key, value]) => {
      if (typeof value === "object" && !Array.isArray(value)) {
        form.append(key, JSON.stringify(value));
      } else if (Array.isArray(value)) {
        form.append(key, JSON.stringify(value));
      } else {
        form.append(key, value);
      }
    });

    try {
      await axios.put(`/api/club-profile/edit/${clubId}`, form, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      alert("Club details updated successfully!");
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update club");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Club Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Club Name" className="input" />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="input" />

        <input type="text" name="officialEmail" value={formData.officialEmail} onChange={handleChange} placeholder="Official Email" className="input" />
        <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} placeholder="Contact Number" className="input" />
        <input type="text" name="website" value={formData.website} onChange={handleChange} placeholder="Website" className="input" />
        <input type="number" name="foundedYear" value={formData.foundedYear || ""} onChange={handleChange} placeholder="Founded Year" className="input" />

        <input type="text" value={formData.sports.join(", ")} onChange={(e) => handleArrayChange(e, "sports")} placeholder="Sports (comma separated)" className="input" />
        <input type="text" value={formData.achievements.join(", ")} onChange={(e) => handleArrayChange(e, "achievements")} placeholder="Achievements (comma separated)" className="input" />

        {/* Location */}
        <input type="text" name="location.city" value={formData.location.city} onChange={handleChange} placeholder="City" className="input" />
        <input type="text" name="location.state" value={formData.location.state} onChange={handleChange} placeholder="State" className="input" />
        <input type="text" name="location.country" value={formData.location.country} onChange={handleChange} placeholder="Country" className="input" />

        {/* Social Links */}
        <input type="text" name="socialLinks.instagram" value={formData.socialLinks.instagram} onChange={handleChange} placeholder="Instagram" className="input" />
        <input type="text" name="socialLinks.twitter" value={formData.socialLinks.twitter} onChange={handleChange} placeholder="Twitter" className="input" />
        <input type="text" name="socialLinks.youtube" value={formData.socialLinks.youtube} onChange={handleChange} placeholder="YouTube" className="input" />
        <input type="text" name="socialLinks.email" value={formData.socialLinks.email} onChange={handleChange} placeholder="Social Email" className="input" />

        {/* Performance Stats */}
        <input type="number" name="performance.totalMatches" value={formData.performance.totalMatches} onChange={handleChange} placeholder="Total Matches" className="input" />
        <input type="number" name="performance.wins" value={formData.performance.wins} onChange={handleChange} placeholder="Wins" className="input" />
        <input type="number" name="performance.losses" value={formData.performance.losses} onChange={handleChange} placeholder="Losses" className="input" />
        <input type="number" name="performance.draws" value={formData.performance.draws} onChange={handleChange} placeholder="Draws" className="input" />
        <input type="number" name="performance.points" value={formData.performance.points} onChange={handleChange} placeholder="Points" className="input" />

        {/* Logo */}
        <div>
          <label>Upload Logo</label>
          <input type="file" accept="image/*" onChange={handleLogoChange} />
        </div>

        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ClubEditPage;
