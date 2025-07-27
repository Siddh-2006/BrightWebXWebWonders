import React, { useState, useEffect } from 'react';
import { Search, MapPin, Filter, Calendar, Users, Star, Clock, ChevronDown, X, ArrowLeft, Upload, Check } from 'lucide-react';

const SportifyClubSearch = () => {
    const [selectedCity, setSelectedCity] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSport, setSelectedSport] = useState('');
    const [showLocationModal, setShowLocationModal] = useState(true);
    const [isLocationAvailable, setIsLocationAvailable] = useState(false);
    const [userLocation, setUserLocation] = useState('');
    const [displayedClubs, setDisplayedClubs] = useState(6);
    const [isLoading, setIsLoading] = useState(false);
    const [showJoinModal, setShowJoinModal] = useState(false);
    const [selectedClub, setSelectedClub] = useState(null);
    const [joinFormData, setJoinFormData] = useState({
        age: '',
        skills: '',
        experience: 'Beginner',
        achievements: '',
        certificate: null,
        isPaid: false
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Available cities with club data
    const availableCities = [
        'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata',
        'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow'
    ];

    // Sports categories
    const sportsCategories = [
        'All Sports', 'Cricket', 'Football', 'Basketball', 'Tennis',
        'Badminton', 'Volleyball', 'Gym & Fitness', 'Table Tennis', 'Squash'
    ];

    // Mock club data for Indian cities
    const clubsData = {
        Mumbai: [
            // Cricket Clubs
            { id: 1, name: 'Oval Maidan Cricket Club', sport: 'Cricket', rating: 4.8, price: '₹2500/hour', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=300&fit=crop', amenities: ['Pavilion', 'Parking', 'Cafeteria', 'Scoreboard'] },
            { id: 2, name: 'Cross Maidan Sports Club', sport: 'Cricket', rating: 4.6, price: '₹2200/hour', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop', amenities: ['Turf Pitch', 'Floodlights', 'Changing Room'] },
            { id: 3, name: 'Shivaji Park Cricket Ground', sport: 'Cricket', rating: 4.9, price: '₹3000/hour', image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=300&fit=crop', amenities: ['Historic Ground', 'Parking', 'Museum'] },
            { id: 4, name: 'Dadkar Maidan Cricket Club', sport: 'Cricket', rating: 4.4, price: '₹1800/hour', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop', amenities: ['Open Ground', 'Basic Facilities'] },
            { id: 5, name: 'Marine Drive Cricket Arena', sport: 'Cricket', rating: 4.7, price: '₹2800/hour', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop', amenities: ['Sea View', 'Premium Facilities', 'Parking'] },

            // Football Clubs
            { id: 6, name: 'Cooperage Football Ground', sport: 'Football', rating: 4.5, price: '₹2000/hour', image: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=400&h=300&fit=crop', amenities: ['Natural Grass', 'Floodlights', 'Stands'] },
            { id: 7, name: 'Mumbai Football Arena', sport: 'Football', rating: 4.8, price: '₹2500/hour', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop', amenities: ['Artificial Turf', 'AC Rooms', 'Parking'] },
            { id: 8, name: 'Neville D\'Souza Ground', sport: 'Football', rating: 4.3, price: '₹1500/hour', image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=400&h=300&fit=crop', amenities: ['Community Ground', 'Basic Facilities'] },
            { id: 9, name: 'Mahim Football Club', sport: 'Football', rating: 4.6, price: '₹1800/hour', image: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=400&h=300&fit=crop', amenities: ['Local Club', 'Parking', 'Refreshments'] },

            // Basketball Clubs
            { id: 10, name: 'Phoenix Basketball Arena', sport: 'Basketball', rating: 4.6, price: '₹1500/hour', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop', amenities: ['Indoor Court', 'AC', 'Parking', 'Equipment'] },
            { id: 11, name: 'Bandra Basketball Club', sport: 'Basketball', rating: 4.4, price: '₹1200/hour', image: 'https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=400&h=300&fit=crop', amenities: ['Outdoor Court', 'Floodlights', 'Parking'] },
            { id: 12, name: 'Andheri Sports Complex', sport: 'Basketball', rating: 4.7, price: '₹1800/hour', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop', amenities: ['Multi-Court', 'Lockers', 'Cafeteria'] },

            // Tennis Clubs
            { id: 13, name: 'Khar Gymkhana Tennis', sport: 'Tennis', rating: 4.8, price: '₹1400/hour', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop', amenities: ['Clay Courts', 'Coaching', 'Club House'] },
            { id: 14, name: 'Willingdon Club Tennis', sport: 'Tennis', rating: 4.9, price: '₹2000/hour', image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400&h=300&fit=crop', amenities: ['Premium Club', 'Multiple Courts', 'Restaurant'] },
            { id: 15, name: 'Juhu Tennis Academy', sport: 'Tennis', rating: 4.5, price: '₹1200/hour', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop', amenities: ['Academy', 'Coaching', 'Equipment'] },

            // Swimming Clubs
            { id: 16, name: 'Aqua Swimming Complex', sport: 'Swimming', rating: 4.9, price: '₹800/hour', image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=300&fit=crop', amenities: ['Olympic Pool', 'Lockers', 'Towels', 'Coaching'] },
            { id: 17, name: 'Breach Candy Club Pool', sport: 'Swimming', rating: 4.8, price: '₹1500/hour', image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400&h=300&fit=crop', amenities: ['Sea-facing Pool', 'Premium Club', 'Restaurant'] },
            { id: 18, name: 'YMCA Swimming Pool', sport: 'Swimming', rating: 4.3, price: '₹600/hour', image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=300&fit=crop', amenities: ['Community Pool', 'Changing Rooms', 'Basic Facilities'] },

            // Badminton Clubs
            { id: 19, name: 'Goregaon Sports Club', sport: 'Badminton', rating: 4.6, price: '₹700/hour', image: 'https://images.unsplash.com/photo-1594736797933-d0dfdb4b2fa8?w=400&h=300&fit=crop', amenities: ['Multiple Courts', 'AC', 'Parking', 'Equipment'] },
            { id: 20, name: 'Malad Badminton Academy', sport: 'Badminton', rating: 4.4, price: '₹600/hour', image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&h=300&fit=crop', amenities: ['Professional Courts', 'Coaching', 'Equipment'] },

            // Gym & Fitness
            { id: 21, name: 'Gold\'s Gym Bandra', sport: 'Gym & Fitness', rating: 4.5, price: '₹500/hour', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop', amenities: ['Modern Equipment', 'Trainers', 'AC', 'Supplements'] },
            { id: 22, name: 'Fitness First Powai', sport: 'Gym & Fitness', rating: 4.6, price: '₹600/hour', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop', amenities: ['Premium Equipment', 'Personal Training', 'Spa'] }
        ],

        Delhi: [
            // Cricket Clubs
            { id: 23, name: 'Feroz Shah Kotla Cricket Club', sport: 'Cricket', rating: 4.9, price: '₹3500/hour', image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=300&fit=crop', amenities: ['International Stadium', 'Museum', 'VIP Boxes'] },
            { id: 24, name: 'Delhi Gymkhana Cricket', sport: 'Cricket', rating: 4.7, price: '₹2500/hour', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=300&fit=crop', amenities: ['Heritage Club', 'Pavilion', 'Restaurant'] },
            { id: 25, name: 'Roshanara Club Cricket', sport: 'Cricket', rating: 4.6, price: '₹2000/hour', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop', amenities: ['Historic Ground', 'Club House', 'Parking'] },
            { id: 26, name: 'Yamuna Sports Complex', sport: 'Cricket', rating: 4.4, price: '₹1800/hour', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop', amenities: ['River View', 'Floodlights', 'Cafeteria'] },
            { id: 27, name: 'Karnail Singh Stadium', sport: 'Cricket', rating: 4.5, price: '₹1600/hour', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=300&fit=crop', amenities: ['Stadium Facilities', 'Parking', 'Scoreboard'] },

            // Football Clubs
            { id: 28, name: 'JLN Stadium Football', sport: 'Football', rating: 4.8, price: '₹2800/hour', image: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=400&h=300&fit=crop', amenities: ['International Stadium', 'Synthetic Turf', 'Stands'] },
            { id: 29, name: 'Thyagaraj Stadium Football', sport: 'Football', rating: 4.6, price: '₹2200/hour', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop', amenities: ['Professional Ground', 'Floodlights', 'Parking'] },
            { id: 30, name: 'Ambedkar Stadium Football', sport: 'Football', rating: 4.7, price: '₹2500/hour', image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=400&h=300&fit=crop', amenities: ['Stadium', 'Natural Grass', 'Seating'] },

            // Tennis Clubs
            { id: 31, name: 'Delhi Lawn Tennis Association', sport: 'Tennis', rating: 4.9, price: '₹1800/hour', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop', amenities: ['Championship Courts', 'Coaching', 'Pro Shop'] },
            { id: 32, name: 'RK Khanna Tennis Complex', sport: 'Tennis', rating: 4.8, price: '₹1600/hour', image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400&h=300&fit=crop', amenities: ['Multiple Courts', 'Tournament Venue', 'Restaurant'] },
            { id: 33, name: 'Delhi Club Tennis', sport: 'Tennis', rating: 4.7, price: '₹1400/hour', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop', amenities: ['Heritage Club', 'Clay Courts', 'Club House'] },

            // Swimming Clubs
            { id: 34, name: 'Siri Fort Sports Complex Pool', sport: 'Swimming', rating: 4.8, price: '₹900/hour', image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=300&fit=crop', amenities: ['Olympic Pool', 'Diving Pool', 'Coaching'] },
            { id: 35, name: 'Delhi Swimming Club', sport: 'Swimming', rating: 4.6, price: '₹800/hour', image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400&h=300&fit=crop', amenities: ['Premium Club', 'Multiple Pools', 'Spa'] },

            // Basketball & Others
            { id: 36, name: 'Netaji Subhas Basketball', sport: 'Basketball', rating: 4.5, price: '₹1400/hour', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop', amenities: ['Indoor Court', 'AC', 'Spectator Seating'] },
            { id: 37, name: 'Delhi University Sports Complex', sport: 'Basketball', rating: 4.4, price: '₹1200/hour', image: 'https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=400&h=300&fit=crop', amenities: ['University Facilities', 'Multiple Courts', 'Parking'] },
            { id: 38, name: 'Talkatora Badminton Hall', sport: 'Badminton', rating: 4.7, price: '₹800/hour', image: 'https://images.unsplash.com/photo-1594736797933-d0dfdb4b2fa8?w=400&h=300&fit=crop', amenities: ['Championship Hall', 'AC', 'Professional Courts'] },
            { id: 39, name: 'Fitness First Connaught Place', sport: 'Gym & Fitness', rating: 4.6, price: '₹700/hour', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop', amenities: ['Premium Location', 'Latest Equipment', 'Personal Training'] }
        ],

        Bangalore: [
            // Cricket Clubs
            { id: 40, name: 'M. Chinnaswamy Stadium', sport: 'Cricket', rating: 4.9, price: '₹4000/hour', image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=300&fit=crop', amenities: ['International Stadium', 'Museum', 'Corporate Boxes'] },
            { id: 41, name: 'Karnataka State Cricket Association', sport: 'Cricket', rating: 4.7, price: '₹2500/hour', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=300&fit=crop', amenities: ['Professional Ground', 'Pavilion', 'Training Facilities'] },
            { id: 42, name: 'Bangalore Club Cricket', sport: 'Cricket', rating: 4.8, price: '₹2200/hour', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop', amenities: ['Heritage Club', 'Manicured Ground', 'Club House'] },
            { id: 43, name: 'Electronics City Cricket Club', sport: 'Cricket', rating: 4.4, price: '₹1800/hour', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop', amenities: ['Corporate Ground', 'Floodlights', 'Parking'] },
            { id: 44, name: 'Whitefield Cricket Arena', sport: 'Cricket', rating: 4.5, price: '₹2000/hour', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=300&fit=crop', amenities: ['IT Hub Location', 'Modern Facilities', 'Cafeteria'] },

            // Football Clubs
            { id: 45, name: 'Kanteerava Stadium Football', sport: 'Football', rating: 4.8, price: '₹2600/hour', image: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=400&h=300&fit=crop', amenities: ['International Stadium', 'Athletic Track', 'Stands'] },
            { id: 46, name: 'Garden City Football Club', sport: 'Football', rating: 4.6, price: '₹2200/hour', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop', amenities: ['Premium Turf', 'Floodlights', 'Changing Rooms'] },
            { id: 47, name: 'Koramangala Football Ground', sport: 'Football', rating: 4.4, price: '₹1800/hour', image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=400&h=300&fit=crop', amenities: ['Community Ground', 'Artificial Turf', 'Parking'] },
            { id: 48, name: 'HSR Layout Football Arena', sport: 'Football', rating: 4.5, price: '₹2000/hour', image: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=400&h=300&fit=crop', amenities: ['Modern Facility', 'Synthetic Turf', 'Spectator Area'] },

            // Badminton Clubs
            { id: 49, name: 'Prakash Padukone Badminton Academy', sport: 'Badminton', rating: 4.9, price: '₹1000/hour', image: 'https://images.unsplash.com/photo-1594736797933-d0dfdb4b2fa8?w=400&h=300&fit=crop', amenities: ['World-class Academy', 'Professional Coaching', 'Multiple Courts'] },
            { id: 50, name: 'Indiranagar Badminton Club', sport: 'Badminton', rating: 4.6, price: '₹700/hour', image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&h=300&fit=crop', amenities: ['AC Courts', 'Equipment', 'Parking'] },
            { id: 51, name: 'Jayanagar Badminton Hall', sport: 'Badminton', rating: 4.4, price: '₹600/hour', image: 'https://images.unsplash.com/photo-1594736797933-d0dfdb4b2fa8?w=400&h=300&fit=crop', amenities: ['Community Hall', 'Multiple Courts', 'Basic Facilities'] },

            // Tennis Clubs
            { id: 52, name: 'Karnataka State Lawn Tennis Association', sport: 'Tennis', rating: 4.8, price: '₹1500/hour', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop', amenities: ['Championship Courts', 'Coaching Academy', 'Pro Shop'] },
            { id: 53, name: 'Bangalore Club Tennis', sport: 'Tennis', rating: 4.7, price: '₹1300/hour', image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400&h=300&fit=crop', amenities: ['Heritage Courts', 'Club House', 'Restaurant'] },
            { id: 54, name: 'Malleshwaram Tennis Club', sport: 'Tennis', rating: 4.5, price: '₹1100/hour', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop', amenities: ['Local Club', 'Coaching', 'Equipment Rental'] },

            // Swimming & Others
            { id: 55, name: 'Aquatic Complex Swimming', sport: 'Swimming', rating: 4.8, price: '₹900/hour', image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=300&fit=crop', amenities: ['Olympic Pool', 'Diving Pool', 'Swimming Academy'] },
            { id: 56, name: 'Cubbon Park Swimming Pool', sport: 'Swimming', rating: 4.5, price: '₹700/hour', image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400&h=300&fit=crop', amenities: ['Public Pool', 'Coaching', 'Lockers'] },
            { id: 57, name: 'Silicon Valley Basketball', sport: 'Basketball', rating: 4.6, price: '₹1500/hour', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop', amenities: ['Indoor Court', 'AC', 'Corporate Bookings'] },
            { id: 58, name: 'Cult Fitness Koramangala', sport: 'Gym & Fitness', rating: 4.7, price: '₹600/hour', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop', amenities: ['Boutique Fitness', 'Group Classes', 'Personal Training'] }
        ],

        Chennai: [
            // Cricket Clubs
            { id: 59, name: 'MA Chidambaram Stadium', sport: 'Cricket', rating: 4.9, price: '₹3800/hour', image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=300&fit=crop', amenities: ['International Stadium', 'Historic Venue', 'Museum'] },
            { id: 60, name: 'Madras Cricket Club', sport: 'Cricket', rating: 4.8, price: '₹2800/hour', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=300&fit=crop', amenities: ['Heritage Club', 'Premium Facilities', 'Club House'] },
            { id: 61, name: 'Tamil Nadu Cricket Association', sport: 'Cricket', rating: 4.7, price: '₹2200/hour', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop', amenities: ['State Ground', 'Training Facilities', 'Pavilion'] },
            { id: 62, name: 'Marina Beach Cricket Club', sport: 'Cricket', rating: 4.5, price: '₹1800/hour', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop', amenities: ['Beach View', 'Open Ground', 'Parking'] },
            { id: 63, name: 'Guindy Cricket Ground', sport: 'Cricket', rating: 4.4, price: '₹1600/hour', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=300&fit=crop', amenities: ['Local Ground', 'Floodlights', 'Basic Facilities'] },

            // Tennis Clubs
            { id: 64, name: 'SDAT Tennis Academy', sport: 'Tennis', rating: 4.8, price: '₹1400/hour', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop', amenities: ['State Academy', 'Professional Coaching', 'Multiple Courts'] },
            { id: 65, name: 'Madras Gymkhana Tennis', sport: 'Tennis', rating: 4.7, price: '₹1200/hour', image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400&h=300&fit=crop', amenities: ['Heritage Club', 'Clay Courts', 'Restaurant'] },
            { id: 66, name: 'Express Tennis Club', sport: 'Tennis', rating: 4.6, price: '₹1000/hour', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop', amenities: ['Modern Facility', 'Coaching', 'Equipment'] },
            { id: 67, name: 'Nungambakkam Tennis Club', sport: 'Tennis', rating: 4.5, price: '₹900/hour', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop', amenities: ['Local Club', 'Hard Courts', 'Parking'] },

            // Swimming Clubs
            { id: 68, name: 'Aquatic Complex Velachery', sport: 'Swimming', rating: 4.8, price: '₹800/hour', image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=300&fit=crop', amenities: ['Olympic Pool', 'Coaching', 'Diving Pool'] },
            { id: 69, name: 'Splash Swimming Complex', sport: 'Swimming', rating: 4.6, price: '₹700/hour', image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400&h=300&fit=crop', amenities: ['Family Pool', 'Kids Pool', 'Lockers'] },
            { id: 70, name: 'Anna University Pool', sport: 'Swimming', rating: 4.4, price: '₹600/hour', image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=300&fit=crop', amenities: ['University Pool', 'Student Rates', 'Basic Facilities'] },

            // Football & Others
            { id: 71, name: 'Nehru Stadium Football', sport: 'Football', rating: 4.7, price: '₹2400/hour', image: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=400&h=300&fit=crop', amenities: ['Stadium', 'Athletic Track', 'Stands'] },
            { id: 72, name: 'Corporation Stadium Football', sport: 'Football', rating: 4.5, price: '₹2000/hour', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop', amenities: ['Public Stadium', 'Natural Grass', 'Floodlights'] },
            { id: 73, name: 'Adyar Basketball Club', sport: 'Basketball', rating: 4.6, price: '₹1300/hour', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop', amenities: ['Indoor Court', 'AC', 'Spectator Seating'] },
            { id: 74, name: 'Pallikaranai Badminton Hall', sport: 'Badminton', rating: 4.5, price: '₹650/hour', image: 'https://images.unsplash.com/photo-1594736797933-d0dfdb4b2fa8?w=400&h=300&fit=crop', amenities: ['Multiple Courts', 'AC', 'Equipment'] }],
        Kolkata: [{ id: 75, name: 'Jhargram Firebolts Cricket Club', sport: 'Cricket', rating: 4.3, price: '₹800/hour', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=300&fit=crop', amenities: ['Turf Pitch', 'Practice Nets', 'Floodlights'] },
        { id: 76, name: 'Purba Medinipur Dragons Cricket Academy', sport: 'Cricket', rating: 4.1, price: '₹700/hour', image: 'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=400&h=300&fit=crop', amenities: ['Indoor Nets', 'Coaching', 'Changing Rooms'] },
        { id: 77, name: 'Kalimpong Falcons Cricket Ground', sport: 'Cricket', rating: 4.0, price: '₹600/hour', image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=300&fit=crop', amenities: ['Grass Pitch', 'Scorer', 'Seating'] },

        // Football
        { id: 78, name: 'Mohun Bagan SG Training Ground', sport: 'Football', rating: 4.7, price: '₹1,200/hour', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop', amenities: ['Full-Sized Pitch', 'Floodlights', 'Dugouts'] },
        { id: 79, name: 'East Bengal FC Academy', sport: 'Football', rating: 4.5, price: '₹1,000/hour', image: 'https://images.unsplash.com/photo-1543357480-c60d400e2ef9?w=400&h=300&fit=crop', amenities: ['Grass Turf', 'Training Equipment', 'Lockers'] },
        { id: 80, name: 'United Kolkata SC Football Arena', sport: 'Football', rating: 4.2, price: '₹900/hour', image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=400&h=300&fit=crop', amenities: ['Synthetic Turf', 'Goal Posts', 'Water Dispenser'] },

        // Basketball
        { id: 81, name: 'Salt Lake Basketball Complex', sport: 'Basketball', rating: 4.4, price: '₹500/hour', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop', amenities: ['Indoor Court', 'Scoreboard', 'Basketballs'] },
        { id: 82, name: 'Kolkata Hoops Academy', sport: 'Basketball', rating: 4.0, price: '₹400/hour', image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=400&h=300&fit=crop', amenities: ['Coaching', 'Shooting Machines', 'Seating'] },
        { id: 83, name: 'Behala Basketball Court', sport: 'Basketball', rating: 3.8, price: '₹300/hour', image: 'https://images.unsplash.com/photo-1600181516267-dbd3326071ff?w=400&h=300&fit=crop', amenities: ['Outdoor Court', 'Floodlights', 'Benches'] },

        // Tennis
        { id: 84, name: 'South Club Tennis Academy', sport: 'Tennis', rating: 4.6, price: '₹1,000/hour', image: 'https://images.unsplash.com/photo-1544298621-a28c00544413?w=400&h=300&fit=crop', amenities: ['Clay Courts', 'Ball Machines', 'Coaching'] },
        { id: 85, name: 'Tollygunge Tennis Club', sport: 'Tennis', rating: 4.3, price: '₹850/hour', image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=300&fit=crop', amenities: ['Hard Courts', 'Floodlights', 'Locker Rooms'] },
        { id: 86, name: 'Rashbehari Tennis Center', sport: 'Tennis', rating: 4.0, price: '₹700/hour', image: 'https://images.unsplash.com/photo-1577623425736-6fa4e0726d5b?w=400&h=300&fit=crop', amenities: ['Synthetic Grass', 'Umpire Chair', 'Showers'] },

        // Badminton
        { id: 87, name: 'Pallikaranai Badminton Hall', sport: 'Badminton', rating: 4.5, price: '₹650/hour', image: 'https://images.unsplash.com/photo-1594736797933-d0dfdb4b2fa8?w=400&h=300&fit=crop', amenities: ['Multiple Courts', 'AC', 'Equipment'] },
        { id: 88, name: 'Badminton Association of India (BAI)', sport: 'Badminton', rating: 4.7, price: '₹750/hour', image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=400&h=300&fit=crop', amenities: ['Olympic Standard Courts', 'Coaching', 'Gym'] },
        { id: 89, name: 'Salt Lake Badminton Club', sport: 'Badminton', rating: 4.2, price: '₹550/hour', image: 'https://images.unsplash.com/photo-1518604666860-9ed391f76460?w=400&h=300&fit=crop', amenities: ['Wooden Floor', 'Shuttle Service', 'Cafeteria'] },

        // Volleyball
        { id: 90, name: 'Netaji Subhas Volleyball Academy', sport: 'Volleyball', rating: 4.1, price: '₹500/hour', image: 'https://images.unsplash.com/photo-1606979123456-5f8d7f1b8a5d?w=400&h=300&fit=crop', amenities: ['Sand Court', 'Professional Nets', 'Referee'] },
        { id: 91, name: 'Kolkata Beach Volleyball Arena', sport: 'Volleyball', rating: 3.9, price: '₹400/hour', image: 'https://images.unsplash.com/photo-1600181516267-dbd3326071ff?w=400&h=300&fit=crop', amenities: ['Outdoor Court', 'Floodlights', 'Seating'] },
        { id: 92, name: 'Barasat Volleyball Club', sport: 'Volleyball', rating: 3.7, price: '₹350/hour', image: 'https://images.unsplash.com/photo-1600181516267-dbd3326071ff?w=400&h=300&fit=crop', amenities: ['Indoor Court', 'Ball Service', 'Changing Rooms'] },

        // Gym & Fitness
        { id: 93, name: 'Gold’s Gym Kolkata', sport: 'Gym & Fitness', rating: 4.8, price: '₹1,500/month', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop', amenities: ['Cardio Machines', 'Weight Training', 'Personal Trainers'] },
        { id: 94, name: 'Anytime Fitness Salt Lake', sport: 'Gym & Fitness', rating: 4.5, price: '₹1,200/month', image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=400&h=300&fit=crop', amenities: ['24/7 Access', 'Group Classes', 'Sauna'] },
        { id: 95, name: 'Talwalkars Howrah', sport: 'Gym & Fitness', rating: 4.3, price: '₹1,000/month', image: 'https://images.unsplash.com/photo-1571019614243-c4cc2c27b35e?w=400&h=300&fit=crop', amenities: ['Yoga Studio', 'Zumba', 'Steam Room'] },

        // Table Tennis
        { id: 96, name: 'Bengal Table Tennis Academy', sport: 'Table Tennis', rating: 4.4, price: '₹300/hour', image: 'https://images.unsplash.com/photo-1587280501635-a19de238a81e?w=400&h=300&fit=crop', amenities: ['Professional Tables', 'Coaching', 'Tournaments'] },
        { id: 97, name: 'TT Masters Park Street', sport: 'Table Tennis', rating: 4.0, price: '₹250/hour', image: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=400&h=300&fit=crop', amenities: ['Air-Conditioned', 'Ping Pong Balls', 'Scoreboards'] },
        { id: 98, name: 'Salt Lake TT Club', sport: 'Table Tennis', rating: 3.9, price: '₹200/hour', image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=300&fit=crop', amenities: ['Multiple Tables', 'Beginner Training', 'Café'] },

        // Squash
        { id: 99, name: 'Calcutta Racket Club', sport: 'Squash', rating: 4.6, price: '₹800/hour', image: 'https://images.unsplash.com/photo-1594913615593-e4b8c44625be?w=400&h=300&fit=crop', amenities: ['Glass Courts', 'Coaching', 'Locker Rooms'] },
        { id: 100, name: 'Kolkata Squash Academy', sport: 'Squash', rating: 4.2, price: '₹600/hour', image: 'https://images.unsplash.com/photo-1594913615593-e4b8c44625be?w=400&h=300&fit=crop', amenities: ['AC Courts', 'Tournaments', 'Equipment Rental'] },
        { id: 101, name: 'The Squash House', sport: 'Squash', rating: 4.0, price: '₹500/hour', image: 'https://images.unsplash.com/photo-1594913615593-e4b8c44625be?w=400&h=300&fit=crop', amenities: ['Beginner-Friendly', 'Private Lessons', 'Showers'] },

        // Additional (if needed)
        { id: 102, name: 'Ultimate Sports Hub', sport: 'Multi-Sport', rating: 4.5, price: 'Varies', image: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=400&h=300&fit=crop', amenities: ['Cricket, Football, Tennis', 'Cafeteria', 'Parking'] },
        { id: 103, name: 'Kolkata Sports Complex', sport: 'Multi-Sport', rating: 4.3, price: 'Varies', image: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=400&h=300&fit=crop', amenities: ['Basketball, Badminton, Gym', 'Swimming Pool', 'PT Trainers'] },
        { id: 104, name: 'City Club & Fitness', sport: 'Gym & Multi-Sport', rating: 4.1, price: '₹1,800/month', image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400&h=300&fit=crop', amenities: ['Squash, TT, Yoga', 'Sauna', 'Dietician'] }],
        Hyderabad: [{ id: 105, name: 'Battlefields Sports Arena', sport: 'Cricket', rating: 5.0, price: '₹800/hour', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=300&fit=crop', amenities: ['Turf Pitch', 'Floodlights', 'Practice Nets'] },
        { id: 106, name: 'Praveen Cricket Academy', sport: 'Cricket', rating: 5.0, price: '₹750/hour', image: 'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=400&h=300&fit=crop', amenities: ['Coaching', 'Indoor Nets', 'Changing Rooms'] },
        { id: 107, name: 'Sky Eagle Cricket Academy', sport: 'Cricket', rating: 5.0, price: '₹700/hour', image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=300&fit=crop', amenities: ['Grass Pitch', 'Scorer', 'Seating'] },

        // Football
        { id: 108, name: 'Super Sports Park (Hyd)', sport: 'Football', rating: 4.5, price: '₹1,000/hour', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop', amenities: ['Shade Net', 'Futsal Court', 'Parking'] },
        { id: 109, name: 'N Sports Club', sport: 'Football', rating: 3.6, price: '₹850/hour', image: 'https://images.unsplash.com/photo-1543357480-c60d400e2ef9?w=400&h=300&fit=crop', amenities: ['Beverages', 'Seating Area', 'Equipment Rental'] },
        { id: 110, name: 'Apex Sports Arena', sport: 'Football', rating: 4.3, price: '₹900/hour', image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=400&h=300&fit=crop', amenities: ['Synthetic Turf', 'Goal Posts', 'Washrooms'] },

        // Basketball
        { id: 111, name: 'Gamepoint Basketball Court', sport: 'Basketball', rating: 4.5, price: '₹500/hour', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop', amenities: ['AC Courts', 'Coaching', 'Equipment'] },
        { id: 112, name: 'CMRTC Sports Club', sport: 'Basketball', rating: 4.0, price: '₹400/hour', image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=400&h=300&fit=crop', amenities: ['Indoor Court', 'Tournaments', 'Training'] },
        { id: 113, name: 'SAAP Basketball Complex', sport: 'Basketball', rating: 4.2, price: '₹450/hour', image: 'https://images.unsplash.com/photo-1600181516267-dbd3326071ff?w=400&h=300&fit=crop', amenities: ['Wooden Floor', 'Scoreboard', 'Floodlights'] },

        // Tennis
        { id: 114, name: 'SAAP Tennis Complex', sport: 'Tennis', rating: 4.6, price: '₹1,200/hour', image: 'https://images.unsplash.com/photo-1544298621-a28c00544413?w=400&h=300&fit=crop', amenities: ['Synthetic Courts', 'Ball Machines', 'Seating'] },
        { id: 115, name: 'Gamepoint Lawn Tennis', sport: 'Tennis', rating: 4.4, price: '₹1,000/hour', image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=300&fit=crop', amenities: ['AC Courts', 'Coaching', 'Tournaments'] },
        { id: 116, name: 'Fateh Maidan Tennis Club', sport: 'Tennis', rating: 4.3, price: '₹950/hour', image: 'https://images.unsplash.com/photo-1577623425736-6fa4e0726d5b?w=400&h=300&fit=crop', amenities: ['Clay Courts', 'Umpire Chair', 'Showers'] },

        // Badminton
        { id: 117, name: 'Sportsone Elite Badminton Academy', sport: 'Badminton', rating: 4.8, price: '₹600/hour', image: 'https://images.unsplash.com/photo-1594736797933-d0dfdb4b2fa8?w=400&h=300&fit=crop', amenities: ['AC Hall', 'Olympic Standards', 'Coaching'] },
        { id: 118, name: 'VS Badminton Academy', sport: 'Badminton', rating: 4.3, price: '₹550/hour', image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=400&h=300&fit=crop', amenities: ['Wooden Floor', 'Shuttle Service', 'Equipment'] },
        { id: 119, name: 'Gamepoint Badminton', sport: 'Badminton', rating: 4.7, price: '₹650/hour', image: 'https://images.unsplash.com/photo-1518604666860-9ed391f76460?w=400&h=300&fit=crop', amenities: ['Professional Courts', 'Racket Stringing', 'Café'] },

        // Volleyball
        { id: 120, name: 'CMRTC Volleyball Court', sport: 'Volleyball', rating: 4.0, price: '₹400/hour', image: 'https://images.unsplash.com/photo-1606979123456-5f8d7f1b8a5d?w=400&h=300&fit=crop', amenities: ['Sand Court', 'Professional Nets', 'Referee'] },
        { id: 121, name: 'SAAP Volleyball Arena', sport: 'Volleyball', rating: 3.9, price: '₹350/hour', image: 'https://images.unsplash.com/photo-1600181516267-dbd3326071ff?w=400&h=300&fit=crop', amenities: ['Indoor Court', 'Ball Service', 'Seating'] },
        { id: 122, name: 'Hyderabad Chargers Volleyball', sport: 'Volleyball', rating: 3.8, price: '₹300/hour', image: 'https://images.unsplash.com/photo-1600181516267-dbd3326071ff?w=400&h=300&fit=crop', amenities: ['Synthetic Floor', 'Floodlights', 'Lockers'] },

        // Gym & Fitness
        { id: 123, name: 'Gamepoint Gym', sport: 'Gym & Fitness', rating: 4.8, price: '₹1,500/month', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop', amenities: ['Cardio Machines', 'Weight Training', 'Personal Trainers'] },
        { id: 124, name: 'Decathlon Fitness Hub', sport: 'Gym & Fitness', rating: 4.5, price: '₹1,200/month', image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=400&h=300&fit=crop', amenities: ['24/7 Access', 'Group Classes', 'Sauna'] },
        { id: 125, name: 'CMRTC Fitness Center', sport: 'Gym & Fitness', rating: 4.3, price: '₹1,000/month', image: 'https://images.unsplash.com/photo-1571019614243-c4cc2c27b35e?w=400&h=300&fit=crop', amenities: ['Yoga Studio', 'Zumba', 'Steam Room'] },

        // Table Tennis
        { id: 126, name: 'Gamepoint Table Tennis', sport: 'Table Tennis', rating: 4.6, price: '₹300/hour', image: 'https://images.unsplash.com/photo-1587280501635-a19de238a81e?w=400&h=300&fit=crop', amenities: ['Professional Tables', 'Coaching', 'Tournaments'] },
        { id: 127, name: 'SAAP Table Tennis Club', sport: 'Table Tennis', rating: 4.2, price: '₹250/hour', image: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=400&h=300&fit=crop', amenities: ['Air-Conditioned', 'Ping Pong Balls', 'Scoreboards'] },
        { id: 128, name: 'CMRTC TT Arena', sport: 'Table Tennis', rating: 4.0, price: '₹200/hour', image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=300&fit=crop', amenities: ['Multiple Tables', 'Beginner Training', 'Café'] },

        // Squash
        { id: 129, name: 'Gamepoint Squash Courts', sport: 'Squash', rating: 4.7, price: '₹800/hour', image: 'https://images.unsplash.com/photo-1594913615593-e4b8c44625be?w=400&h=300&fit=crop', amenities: ['Glass Courts', 'Coaching', 'Locker Rooms'] },
        { id: 130, name: 'Hyderabad Squash Academy', sport: 'Squash', rating: 4.5, price: '₹700/hour', image: 'https://images.unsplash.com/photo-1594913615593-e4b8c44625be?w=400&h=300&fit=crop', amenities: ['AC Courts', 'Tournaments', 'Equipment Rental'] },
        { id: 131, name: 'SAAP Squash Complex', sport: 'Squash', rating: 4.3, price: '₹600/hour', image: 'https://images.unsplash.com/photo-1594913615593-e4b8c44625be?w=400&h=300&fit=crop', amenities: ['Beginner-Friendly', 'Private Lessons', 'Showers'] },

        // Multi-Sport (Bonus)
        { id: 132, name: 'AONE Sports & Pickleball', sport: 'Multi-Sport', rating: 4.7, price: 'Varies', image: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=400&h=300&fit=crop', amenities: ['Badminton, Pickleball', 'Cafeteria', 'Parking'] },
        { id: 133, name: 'Rajadhanis Sports Club', sport: 'Multi-Sport', rating: 3.0, price: 'Varies', image: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=400&h=300&fit=crop', amenities: ['Cricket, Football', 'Seating', 'Beverages'] },
        { id: 134, name: 'PLR Box Cricket', sport: 'Cricket', rating: 5.0, price: '₹500/hour', image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=300&fit=crop', amenities: ['Box Cricket', 'Floodlights', 'Equipment'] }],
        Pune: [
            // Cricket
            { id: 135, name: 'Nawu Sports Club', sport: 'Cricket', rating: 3.7, price: '₹700/hour', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=300&fit=crop', amenities: ['Turf Pitch', 'Practice Nets', 'Floodlights'], location: 'Gahunje (~24.7 km)' },
            { id: 136, name: 'Spark Cricket Ground', sport: 'Cricket', rating: 5.0, price: '₹800/hour', image: 'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=400&h=300&fit=crop', amenities: ['Professional Ground', 'Seating', 'Scorer'], location: 'Jambhe (~26.8 km)' },
            { id: 137, name: 'Impetus Sporting Punawale Turf', sport: 'Cricket', rating: 3.2, price: '₹600/hour', image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=300&fit=crop', amenities: ['Synthetic Turf', 'Changing Rooms', 'Water Dispenser'], location: 'Punawale (~28.2 km)' },

            // Football
            { id: 138, name: 'Turf Up (Hinjewadi)', sport: 'Football', rating: 4.4, price: '₹900/hour', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop', amenities: ['Full-Sized Pitch', 'Floodlights', 'Dugouts'], location: 'Hinjewadi (~29.6 km)' },
            { id: 139, name: 'Matchpoint Hinjewadi', sport: 'Football', rating: 5.0, price: '₹1,000/hour', image: 'https://images.unsplash.com/photo-1543357480-c60d400e2ef9?w=400&h=300&fit=crop', amenities: ['Synthetic Turf', 'Goal Posts', 'Lockers'], location: 'Hinjawadi (~27.8 km)' },
            { id: 140, name: 'Cambridge International Sports Club', sport: 'Football', rating: 5.0, price: '₹950/hour', image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=400&h=300&fit=crop', amenities: ['Grass Turf', 'Training Equipment', 'Showers'], location: 'Punawale (~28.4 km)' },

            // Basketball
            { id: 141, name: 'P.E. Society’s Modern Sports Complex', sport: 'Basketball', rating: 4.2, price: '₹450/hour', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop', amenities: ['Indoor Court', 'Scoreboard', 'Basketballs'], location: 'Shivajinagar' },
            { id: 142, name: 'Green Park Sports Club', sport: 'Basketball', rating: 4.0, price: '₹400/hour', image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=400&h=300&fit=crop', amenities: ['Outdoor Court', 'Floodlights', 'Coaching'], location: 'Someshwarwadi, Pashan' },
            { id: 143, name: 'VIBGYOR International School Court', sport: 'Basketball', rating: 3.8, price: '₹350/hour', image: 'https://images.unsplash.com/photo-1600181516267-dbd3326071ff?w=400&h=300&fit=crop', amenities: ['Wooden Floor', 'Training', 'Seating'], location: 'Hinjewadi Phase 2' },

            // Tennis
            { id: 144, name: 'Pinnacle Pavilion', sport: 'Tennis', rating: 4.0, price: '₹1,000/hour', image: 'https://images.unsplash.com/photo-1544298621-a28c00544413?w=400&h=300&fit=crop', amenities: ['Clay Courts', 'Ball Machines', 'Coaching'], location: 'Hinjewadi (~27.3 km)' },
            { id: 145, name: 'Patliputra Sports Club', sport: 'Tennis', rating: 4.0, price: '₹950/hour', image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=300&fit=crop', amenities: ['Hard Courts', 'Floodlights', 'Locker Rooms'], location: 'Hinjawadi Phase 3 (~28.8 km)' },
            { id: 146, name: 'Sarai Sports Academy', sport: 'Tennis', rating: 4.7, price: '₹1,100/hour', image: 'https://images.unsplash.com/photo-1577623425736-6fa4e0726d5b?w=400&h=300&fit=crop', amenities: ['Synthetic Grass', 'Umpire Chair', 'Showers'], location: 'Punawale (~28.8 km)' },

            // Badminton
            { id: 147, name: 'Majestic Badminton Club', sport: 'Badminton', rating: 4.2, price: '₹600/hour', image: 'https://images.unsplash.com/photo-1594736797933-d0dfdb4b2fa8?w=400&h=300&fit=crop', amenities: ['AC Hall', 'Olympic Standards', 'Coaching'], location: 'Punawale (~28.6 km)' },
            { id: 148, name: 'Dhananjay Sports and Fitness', sport: 'Badminton', rating: 5.0, price: '₹650/hour', image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=400&h=300&fit=crop', amenities: ['Wooden Floor', 'Shuttle Service', 'Equipment'], location: 'Kiwale (~26.4 km)' },
            { id: 149, name: 'Yoddha Sports Club', sport: 'Badminton', rating: 3.5, price: '₹550/hour', image: 'https://images.unsplash.com/photo-1518604666860-9ed391f76460?w=400&h=300&fit=crop', amenities: ['Professional Courts', 'Racket Stringing', 'Café'], location: 'Punawale (~28.4 km)' },

            // Volleyball
            { id: 150, name: 'Modern Sports Complex Volleyball Court', sport: 'Volleyball', rating: 4.0, price: '₹400/hour', image: 'https://images.unsplash.com/photo-1606979123456-5f8d7f1b8a5d?w=400&h=300&fit=crop', amenities: ['Sand Court', 'Professional Nets', 'Referee'], location: 'Shivajinagar' },
            { id: 151, name: 'Green Park Volleyball Arena', sport: 'Volleyball', rating: 3.9, price: '₹350/hour', image: 'https://images.unsplash.com/photo-1600181516267-dbd3326071ff?w=400&h=300&fit=crop', amenities: ['Indoor Court', 'Ball Service', 'Seating'], location: 'Someshwarwadi, Pashan' },
            { id: 152, name: 'VIBGYOR Volleyball Club', sport: 'Volleyball', rating: 3.7, price: '₹300/hour', image: 'https://images.unsplash.com/photo-1600181516267-dbd3326071ff?w=400&h=300&fit=crop', amenities: ['Synthetic Floor', 'Floodlights', 'Lockers'], location: 'Hinjewadi Phase 2' },

            // Gym & Fitness
            { id: 153, name: 'Dhananjay Sports and Fitness', sport: 'Gym & Fitness', rating: 5.0, price: '₹1,500/month', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop', amenities: ['Cardio Machines', 'Weight Training', 'Personal Trainers'], location: 'Kiwale (~26.4 km)' },
            { id: 154, name: 'Yoddha Sports Club Gym', sport: 'Gym & Fitness', rating: 3.5, price: '₹1,200/month', image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=400&h=300&fit=crop', amenities: ['24/7 Access', 'Group Classes', 'Sauna'], location: 'Punawale (~28.4 km)' },
            { id: 155, name: 'Sarai Sports Academy Gym', sport: 'Gym & Fitness', rating: 4.7, price: '₹1,300/month', image: 'https://images.unsplash.com/photo-1571019614243-c4cc2c27b35e?w=400&h=300&fit=crop', amenities: ['Yoga Studio', 'Zumba', 'Steam Room'], location: 'Punawale (~28.8 km)' },

            // Table Tennis
            { id: 156, name: 'Modern Sports Complex TT Club', sport: 'Table Tennis', rating: 4.3, price: '₹300/hour', image: 'https://images.unsplash.com/photo-1587280501635-a19de238a81e?w=400&h=300&fit=crop', amenities: ['Professional Tables', 'Coaching', 'Tournaments'], location: 'Shivajinagar' },
            { id: 157, name: 'Green Park Table Tennis', sport: 'Table Tennis', rating: 4.0, price: '₹250/hour', image: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=400&h=300&fit=crop', amenities: ['Air-Conditioned', 'Ping Pong Balls', 'Scoreboards'], location: 'Someshwarwadi, Pashan' },
            { id: 158, name: 'VIBGYOR TT Arena', sport: 'Table Tennis', rating: 3.8, price: '₹200/hour', image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=300&fit=crop', amenities: ['Multiple Tables', 'Beginner Training', 'Café'], location: 'Hinjewadi Phase 2' },

            // Squash
            { id: 159, name: 'Pinnacle Pavilion Squash Courts', sport: 'Squash', rating: 4.5, price: '₹800/hour', image: 'https://images.unsplash.com/photo-1594913615593-e4b8c44625be?w=400&h=300&fit=crop', amenities: ['Glass Courts', 'Coaching', 'Locker Rooms'], location: 'Hinjewadi (~27.3 km)' },
            { id: 160, name: 'Cambridge International Squash Club', sport: 'Squash', rating: 5.0, price: '₹900/hour', image: 'https://images.unsplash.com/photo-1594913615593-e4b8c44625be?w=400&h=300&fit=crop', amenities: ['AC Courts', 'Tournaments', 'Equipment Rental'], location: 'Punawale (~28.4 km)' },
            { id: 161, name: 'Sarai Sports Academy Squash', sport: 'Squash', rating: 4.7, price: '₹850/hour', image: 'https://images.unsplash.com/photo-1594913615593-e4b8c44625be?w=400&h=300&fit=crop', amenities: ['Beginner-Friendly', 'Private Lessons', 'Showers'], location: 'Punawale (~28.8 km)' },

            // Multi-Sport (Bonus)
            { id: 162, name: 'Nawu Sports Club', sport: 'Multi-Sport', rating: 3.7, price: 'Varies', image: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=400&h=300&fit=crop', amenities: ['Cricket, Football, Tennis', 'Cafeteria', 'Parking'], location: 'Gahunje (~24.7 km)' },
            { id: 163, name: 'Matchpoint Hinjewadi', sport: 'Multi-Sport', rating: 5.0, price: 'Varies', image: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=400&h=300&fit=crop', amenities: ['Football, Badminton, Gym', 'Swimming Pool', 'PT Trainers'], location: 'Hinjawadi (~27.8 km)' },
            { id: 164, name: 'Yoddha Sports Club', sport: 'Multi-Sport', rating: 3.5, price: 'Varies', image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400&h=300&fit=crop', amenities: ['Badminton, TT, Yoga', 'Sauna', 'Dietician'], location: 'Punawale (~28.4 km)' }],

        Ahmedabad: [// Cricket
            { id: 165, name: 'EKA Club Cricket Academy', sport: 'Cricket', rating: 4.5, price: '₹800/hour', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=300&fit=crop', amenities: ['Turf Pitch', 'Practice Nets', 'Floodlights'], location: 'Near Kankaria Lake' },
            { id: 166, name: 'Rising Sports Academy', sport: 'Cricket', rating: 4.8, price: '₹900/hour', image: 'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=400&h=300&fit=crop', amenities: ['Professional Ground', 'Coaching', 'Changing Rooms'], location: 'Nirant Cross Road' },
            { id: 167, name: 'Ahmedabad Sports Academy', sport: 'Cricket', rating: 4.6, price: '₹750/hour', image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=300&fit=crop', amenities: ['Indoor Nets', 'Scorer', 'Seating'], location: 'Sanand' },

            // Football
            { id: 168, name: 'EKA Club FIFA Standard Football Pitch', sport: 'Football', rating: 4.7, price: '₹1,200/hour', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop', amenities: ['FIFA Standard Pitch', 'Floodlights', '20,000 Seater'], location: 'Near Kankaria Lake' },
            { id: 169, name: 'YMCA International Club Football Ground', sport: 'Football', rating: 4.3, price: '₹950/hour', image: 'https://images.unsplash.com/photo-1543357480-c60d400e2ef9?w=400&h=300&fit=crop', amenities: ['Synthetic Turf', 'Goal Posts', 'Training Equipment'], location: 'SG Highway' },
            { id: 170, name: 'Karnavati Club Football Arena', sport: 'Football', rating: 4.0, price: '₹850/hour', image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=400&h=300&fit=crop', amenities: ['Grass Turf', 'Dugouts', 'Washrooms'], location: 'Sarkhej-Gandhinagar Highway' },

            // Basketball
            { id: 171, name: 'EKA Club Basketball Court', sport: 'Basketball', rating: 4.4, price: '₹500/hour', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop', amenities: ['Indoor Court', 'Scoreboard', 'Coaching'], location: 'Near Kankaria Lake' },
            { id: 172, name: 'YMCA International Club Basketball', sport: 'Basketball', rating: 4.2, price: '₹450/hour', image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=400&h=300&fit=crop', amenities: ['Outdoor Court', 'Floodlights', 'Training'], location: 'SG Highway' },
            { id: 173, name: 'Ahmedabad Sports Academy Basketball', sport: 'Basketball', rating: 4.0, price: '₹400/hour', image: 'https://images.unsplash.com/photo-1600181516267-dbd3326071ff?w=400&h=300&fit=crop', amenities: ['Wooden Floor', 'Seating', 'Equipment'], location: 'Sanand' },

            // Tennis
            { id: 174, name: 'EKA Club Tennis Court', sport: 'Tennis', rating: 4.6, price: '₹1,100/hour', image: 'https://images.unsplash.com/photo-1544298621-a28c00544413?w=400&h=300&fit=crop', amenities: ['Rooftop Court', 'Lake View', 'Coaching'], location: '7th Floor, Near Kankaria Lake' },
            { id: 175, name: 'Karnavati Club Tennis Academy', sport: 'Tennis', rating: 4.3, price: '₹950/hour', image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=300&fit=crop', amenities: ['Clay Courts', 'Ball Machines', 'Locker Rooms'], location: 'Sarkhej-Gandhinagar Highway' },
            { id: 176, name: 'YMCA International Club Tennis', sport: 'Tennis', rating: 4.1, price: '₹850/hour', image: 'https://images.unsplash.com/photo-1577623425736-6fa4e0726d5b?w=400&h=300&fit=crop', amenities: ['Hard Courts', 'Umpire Chair', 'Showers'], location: 'SG Highway' },

            // Badminton
            { id: 177, name: 'EKA Club Badminton Academy', sport: 'Badminton', rating: 4.7, price: '₹650/hour', image: 'https://images.unsplash.com/photo-1594736797933-d0dfdb4b2fa8?w=400&h=300&fit=crop', amenities: ['6 AC Courts', 'Olympic Standards', 'Coaching'], location: 'Near Kankaria Lake' },
            { id: 178, name: 'Ahmedabad Sports Academy Badminton', sport: 'Badminton', rating: 4.5, price: '₹600/hour', image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=400&h=300&fit=crop', amenities: ['Wooden Floor', 'Shuttle Service', 'Equipment'], location: 'Sanand' },
            { id: 179, name: 'YMCA International Club Badminton', sport: 'Badminton', rating: 4.2, price: '₹550/hour', image: 'https://images.unsplash.com/photo-1518604666860-9ed391f76460?w=400&h=300&fit=crop', amenities: ['Professional Courts', 'Racket Stringing', 'Café'], location: 'SG Highway' },

            // Volleyball
            { id: 180, name: 'EKA Club Volleyball Court', sport: 'Volleyball', rating: 4.0, price: '₹450/hour', image: 'https://images.unsplash.com/photo-1606979123456-5f8d7f1b8a5d?w=400&h=300&fit=crop', amenities: ['Indoor Court', 'Professional Nets', 'Referee'], location: 'Near Kankaria Lake' },
            { id: 181, name: 'Karnavati Club Volleyball', sport: 'Volleyball', rating: 3.9, price: '₹400/hour', image: 'https://images.unsplash.com/photo-1600181516267-dbd3326071ff?w=400&h=300&fit=crop', amenities: ['Sand Court', 'Ball Service', 'Seating'], location: 'Sarkhej-Gandhinagar Highway' },
            { id: 182, name: 'Ahmedabad Sports Academy Volleyball', sport: 'Volleyball', rating: 3.7, price: '₹350/hour', image: 'https://images.unsplash.com/photo-1600181516267-dbd3326071ff?w=400&h=300&fit=crop', amenities: ['Synthetic Floor', 'Floodlights', 'Lockers'], location: 'Sanand' },

            // Gym & Fitness
            { id: 183, name: 'EKA Club Body Transformation Center', sport: 'Gym & Fitness', rating: 4.8, price: '₹1,500/month', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop', amenities: ['15,000 sq.ft. Area', 'Steam Room', 'Personal Trainers'], location: 'Near Kankaria Lake' },
            { id: 184, name: 'YMCA International Club Gym', sport: 'Gym & Fitness', rating: 4.5, price: '₹1,200/month', image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=400&h=300&fit=crop', amenities: ['24/7 Access', 'Group Classes', 'Sauna'], location: 'SG Highway' },
            { id: 185, name: 'Karnavati Club Fitness Center', sport: 'Gym & Fitness', rating: 4.3, price: '₹1,000/month', image: 'https://images.unsplash.com/photo-1571019614243-c4cc2c27b35e?w=400&h=300&fit=crop', amenities: ['Yoga Studio', 'Zumba', 'Steam Room'], location: 'Sarkhej-Gandhinagar Highway' },

            // Table Tennis
            { id: 186, name: 'EKA Club Table Tennis', sport: 'Table Tennis', rating: 4.5, price: '₹350/hour', image: 'https://images.unsplash.com/photo-1587280501635-a19de238a81e?w=400&h=300&fit=crop', amenities: ['5 Regulation Tables', 'AC Hall', 'Tournaments'], location: 'Near Kankaria Lake' },
            { id: 187, name: 'Ahmedabad Sports Academy TT', sport: 'Table Tennis', rating: 4.2, price: '₹300/hour', image: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=400&h=300&fit=crop', amenities: ['Air-Conditioned', 'Ping Pong Balls', 'Scoreboards'], location: 'Sanand' },
            { id: 188, name: 'YMCA International Club TT', sport: 'Table Tennis', rating: 4.0, price: '₹250/hour', image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=300&fit=crop', amenities: ['Multiple Tables', 'Beginner Training', 'Café'], location: 'SG Highway' },

            // Squash
            { id: 189, name: 'EKA Club Squash Courts', sport: 'Squash', rating: 4.7, price: '₹850/hour', image: 'https://images.unsplash.com/photo-1594913615593-e4b8c44625be?w=400&h=300&fit=crop', amenities: ['3 International Courts', 'Perfect Lighting', 'Coaching'], location: 'Near Kankaria Lake' },
            { id: 190, name: 'Karnavati Club Squash', sport: 'Squash', rating: 4.4, price: '₹750/hour', image: 'https://images.unsplash.com/photo-1594913615593-e4b8c44625be?w=400&h=300&fit=crop', amenities: ['AC Courts', 'Tournaments', 'Equipment Rental'], location: 'Sarkhej-Gandhinagar Highway' },
            { id: 191, name: 'YMCA International Club Squash', sport: 'Squash', rating: 4.2, price: '₹700/hour', image: 'https://images.unsplash.com/photo-1594913615593-e4b8c44625be?w=400&h=300&fit=crop', amenities: ['Beginner-Friendly', 'Private Lessons', 'Showers'], location: 'SG Highway' },

            // Multi-Sport (Bonus)
            { id: 192, name: 'EKA Club Multi-Sport Hall', sport: 'Multi-Sport', rating: 4.6, price: 'Varies', image: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=400&h=300&fit=crop', amenities: ['Badminton, Basketball, Kabaddi', '9,515 sq.ft. Area', 'Coaching'], location: 'Near Kankaria Lake' },
            { id: 193, name: 'YMCA International Club', sport: 'Multi-Sport', rating: 4.5, price: 'Varies', image: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=400&h=300&fit=crop', amenities: ['Football, Tennis, Swimming', 'Restaurants', 'Poolside Café'], location: 'SG Highway' },
            { id: 194, name: 'Karnavati Club', sport: 'Multi-Sport', rating: 4.3, price: 'Varies', image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400&h=300&fit=crop', amenities: ['Cricket, Football, Gym', 'Banquets', '5,00,000 sq.ft. Area'], location: 'Sarkhej-Gandhinagar Highway' }],
        Jaipur: [// Cricket
            { id: 195, name: 'Jaipur Turf', sport: 'Cricket', rating: 4.5, price: '₹700/hour', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=300&fit=crop', amenities: ['Turf Pitch', 'Practice Nets', 'Floodlights'], location: 'Nirman Nagar' },
            { id: 196, name: 'Nancha Cricket Academy', sport: 'Cricket', rating: 4.2, price: '₹600/hour', image: 'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=400&h=300&fit=crop', amenities: ['Coaching', 'Indoor Nets', 'Changing Rooms'], location: 'Amer' },
            { id: 197, name: 'JECRC UDML Sports Complex', sport: 'Cricket', rating: 4.0, price: '₹650/hour', image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=300&fit=crop', amenities: ['Grass Pitch', 'Scorer', 'Seating'], location: 'Kukas' },

            // Football
            { id: 198, name: 'Fr Batson Sports Complex', sport: 'Football', rating: 4.3, price: '₹900/hour', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop', amenities: ['Full-Sized Pitch', 'Floodlights', 'Dugouts'], location: 'Ashok Nagar' },
            { id: 199, name: 'Indoor Stadium Rajpora', sport: 'Football', rating: 4.1, price: '₹850/hour', image: 'https://images.unsplash.com/photo-1543357480-c60d400e2ef9?w=400&h=300&fit=crop', amenities: ['Synthetic Turf', 'Goal Posts', 'Training Equipment'], location: 'New Colony' },
            { id: 200, name: 'Sadbhavna Stadium Paleda', sport: 'Football', rating: 3.9, price: '₹800/hour', image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=400&h=300&fit=crop', amenities: ['Grass Turf', 'Lockers', 'Water Dispenser'], location: 'Naradpura' },

            // Basketball
            { id: 201, name: 'Basketball Court, KV No. 2', sport: 'Basketball', rating: 4.4, price: '₹450/hour', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop', amenities: ['Indoor Court', 'Scoreboard', 'Basketballs'], location: 'Sikar Road' },
            { id: 202, name: 'University Basket Ball Court', sport: 'Basketball', rating: 4.0, price: '₹400/hour', image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=400&h=300&fit=crop', amenities: ['Outdoor Court', 'Floodlights', 'Training'], location: 'Tilak Nagar' },
            { id: 203, name: 'Phed Sports Club', sport: 'Basketball', rating: 3.8, price: '₹350/hour', image: 'https://images.unsplash.com/photo-1600181516267-dbd3326071ff?w=400&h=300&fit=crop', amenities: ['Wooden Floor', 'Seating', 'Equipment'], location: 'Sikar Road' },

            // Tennis
            { id: 204, name: 'All Starr Club Tennis Court', sport: 'Tennis', rating: 4.6, price: '₹1,000/hour', image: 'https://images.unsplash.com/photo-1544298621-a28c00544413?w=400&h=300&fit=crop', amenities: ['Clay Courts', 'Ball Machines', 'Coaching'], location: 'Near Jaipur International Airport' },
            { id: 205, name: 'JECRC University Tennis Court', sport: 'Tennis', rating: 4.3, price: '₹950/hour', image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=300&fit=crop', amenities: ['Hard Courts', 'Locker Rooms', 'Tournaments'], location: 'Kukas' },
            { id: 206, name: 'RS Badminton Academy', sport: 'Tennis', rating: 4.1, price: '₹900/hour', image: 'https://images.unsplash.com/photo-1577623425736-6fa4e0726d5b?w=400&h=300&fit=crop', amenities: ['Synthetic Grass', 'Umpire Chair', 'Showers'], location: 'Kartarpur' },

            // Badminton
            { id: 207, name: 'RS Badminton Academy', sport: 'Badminton', rating: 4.7, price: '₹600/hour', image: 'https://images.unsplash.com/photo-1594736797933-d0dfdb4b2fa8?w=400&h=300&fit=crop', amenities: ['AC Hall', 'Olympic Standards', 'Coaching'], location: 'Kartarpur' },
            { id: 208, name: 'I Play Sports', sport: 'Badminton', rating: 4.5, price: '₹550/hour', image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=400&h=300&fit=crop', amenities: ['Wooden Floor', 'Shuttle Service', 'Equipment'], location: 'Civil Lines' },
            { id: 209, name: 'Hindver Sports', sport: 'Badminton', rating: 4.2, price: '₹500/hour', image: 'https://images.unsplash.com/photo-1518604666860-9ed391f76460?w=400&h=300&fit=crop', amenities: ['Professional Courts', 'Racket Stringing', 'Café'], location: 'Biseswarji' },

            // Volleyball
            { id: 210, name: 'JECRC University Volleyball Court', sport: 'Volleyball', rating: 4.0, price: '₹400/hour', image: 'https://images.unsplash.com/photo-1606979123456-5f8d7f1b8a5d?w=400&h=300&fit=crop', amenities: ['Indoor Court', 'Professional Nets', 'Referee'], location: 'Kukas' },
            { id: 211, name: 'Wrestling Indoor Stadium', sport: 'Volleyball', rating: 3.9, price: '₹350/hour', image: 'https://images.unsplash.com/photo-1600181516267-dbd3326071ff?w=400&h=300&fit=crop', amenities: ['Sand Court', 'Ball Service', 'Seating'], location: 'Tilak Nagar' },
            { id: 212, name: 'Sport Complekx', sport: 'Volleyball', rating: 3.7, price: '₹300/hour', image: 'https://images.unsplash.com/photo-1600181516267-dbd3326071ff?w=400&h=300&fit=crop', amenities: ['Synthetic Floor', 'Floodlights', 'Lockers'], location: 'Adarsh Nagar' },

            // Gym & Fitness
            { id: 213, name: 'All Starr Club Gym', sport: 'Gym & Fitness', rating: 4.8, price: '₹1,500/month', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop', amenities: ['Cardio Machines', 'Weight Training', 'Personal Trainers'], location: 'Near Jaipur International Airport' },
            { id: 214, name: 'JECRC University Gymnasium', sport: 'Gym & Fitness', rating: 4.5, price: '₹1,200/month', image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=400&h=300&fit=crop', amenities: ['24/7 Access', 'Group Classes', 'Sauna'], location: 'Kukas' },
            { id: 215, name: 'Max Sport Floor India', sport: 'Gym & Fitness', rating: 4.3, price: '₹1,000/month', image: 'https://images.unsplash.com/photo-1571019614243-c4cc2c27b35e?w=400&h=300&fit=crop', amenities: ['Yoga Studio', 'Zumba', 'Steam Room'], location: 'Vishwakarma Industrial Area' },

            // Table Tennis
            { id: 216, name: 'JECRC University Table Tennis', sport: 'Table Tennis', rating: 4.5, price: '₹300/hour', image: 'https://images.unsplash.com/photo-1587280501635-a19de238a81e?w=400&h=300&fit=crop', amenities: ['Professional Tables', 'Coaching', 'Tournaments'], location: 'Kukas' },
            { id: 217, name: 'Aayush Sports Club', sport: 'Table Tennis', rating: 4.2, price: '₹250/hour', image: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=400&h=300&fit=crop', amenities: ['Air-Conditioned', 'Ping Pong Balls', 'Scoreboards'], location: 'Dhand' },
            { id: 218, name: 'Sports Authority Of India', sport: 'Table Tennis', rating: 4.0, price: '₹200/hour', image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=300&fit=crop', amenities: ['Multiple Tables', 'Beginner Training', 'Café'], location: 'Vidyadhar Nagar' },

            // Squash
            { id: 219, name: 'All Starr Club Squash Courts', sport: 'Squash', rating: 4.7, price: '₹800/hour', image: 'https://images.unsplash.com/photo-1594913615593-e4b8c44625be?w=400&h=300&fit=crop', amenities: ['Glass Courts', 'Coaching', 'Locker Rooms'], location: 'Near Jaipur International Airport' },
            { id: 220, name: 'Jagnnathpura Sports Ground', sport: 'Squash', rating: 4.4, price: '₹700/hour', image: 'https://images.unsplash.com/photo-1594913615593-e4b8c44625be?w=400&h=300&fit=crop', amenities: ['AC Courts', 'Tournaments', 'Equipment Rental'], location: 'Nindar' },
            { id: 221, name: 'My Dream Sports Academy', sport: 'Squash', rating: 4.2, price: '₹600/hour', image: 'https://images.unsplash.com/photo-1594913615593-e4b8c44625be?w=400&h=300&fit=crop', amenities: ['Beginner-Friendly', 'Private Lessons', 'Showers'], location: 'Nindar' },

            // Multi-Sport (Bonus)
            { id: 222, name: 'JECRC UDML Sports Complex', sport: 'Multi-Sport', rating: 4.6, price: 'Varies', image: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=400&h=300&fit=crop', amenities: ['Football, Basketball, Cricket', 'Cafeteria', 'Parking'], location: 'Kukas' },
            { id: 223, name: 'Raghuvanshi Stadium', sport: 'Multi-Sport', rating: 4.0, price: 'Varies', image: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=400&h=300&fit=crop', amenities: ['Cricket, Football, Volleyball', 'Seating', 'Beverages'], location: 'Nindar' },
            { id: 224, name: 'Shree Veer Teja Running Stadium', sport: 'Multi-Sport', rating: 3.8, price: 'Varies', image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400&h=300&fit=crop', amenities: ['Athletics, Football, Gym', 'Track', 'PT Trainers'], location: 'Israwala' }],
        Lucknow: [
            { id: 225, name: 'Gomti Cricket Academy', sport: 'Cricket', rating: 4.5, price: '₹1800/hour', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=300&fit=crop', amenities: ['Practice Nets', 'Floodlights', 'Coaching'] },
            { id: 226, name: 'Charbagh Football Ground', sport: 'Football', rating: 4.6, price: '₹2000/hour', image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=300&fit=crop', amenities: ['Natural Turf', 'Floodlights', 'Changing Rooms'] },
            { id: 227, name: 'Hazratganj Basketball Court', sport: 'Basketball', rating: 4.3, price: '₹1200/hour', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop', amenities: ['AC Hall', 'Scoreboard', 'Seating'] },
            { id: 228, name: 'Nawab Tennis Club', sport: 'Tennis', rating: 4.7, price: '₹1600/hour', image: 'https://images.unsplash.com/photo-1544298621-a15c373ac912?w=400&h=300&fit=crop', amenities: ['Clay Courts', 'Ball Machines', 'Pro Shop'] },
            { id: 229, name: 'Lucknow Badminton Hub', sport: 'Badminton', rating: 4.4, price: '₹800/hour', image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=400&h=300&fit=crop', amenities: ['AC Courts', 'Shuttle Service', 'Coaching'] },
            { id: 230, name: 'Ambedkar Volleyball Arena', sport: 'Volleyball', rating: 4.2, price: '₹1000/hour', image: 'https://images.unsplash.com/photo-1592656094267-764a7af1d8f5?w=400&h=300&fit=crop', amenities: ['Sand Court', 'Professional Nets', 'Showers'] },
            { id: 231, name: 'FitPro Gym', sport: 'Gym & Fitness', rating: 4.8, price: '₹500/hour', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop', amenities: ['Modern Equipment', 'Personal Trainers', 'AC'] },
            { id: 232, name: 'TT Masters Lucknow', sport: 'Table Tennis', rating: 4.1, price: '₹400/hour', image: 'https://images.unsplash.com/photo-1601342630318-2f1a3ec1c209?w=400&h=300&fit=crop', amenities: ['10 Tables', 'Coaching', 'Tournaments'] },
            { id: 233, name: 'Royal Squash Courts', sport: 'Squash', rating: 4.5, price: '₹900/hour', image: 'https://images.unsplash.com/photo-1591213953506-42e93358a4f2?w=400&h=300&fit=crop', amenities: ['AC Courts', 'Equipment', 'Lockers'] },
            { id: 234, name: 'KD Singh Babu Stadium', sport: 'Cricket', rating: 4.9, price: '₹2500/hour', image: 'https://images.unsplash.com/photo-1593118247619-e2d6f056869e?w=400&h=300&fit=crop', amenities: ['International Standard', 'Pavilion', 'Floodlights'] },
            { id: 235, name: 'City Football Club', sport: 'Football', rating: 4.4, price: '₹1800/hour', image: 'https://images.unsplash.com/photo-1474540412665-1cdae210ae6b?w=400&h=300&fit=crop', amenities: ['Artificial Turf', 'Floodlights', 'Seating'] },
            { id: 236, name: 'University Basketball', sport: 'Basketball', rating: 4.0, price: '₹900/hour', image: 'https://images.unsplash.com/photo-1542754861-4911785a9d8a?w=400&h=300&fit=crop', amenities: ['College Facility', 'Basic Amenities', 'Parking'] },
            { id: 237, name: 'Garden Tennis Academy', sport: 'Tennis', rating: 4.6, price: '₹1400/hour', image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=300&fit=crop', amenities: ['Hard Courts', 'Coaching', 'Equipment'] },
            { id: 238, name: 'Shuttle Masters', sport: 'Badminton', rating: 4.3, price: '₹750/hour', image: 'https://images.unsplash.com/photo-1551855375-27b0a4a92a4a?w=400&h=300&fit=crop', amenities: ['6 Courts', 'AC', 'Equipment Rental'] },
            { id: 239, name: 'Net Play Volleyball', sport: 'Volleyball', rating: 4.1, price: '₹850/hour', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop', amenities: ['Indoor Court', 'Professional Setup', 'AC'] },
            { id: 240, name: 'Powerhouse Gym', sport: 'Gym & Fitness', rating: 4.7, price: '₹600/hour', image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=300&fit=crop', amenities: ['Heavy Weights', 'Cardio Zone', 'Trainers'] },
            { id: 241, name: 'Ping Pong Club', sport: 'Table Tennis', rating: 4.2, price: '₹350/hour', image: 'https://images.unsplash.com/photo-1601342630318-2f1a3ec1c209?w=400&h=300&fit=crop', amenities: ['8 Tables', 'Casual Play', 'Basic'] },
            { id: 242, name: 'Squash Pro Lucknow', sport: 'Squash', rating: 4.4, price: '₹850/hour', image: 'https://images.unsplash.com/photo-1591213953506-42e93358a4f2?w=400&h=300&fit=crop', amenities: ['Glass Court', 'Coaching', 'Lockers'] },
            { id: 243, name: 'Junior Cricket League', sport: 'Cricket', rating: 4.3, price: '₹1500/hour', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=300&fit=crop', amenities: ['Youth Focused', 'Coaching', 'Net Practice'] },
            { id: 244, name: 'FC Lucknow', sport: 'Football', rating: 4.5, price: '₹2200/hour', image: 'https://images.unsplash.com/photo-1474540412665-1cdae210ae6b?w=400&h=300&fit=crop', amenities: ['Professional Turf', 'Floodlights', 'Grandstand'] },
            { id: 245, name: 'Dunk Masters', sport: 'Basketball', rating: 4.6, price: '₹1500/hour', image: 'https://images.unsplash.com/photo-1542754861-4911785a9d8a?w=400&h=300&fit=crop', amenities: ['AC Court', 'Competitions', 'Seating'] },
            { id: 246, name: 'Grand Slam Tennis', sport: 'Tennis', rating: 4.8, price: '₹2000/hour', image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=300&fit=crop', amenities: ['Grass Court', 'Ball Boys', 'VIP Lounge'] },
            { id: 247, name: 'Shuttle Time', sport: 'Badminton', rating: 4.2, price: '₹700/hour', image: 'https://images.unsplash.com/photo-1551855375-27b0a4a92a4a?w=400&h=300&fit=crop', amenities: ['4 Courts', 'AC', 'Basic'] },
            { id: 248, name: 'Spike Zone', sport: 'Volleyball', rating: 4.0, price: '₹950/hour', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop', amenities: ['Beach Volleyball', 'Outdoor', 'Basic'] },
            { id: 249, name: 'Iron Temple Gym', sport: 'Gym & Fitness', rating: 4.9, price: '₹700/hour', image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=300&fit=crop', amenities: ['Premium Equipment', 'Sauna', 'Protein Bar'] },
            { id: 250, name: 'Table Tennis Pro', sport: 'Table Tennis', rating: 4.3, price: '₹450/hour', image: 'https://images.unsplash.com/photo-1601342630318-2f1a3ec1c209?w=400&h=300&fit=crop', amenities: ['Tournament Standard', 'Coaching', 'Equipment'] },
            { id: 251, name: 'Squash Masters', sport: 'Squash', rating: 4.7, price: '₹1000/hour', image: 'https://images.unsplash.com/photo-1591213953506-42e93358a4f2?w=400&h=300&fit=crop', amenities: ['Championship Court', 'Video Analysis', 'Lockers'] },
            { id: 252, name: 'Weekend Cricket Club', sport: 'Cricket', rating: 4.1, price: '₹1600/hour', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=300&fit=crop', amenities: ['Casual Play', 'Basic Facilities', 'Parking'] },
            { id: 253, name: 'Street Football', sport: 'Football', rating: 4.3, price: '₹1700/hour', image: 'https://images.unsplash.com/photo-1474540412665-1cdae210ae6b?w=400&h=300&fit=crop', amenities: ['Community Ground', 'Floodlights', 'Basic'] },
            { id: 254, name: 'Basketball Training', sport: 'Basketball', rating: 4.5, price: '₹1300/hour', image: 'https://images.unsplash.com/photo-1542754861-4911785a9d8a?w=400&h=300&fit=crop', amenities: ['Professional Coaching', 'Drills', 'Video Analysis'] }
        ]
    };

    // Get user's location
    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // Mock location detection - in real app, you'd use reverse geocoding
                    const mockCity = availableCities[Math.floor(Math.random() * availableCities.length)];
                    setUserLocation(mockCity);
                    setSelectedCity(mockCity);
                    setIsLocationAvailable(true);
                    setShowLocationModal(false);
                },
                (error) => {
                    console.error('Location access denied');
                    setIsLocationAvailable(false);
                }
            );
        }
    };

    // Handle manual city selection
    const handleCitySelect = (city) => {
        if (availableCities.includes(city)) {
            setSelectedCity(city);
            setIsLocationAvailable(true);
            setShowLocationModal(false);
            setDisplayedClubs(6); // Reset displayed clubs when city changes
        } else {
            setIsLocationAvailable(false);
        }
    };

    // Filter clubs based on search and sport (improved filtering)
    const filteredClubs = selectedCity && clubsData[selectedCity]
        ? clubsData[selectedCity].filter(club => {
            const matchesSearch = club.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesSport = selectedSport === '' || selectedSport === 'All Sports' || club.sport === selectedSport;
            return matchesSearch && matchesSport;
        })
        : [];

    // Get clubs to display (limited by displayedClubs count)
    const clubsToShow = filteredClubs.slice(0, displayedClubs);
    const hasMoreClubs = filteredClubs.length > displayedClubs;

    // Load more clubs with smooth animation
    const loadMoreClubs = () => {
        setIsLoading(true);
        setTimeout(() => {
            setDisplayedClubs(prev => prev + 6);
            setIsLoading(false);
        }, 500);
    };

    // Handle Join Club modal
    const handleJoinClub = (club) => {
        setSelectedClub(club);
        setShowJoinModal(true);
        setIsSubmitted(false);
        setJoinFormData({
            age: '',
            skills: '',
            experience: 'Beginner',
            achievements: '',
            certificate: null,
            isPaid: false
        });
    };

    const handleCloseJoinModal = () => {
        setShowJoinModal(false);
        setSelectedClub(null);
        setIsSubmitted(false);
    };

    const handleJoinFormSubmit = (e) => {
        e.preventDefault();
        if (!joinFormData.isPaid) return;
        
        // Simulate form submission
        setTimeout(() => {
            setIsSubmitted(true);
        }, 500);
    };

    const handleInputChange = (field, value) => {
        setJoinFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Reset displayed clubs when filters change
    useEffect(() => {
        setDisplayedClubs(6);
    }, [searchQuery, selectedSport]);

    // Smooth scroll to new content
    const scrollToNewContent = () => {
        setTimeout(() => {
            const clubsContainer = document.getElementById('clubs-container');
            if (clubsContainer) {
                const newClubsStart = clubsContainer.children[Math.max(0, displayedClubs - 6)];
                if (newClubsStart) {
                    newClubsStart.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        }, 100);
    };

    useEffect(() => {
        if (displayedClubs > 6) {
            scrollToNewContent();
        }
    }, [displayedClubs]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a1128] via-[#1a2238] to-[#0a1128] text-white">
            {/* Location Modal */}
            {showLocationModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                    <div className="bg-gradient-to-br from-[#1a2238] to-[#0a1128] rounded-2xl p-8 max-w-md w-full border border-orange-500/20 transform transition-all duration-300 scale-100 opacity-100">
                        <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                            Choose Your Location
                        </h2>

                        <div className="space-y-4">
                            <button
                                onClick={getCurrentLocation}
                                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105"
                            >
                                <MapPin className="w-5 h-5" />
                                Use Current Location
                            </button>

                            <div className="text-center text-gray-400">or</div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Select City Manually</label>
                                <select
                                    className="w-full bg-[#0a1128] border border-orange-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-all duration-300"
                                    onChange={(e) => handleCitySelect(e.target.value)}
                                    defaultValue=""
                                >
                                    <option value="">Choose a city...</option>
                                    {availableCities.map(city => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="container mx-auto px-4 md:px-8 lg:px-16 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent animate-pulse">
                        Find Sports Clubs
                    </h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                        Discover and book the best sports venues in your city
                    </p>
                </div>

                {/* Location Status */}
                {selectedCity && (
                    <div className="flex items-center justify-center gap-2 mb-8 transition-all duration-300">
                        <MapPin className="w-5 h-5 text-orange-500" />
                        <span className="text-orange-400 font-medium">
                            Showing clubs in {selectedCity}
                        </span>
                        <button
                            onClick={() => setShowLocationModal(true)}
                            className="ml-4 text-orange-400 hover:text-orange-300 underline transition-colors duration-300"
                        >
                            Change Location
                        </button>
                    </div>
                )}

                {/* Not Available Message */}
                {!isLocationAvailable && !showLocationModal && (
                    <div className="text-center py-16">
                        <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-2xl p-8 max-w-md mx-auto transform transition-all duration-300 hover:scale-105">
                            <h3 className="text-2xl font-bold mb-4 text-red-400">
                                Service Not Available
                            </h3>
                            <p className="text-gray-300 mb-6">
                                We're not yet available in your selected location. We're expanding soon!
                            </p>
                            <button
                                onClick={() => setShowLocationModal(true)}
                                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                            >
                                Choose Different Location
                            </button>
                        </div>
                    </div>
                )}

                {/* Search and Filter Section */}
                {isLocationAvailable && (
                    <div className="mb-8">
                        <div className="bg-gradient-to-r from-[#1a2238] to-[#2a3448] rounded-2xl p-6 border border-orange-500/20 backdrop-blur-sm">
                            <div className="flex flex-col md:flex-row gap-4">
                                {/* Search Bar */}
                                <div className="relative flex-1">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors duration-300" />
                                    <input
                                        type="text"
                                        placeholder="Search clubs..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-[#0a1128] border border-orange-500/30 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-all duration-300 focus:ring-2 focus:ring-orange-500/20"
                                    />
                                </div>

                                {/* Sport Filter */}
                                <div className="relative">
                                    <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors duration-300" />
                                    <select
                                        value={selectedSport}
                                        onChange={(e) => setSelectedSport(e.target.value)}
                                        className="bg-[#0a1128] border border-orange-500/30 rounded-xl pl-12 pr-8 py-3 text-white focus:outline-none focus:border-orange-500 min-w-48 transition-all duration-300 focus:ring-2 focus:ring-orange-500/20"
                                    >
                                        {sportsCategories.map(sport => (
                                            <option key={sport} value={sport}>{sport}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Clubs Grid */}
                {isLocationAvailable && (
                    <div id="clubs-container" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {clubsToShow.map((club, index) => (
                            <div 
                                key={club.id} 
                                className="bg-gradient-to-br from-[#1a2238] to-[#2a3448] rounded-2xl overflow-hidden border border-orange-500/20 hover:border-orange-500/40 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-orange-500/10"
                                style={{
                                    animationDelay: `${index * 0.1}s`,
                                    animation: 'fadeInUp 0.6s ease-out forwards'
                                }}
                            >
                                <div className="h-48 bg-gradient-to-r from-orange-500/20 to-orange-600/20 flex items-center justify-center transition-all duration-300 hover:from-orange-500/30 hover:to-orange-600/30">
                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-orange-500/30 rounded-full flex items-center justify-center mx-auto mb-2 transition-all duration-300 hover:bg-orange-500/40">
                                            <span className="text-2xl">🏆</span>
                                        </div>
                                        <p className="text-gray-300">{club.sport}</p>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2 text-white">{club.name}</h3>

                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                            <span className="text-yellow-400 font-semibold">{club.rating}</span>
                                        </div>
                                        <span className="text-gray-400">•</span>
                                        <span className="text-orange-400 font-semibold">{club.price}</span>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {club.amenities.map(amenity => (
                                            <span key={amenity} className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-sm transition-all duration-300 hover:bg-orange-500/30">
                                                {amenity}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex gap-2">
                                        <button className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-2 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105">
                                            <Calendar className="w-4 h-4" />
                                            Book Now
                                        </button>
                                        <button 
                                            onClick={() => handleJoinClub(club)}
                                            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105"
                                        >
                                            <Users className="w-4 h-4" />
                                            Join Club
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Load More Button */}
                {isLocationAvailable && hasMoreClubs && (
                    <div className="text-center mt-8">
                        <button
                            onClick={loadMoreClubs}
                            disabled={isLoading}
                            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 px-8 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mx-auto"
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    Loading...
                                </>
                            ) : (
                                <>
                                    <ChevronDown className="w-5 h-5" />
                                    Load More Clubs
                                </>
                            )}
                        </button>
                        <p className="text-gray-400 mt-2">
                            Showing {clubsToShow.length} of {filteredClubs.length} clubs
                        </p>
                    </div>
                )}

                {/* No Results */}
                {isLocationAvailable && filteredClubs.length === 0 && (
                    <div className="text-center py-16">
                        <div className="bg-gradient-to-r from-[#1a2238] to-[#2a3448] rounded-2xl p-8 max-w-md mx-auto border border-orange-500/20 transform transition-all duration-300 hover:scale-105">
                            <h3 className="text-2xl font-bold mb-4 text-orange-400">
                                No Clubs Found
                            </h3>
                            <p className="text-gray-300 mb-6">
                                Try adjusting your search or filter criteria
                            </p>
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedSport('');
                                }}
                                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Join Club Modal */}
            {showJoinModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                    <div className="bg-gradient-to-br from-[#1a2238] to-[#0a1128] rounded-2xl max-w-md w-full border border-orange-500/20 transform transition-all duration-300 scale-100 opacity-100 max-h-[90vh] overflow-y-auto">
                        
                        {!isSubmitted ? (
                            <>
                                {/* Modal Header */}
                                <div className="flex items-center justify-between p-6 border-b border-orange-500/20">
                                    <button
                                        onClick={handleCloseJoinModal}
                                        className="text-gray-400 hover:text-white transition-colors duration-300"
                                    >
                                        <ArrowLeft className="w-6 h-6" />
                                    </button>
                                    <h2 className="text-xl font-bold text-white">Join {selectedClub?.name}</h2>
                                    <div className="w-6"></div>
                                </div>

                                {/* Modal Form */}
                                <form onSubmit={handleJoinFormSubmit} className="p-6 space-y-4">
                                    {/* Age */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-300">Age</label>
                                        <input
                                            type="number"
                                            required
                                            value={joinFormData.age}
                                            onChange={(e) => handleInputChange('age', e.target.value)}
                                            className="w-full bg-[#0a1128] border border-orange-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-all duration-300"
                                            placeholder="Enter your age"
                                        />
                                    </div>

                                    {/* Skills/Position */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-300">Skills / Position</label>
                                        <input
                                            type="text"
                                            required
                                            value={joinFormData.skills}
                                            onChange={(e) => handleInputChange('skills', e.target.value)}
                                            className="w-full bg-[#0a1128] border border-orange-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-all duration-300"
                                            placeholder="e.g., Goalkeeper, Batsman, etc."
                                        />
                                    </div>

                                    {/* Experience Level */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-300">Experience Level</label>
                                        <select
                                            value={joinFormData.experience}
                                            onChange={(e) => handleInputChange('experience', e.target.value)}
                                            className="w-full bg-[#0a1128] border border-orange-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-all duration-300"
                                        >
                                            <option value="Beginner">Beginner</option>
                                            <option value="Intermediate">Intermediate</option>
                                            <option value="Advanced">Advanced</option>
                                        </select>
                                    </div>

                                    {/* Past Clubs/Achievements */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-300">Past Clubs / Achievements</label>
                                        <textarea
                                            value={joinFormData.achievements}
                                            onChange={(e) => handleInputChange('achievements', e.target.value)}
                                            className="w-full bg-[#0a1128] border border-orange-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-all duration-300 resize-none"
                                            rows="3"
                                            placeholder="Tell us about your past clubs or achievements..."
                                        />
                                    </div>

                                    {/* File Upload */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-300">Upload Certificates / ID</label>
                                        <div className="relative">
                                            <input
                                                type="file"
                                                accept=".pdf,.jpg,.jpeg,.png"
                                                onChange={(e) => handleInputChange('certificate', e.target.files[0])}
                                                className="hidden"
                                                id="certificate-upload"
                                            />
                                            <label
                                                htmlFor="certificate-upload"
                                                className="w-full bg-[#0a1128] border border-orange-500/30 rounded-xl px-4 py-3 text-gray-400 cursor-pointer hover:border-orange-500 transition-all duration-300 flex items-center justify-center gap-2"
                                            >
                                                <Upload className="w-5 h-5" />
                                                {joinFormData.certificate ? joinFormData.certificate.name : 'Choose file...'}
                                            </label>
                                        </div>
                                    </div>

                                    {/* Payment Toggle */}
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            id="payment-toggle"
                                            checked={joinFormData.isPaid}
                                            onChange={(e) => handleInputChange('isPaid', e.target.checked)}
                                            className="w-5 h-5 text-orange-500 bg-[#0a1128] border-orange-500/30 rounded focus:ring-orange-500 focus:ring-2"
                                        />
                                        <label htmlFor="payment-toggle" className="text-gray-300">
                                            Payment completed
                                        </label>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={!joinFormData.isPaid}
                                        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:transform-none"
                                    >
                                        Submit Application
                                    </button>
                                </form>
                            </>
                        ) : (
                            /* Success Message */
                            <div className="p-8 text-center">
                                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Check className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-green-400 mb-2">Application Submitted!</h3>
                                <p className="text-gray-300 mb-6">
                                    ✅ You have applied successfully! Get more details via mail.
                                </p>
                                <button
                                    onClick={handleCloseJoinModal}
                                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                                >
                                    Close
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default SportifyClubSearch;