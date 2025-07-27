import React, { useState, useEffect } from 'react';
import { Search, MapPin, Filter, Calendar, Users, Star, Clock, ChevronDown, X, ArrowLeft, Upload, Check } from 'lucide-react';
import axios from 'axios';
import Loader from "../helper/Loader";
const Club = () => {
    const [clubData, setClubData] = useState([]);
    const [loading,setLoading]=useState(true);
    const [joinFormData, setJoinFormData] = useState({
        age: '',
        skills: '',
        experience: 'Beginner',
        achievements: '',
        certificate: null,
        isPaid: false
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    useEffect(()=>{
        const fetch_data=async()=>{
            try{
                const res=await axios.get("http://localhost:3000/clubs",{withCredentials:true});
                if(res.status==200){
                    setClubData(res.data);
                    console.log(res.data)
                    setLoading(false);
                }
            }catch(err){
                console.error("Error fetching club data:", err);
            }
        }
        fetch_data()
    },[])
    if(loading) return <Loader />
    return(
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center text-orange-400 mb-10">Our Clubs</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {clubs.map((club) => (
          <motion.div
            key={club.id}
            className="bg-gray-800 rounded-2xl shadow-lg border border-orange-500 p-6 transition-transform transform hover:scale-105 hover:shadow-orange-400"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h2 className="text-2xl font-bold text-orange-400 mb-2">{club.name}</h2>
            <p className="text-sm text-gray-300 mb-4">{club.description}</p>
            <div className="text-sm space-y-1">
              <p><span className="text-orange-300">President:</span> {club.president}</p>
              <p><span className="text-orange-300">Meeting Time:</span> {club.meetingTime}</p>
              <p><span className="text-orange-300">Location:</span> {club.location}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>

    );
}
export default Club;