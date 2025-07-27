const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Ground = require("../models/ground-model"); // adjust the path if needed

dotenv.config();

const sampleGrounds=[
  {
    "name": "Mumbai Arena 1",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Mumbai+Arena+1",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Mumbai+Arena+1+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Mumbai+Arena+1+Photo+2"
    ],
    "sport": [
      "Football",
      "Cricket"
    ],
    "money_to_book": "INR 3500/hour",
    "timing": "Daily 7:00 AM - 10:00 PM",
    "how_old": 5,
    "contact": {
      "number": "+91 8765432109",
      "email": "book@mumbaiarena1.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaiarena1",
        "instagram": "https://instagram.com/mumbaiarena1",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Floodlit for night play, ample parking available."
  },
  {
    "name": "Mumbai Arena 2",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Mumbai+Arena+2",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Mumbai+Arena+2+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Mumbai+Arena+2+Photo+2",
      "https://placehold.co/600x400/CCCCCC/333333?text=Mumbai+Arena+2+Photo+3"
    ],
    "sport": [
      "Badminton",
      "Basketball"
    ],
    "money_to_book": "INR 1200/hour",
    "timing": "Daily 8:00 AM - 9:00 PM",
    "how_old": 3,
    "contact": {
      "number": "+91 9876543210",
      "email": "book@mumbaiarena2.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaiarena2",
        "instagram": "https://instagram.com/mumbaiarena2",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Professional coaching staff on-site, equipment rental."
  },
  {
    "name": "Mumbai Arena 3",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Mumbai+Arena+3",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Mumbai+Arena+3+Photo+1"
    ],
    "sport": [
      "Tennis"
    ],
    "money_to_book": "INR 2000/hour",
    "timing": "Daily 6:00 AM - 11:00 PM",
    "how_old": 8,
    "contact": {
      "number": "+91 7654321098",
      "email": "book@mumbaiarena3.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaiarena3",
        "instagram": "https://instagram.com/mumbaiarena3",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Cafeteria and changing rooms, accessible for all ages."
  },
  {
    "name": "Mumbai Arena 4",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Mumbai+Arena+4",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Mumbai+Arena+4+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Mumbai+Arena+4+Photo+2"
    ],
    "sport": [
      "Volleyball"
    ],
    "money_to_book": "INR 1000/hour",
    "timing": "Daily 9:00 AM - 8:00 PM",
    "how_old": 2,
    "contact": {
      "number": "+91 9123456789",
      "email": "book@mumbaiarena4.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaiarena4",
        "instagram": "https://instagram.com/mumbaiarena4",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Multi-sport complex with indoor and outdoor facilities."
  },
  {
    "name": "Mumbai Arena 5",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Mumbai+Arena+5",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Mumbai+Arena+5+Photo+1"
    ],
    "sport": [
      "Football"
    ],
    "money_to_book": "INR 4000/hour",
    "timing": "Daily 6:00 AM - 10:00 PM",
    "how_old": 6,
    "contact": {
      "number": "+91 8012345678",
      "email": "book@mumbaiarena5.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaiarena5",
        "instagram": "https://instagram.com/mumbaiarena5",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Turf ground, suitable for competitive matches."
  },
  {
    "name": "Mumbai Arena 6",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Mumbai+Arena+6",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Mumbai+Arena+6+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Mumbai+Arena+6+Photo+2"
    ],
    "sport": [
      "Cricket"
    ],
    "money_to_book": "INR 3000/hour",
    "timing": "Daily 7:00 AM - 9:00 PM",
    "how_old": 4,
    "contact": {
      "number": "+91 9012345678",
      "email": "book@mumbaiarena6.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaiarena6",
        "instagram": "https://instagram.com/mumbaiarena6",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Floodlit for night play, ample parking available."
  },
  {
    "name": "Mumbai Arena 7",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Mumbai+Arena+7",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Mumbai+Arena+7+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Mumbai+Arena+7+Photo+2",
      "https://placehold.co/600x400/CCCCCC/333333?text=Mumbai+Arena+7+Photo+3"
    ],
    "sport": [
      "Badminton"
    ],
    "money_to_book": "INR 1500/hour",
    "timing": "Daily 8:00 AM - 11:00 PM",
    "how_old": 7,
    "contact": {
      "number": "+91 7890123456",
      "email": "book@mumbaiarena7.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaiarena7",
        "instagram": "https://instagram.com/mumbaiarena7",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Professional coaching staff on-site, equipment rental."
  },
  {
    "name": "Mumbai Arena 8",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Mumbai+Arena+8",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Mumbai+Arena+8+Photo+1"
    ],
    "sport": [
      "Basketball"
    ],
    "money_to_book": "INR 1800/hour",
    "timing": "Daily 9:00 AM - 10:00 PM",
    "how_old": 1,
    "contact": {
      "number": "+91 9988776655",
      "email": "book@mumbaiarena8.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaiarena8",
        "instagram": "https://instagram.com/mumbaiarena8",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Cafeteria and changing rooms, accessible for all ages."
  },
  {
    "name": "Mumbai Arena 9",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Mumbai+Arena+9",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Mumbai+Arena+9+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Mumbai+Arena+9+Photo+2"
    ],
    "sport": [
      "Tennis"
    ],
    "money_to_book": "INR 2500/hour",
    "timing": "Daily 6:00 AM - 9:00 PM",
    "how_old": 10,
    "contact": {
      "number": "+91 7766554433",
      "email": "book@mumbaiarena9.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaiarena9",
        "instagram": "https://instagram.com/mumbaiarena9",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Turf ground, suitable for competitive matches."
  },
  {
    "name": "Mumbai Arena 10",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Mumbai+Arena+10",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Mumbai+Arena+10+Photo+1"
    ],
    "sport": [
      "Volleyball"
    ],
    "money_to_book": "INR 900/hour",
    "timing": "Daily 10:00 AM - 7:00 PM",
    "how_old": 3,
    "contact": {
      "number": "+91 8877665544",
      "email": "book@mumbaiarena10.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaiarena10",
        "instagram": "https://instagram.com/mumbaiarena10",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Multi-sport complex with indoor and outdoor facilities."
  },
  {
    "name": "Mumbai Arena 11",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Mumbai+Arena+11",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Mumbai+Arena+11+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Mumbai+Arena+11+Photo+2"
    ],
    "sport": [
      "Football"
    ],
    "money_to_book": "INR 3800/hour",
    "timing": "Daily 7:00 AM - 10:00 PM",
    "how_old": 4,
    "contact": {
      "number": "+91 9765432109",
      "email": "book@mumbaiarena11.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaiarena11",
        "instagram": "https://instagram.com/mumbaiarena11",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Floodlit for night play, ample parking available."
  },
  {
    "name": "Mumbai Arena 12",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Mumbai+Arena+12",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Mumbai+Arena+12+Photo+1"
    ],
    "sport": [
      "Cricket"
    ],
    "money_to_book": "INR 3200/hour",
    "timing": "Daily 8:00 AM - 9:00 PM",
    "how_old": 6,
    "contact": {
      "number": "+91 8976543210",
      "email": "book@mumbaiarena12.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaiarena12",
        "instagram": "https://instagram.com/mumbaiarena12",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Professional coaching staff on-site, equipment rental."
  },
  {
    "name": "Mumbai Arena 13",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Mumbai+Arena+13",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Mumbai+Arena+13+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Mumbai+Arena+13+Photo+2"
    ],
    "sport": [
      "Badminton"
    ],
    "money_to_book": "INR 1300/hour",
    "timing": "Daily 6:00 AM - 11:00 PM",
    "how_old": 2,
    "contact": {
      "number": "+91 7654321090",
      "email": "book@mumbaiarena13.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaiarena13",
        "instagram": "https://instagram.com/mumbaiarena13",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Cafeteria and changing rooms, accessible for all ages."
  },
  {
    "name": "Mumbai Arena 14",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Mumbai+Arena+14",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Mumbai+Arena+14+Photo+1"
    ],
    "sport": [
      "Basketball"
    ],
    "money_to_book": "INR 1600/hour",
    "timing": "Daily 9:00 AM - 8:00 PM",
    "how_old": 9,
    "contact": {
      "number": "+91 9123456780",
      "email": "book@mumbaiarena14.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaiarena14",
        "instagram": "https://instagram.com/mumbaiarena14",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Multi-sport complex with indoor and outdoor facilities."
  },
  {
    "name": "Mumbai Arena 15",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Mumbai+Arena+15",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Mumbai+Arena+15+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Mumbai+Arena+15+Photo+2"
    ],
    "sport": [
      "Tennis"
    ],
    "money_to_book": "INR 2200/hour",
    "timing": "Daily 10:00 AM - 7:00 PM",
    "how_old": 5,
    "contact": {
      "number": "+91 8012345670",
      "email": "book@mumbaiarena15.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaiarena15",
        "instagram": "https://instagram.com/mumbaiarena15",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Turf ground, suitable for competitive matches."
  },
  {
    "name": "Mumbai Arena 16",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Mumbai+Arena+16",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Mumbai+Arena+16+Photo+1"
    ],
    "sport": [
      "Volleyball"
    ],
    "money_to_book": "INR 1100/hour",
    "timing": "Daily 6:00 AM - 10:00 PM",
    "how_old": 3,
    "contact": {
      "number": "+91 9012345670",
      "email": "book@mumbaiarena16.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaiarena16",
        "instagram": "https://instagram.com/mumbaiarena16",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Floodlit for night play, ample parking available."
  },
  {
    "name": "Mumbai Arena 17",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Mumbai+Arena+17",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Mumbai+Arena+17+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Mumbai+Arena+17+Photo+2"
    ],
    "sport": [
      "Football"
    ],
    "money_to_book": "INR 3600/hour",
    "timing": "Daily 7:00 AM - 9:00 PM",
    "how_old": 8,
    "contact": {
      "number": "+91 7890123450",
      "email": "book@mumbaiarena17.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaiarena17",
        "instagram": "https://instagram.com/mumbaiarena17",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Professional coaching staff on-site, equipment rental."
  },
  {
    "name": "Mumbai Arena 18",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Mumbai+Arena+18",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Mumbai+Arena+18+Photo+1"
    ],
    "sport": [
      "Cricket"
    ],
    "money_to_book": "INR 2900/hour",
    "timing": "Daily 8:00 AM - 11:00 PM",
    "how_old": 1,
    "contact": {
      "number": "+91 9988776650",
      "email": "book@mumbaiarena18.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaiarena18",
        "instagram": "https://instagram.com/mumbaiarena18",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Cafeteria and changing rooms, accessible for all ages."
  },
  {
    "name": "Mumbai Arena 19",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Mumbai+Arena+19",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Mumbai+Arena+19+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Mumbai+Arena+19+Photo+2"
    ],
    "sport": [
      "Badminton"
    ],
    "money_to_book": "INR 1400/hour",
    "timing": "Daily 9:00 AM - 10:00 PM",
    "how_old": 11,
    "contact": {
      "number": "+91 7766554430",
      "email": "book@mumbaiarena19.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaiarena19",
        "instagram": "https://instagram.com/mumbaiarena19",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Turf ground, suitable for competitive matches."
  },
  {
    "name": "Mumbai Arena 20",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Mumbai+Arena+20",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Mumbai+Arena+20+Photo+1"
    ],
    "sport": [
      "Basketball"
    ],
    "money_to_book": "INR 1700/hour",
    "timing": "Daily 10:00 AM - 7:00 PM",
    "how_old": 4,
    "contact": {
      "number": "+91 8877665540",
      "email": "book@mumbaiarena20.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaiarena20",
        "instagram": "https://instagram.com/mumbaiarena20",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Multi-sport complex with indoor and outdoor facilities."
  },
  {
    "name": "Mumbai Arena 21",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Mumbai+Arena+21",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Mumbai+Arena+21+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Mumbai+Arena+21+Photo+2"
    ],
    "sport": [
      "Tennis"
    ],
    "money_to_book": "INR 2400/hour",
    "timing": "Daily 6:00 AM - 10:00 PM",
    "how_old": 6,
    "contact": {
      "number": "+91 9765432100",
      "email": "book@mumbaiarena21.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaiarena21",
        "instagram": "https://instagram.com/mumbaiarena21",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Floodlit for night play, ample parking available."
  },
  {
    "name": "Mumbai Arena 22",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Mumbai+Arena+22",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Mumbai+Arena+22+Photo+1"
    ],
    "sport": [
      "Volleyball"
    ],
    "money_to_book": "INR 1000/hour",
    "timing": "Daily 7:00 AM - 9:00 PM",
    "how_old": 2,
    "contact": {
      "number": "+91 8976543210",
      "email": "book@mumbaiarena22.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaiarena22",
        "instagram": "https://instagram.com/mumbaiarena22",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Professional coaching staff on-site, equipment rental."
  },
  {
    "name": "Mumbai Arena 23",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Mumbai+Arena+23",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Mumbai+Arena+23+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Mumbai+Arena+23+Photo+2"
    ],
    "sport": [
      "Football"
    ],
    "money_to_book": "INR 3700/hour",
    "timing": "Daily 8:00 AM - 11:00 PM",
    "how_old": 7,
    "contact": {
      "number": "+91 7654321000",
      "email": "book@mumbaiarena23.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaiarena23",
        "instagram": "https://instagram.com/mumbaiarena23",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Cafeteria and changing rooms, accessible for all ages."
  },
  {
    "name": "Mumbai Arena 24",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Mumbai+Arena+24",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Mumbai+Arena+24+Photo+1"
    ],
    "sport": [
      "Cricket"
    ],
    "money_to_book": "INR 3100/hour",
    "timing": "Daily 9:00 AM - 10:00 PM",
    "how_old": 3,
    "contact": {
      "number": "+91 9123456700",
      "email": "book@mumbaiarena24.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaiarena24",
        "instagram": "https://instagram.com/mumbaiarena24",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Turf ground, suitable for competitive matches."
  },
  {
    "name": "Mumbai Arena 25",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Mumbai+Arena+25",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Mumbai+Arena+25+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Mumbai+Arena+25+Photo+2"
    ],
    "sport": [
      "Badminton"
    ],
    "money_to_book": "INR 1250/hour",
    "timing": "Daily 10:00 AM - 7:00 PM",
    "how_old": 5,
    "contact": {
      "number": "+91 8012345600",
      "email": "book@mumbaiarena25.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaiarena25",
        "instagram": "https://instagram.com/mumbaiarena25",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Multi-sport complex with indoor and outdoor facilities."
  },
  {
    "name": "Pune Arena 1",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Pune+Arena+1",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Pune+Arena+1+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Pune+Arena+1+Photo+2"
    ],
    "sport": [
      "Football",
      "Badminton"
    ],
    "money_to_book": "INR 2800/hour",
    "timing": "Daily 6:00 AM - 10:00 PM",
    "how_old": 4,
    "contact": {
      "number": "+91 9876543211",
      "email": "book@punearana1.com",
      "social_media": {
        "facebook": "https://facebook.com/punearana1",
        "instagram": "https://instagram.com/punearana1",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Floodlit for night play, ample parking available."
  },
  {
    "name": "Pune Arena 2",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Pune+Arena+2",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Pune+Arena+2+Photo+1"
    ],
    "sport": [
      "Cricket"
    ],
    "money_to_book": "INR 2500/hour",
    "timing": "Daily 7:00 AM - 9:00 PM",
    "how_old": 7,
    "contact": {
      "number": "+91 7654321091",
      "email": "book@punearana2.com",
      "social_media": {
        "facebook": "https://facebook.com/punearana2",
        "instagram": "https://instagram.com/punearana2",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Professional coaching staff on-site, equipment rental."
  },
  {
    "name": "Pune Arena 3",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Pune+Arena+3",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Pune+Arena+3+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Pune+Arena+3+Photo+2"
    ],
    "sport": [
      "Tennis"
    ],
    "money_to_book": "INR 1800/hour",
    "timing": "Daily 8:00 AM - 11:00 PM",
    "how_old": 2,
    "contact": {
      "number": "+91 9123456781",
      "email": "book@punearana3.com",
      "social_media": {
        "facebook": "https://facebook.com/punearana3",
        "instagram": "https://instagram.com/punearana3",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Cafeteria and changing rooms, accessible for all ages."
  },
  {
    "name": "Pune Arena 4",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Pune+Arena+4",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Pune+Arena+4+Photo+1"
    ],
    "sport": [
      "Basketball"
    ],
    "money_to_book": "INR 1500/hour",
    "timing": "Daily 9:00 AM - 8:00 PM",
    "how_old": 5,
    "contact": {
      "number": "+91 8012345671",
      "email": "book@punearana4.com",
      "social_media": {
        "facebook": "https://facebook.com/punearana4",
        "instagram": "https://instagram.com/punearana4",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Multi-sport complex with indoor and outdoor facilities."
  },
  {
    "name": "Pune Arena 5",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Pune+Arena+5",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Pune+Arena+5+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Pune+Arena+5+Photo+2"
    ],
    "sport": [
      "Volleyball"
    ],
    "money_to_book": "INR 800/hour",
    "timing": "Daily 10:00 AM - 7:00 PM",
    "how_old": 1,
    "contact": {
      "number": "+91 9012345671",
      "email": "book@punearana5.com",
      "social_media": {
        "facebook": "https://facebook.com/punearana5",
        "instagram": "https://instagram.com/punearana5",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Turf ground, suitable for competitive matches."
  },
  {
    "name": "Pune Arena 6",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Pune+Arena+6",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Pune+Arena+6+Photo+1"
    ],
    "sport": [
      "Football"
    ],
    "money_to_book": "INR 2900/hour",
    "timing": "Daily 6:00 AM - 10:00 PM",
    "how_old": 6,
    "contact": {
      "number": "+91 7890123451",
      "email": "book@punearana6.com",
      "social_media": {
        "facebook": "https://facebook.com/punearana6",
        "instagram": "https://instagram.com/punearana6",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Floodlit for night play, ample parking available."
  },
  {
    "name": "Pune Arena 7",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Pune+Arena+7",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Pune+Arena+7+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Pune+Arena+7+Photo+2"
    ],
    "sport": [
      "Badminton"
    ],
    "money_to_book": "INR 1100/hour",
    "timing": "Daily 7:00 AM - 9:00 PM",
    "how_old": 3,
    "contact": {
      "number": "+91 9988776651",
      "email": "book@punearana7.com",
      "social_media": {
        "facebook": "https://facebook.com/punearana7",
        "instagram": "https://instagram.com/punearana7",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Professional coaching staff on-site, equipment rental."
  },
  {
    "name": "Pune Arena 8",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Pune+Arena+8",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Pune+Arena+8+Photo+1"
    ],
    "sport": [
      "Cricket"
    ],
    "money_to_book": "INR 2600/hour",
    "timing": "Daily 8:00 AM - 11:00 PM",
    "how_old": 9,
    "contact": {
      "number": "+91 7766554431",
      "email": "book@punearana8.com",
      "social_media": {
        "facebook": "https://facebook.com/punearana8",
        "instagram": "https://instagram.com/punearana8",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Cafeteria and changing rooms, accessible for all ages."
  },
  {
    "name": "Pune Arena 9",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Pune+Arena+9",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Pune+Arena+9+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Pune+Arena+9+Photo+2"
    ],
    "sport": [
      "Tennis"
    ],
    "money_to_book": "INR 1900/hour",
    "timing": "Daily 9:00 AM - 8:00 PM",
    "how_old": 4,
    "contact": {
      "number": "+91 8877665541",
      "email": "book@punearana9.com",
      "social_media": {
        "facebook": "https://facebook.com/punearana9",
        "instagram": "https://instagram.com/punearana9",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Multi-sport complex with indoor and outdoor facilities."
  },
  {
    "name": "Pune Arena 10",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Pune+Arena+10",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Pune+Arena+10+Photo+1"
    ],
    "sport": [
      "Basketball"
    ],
    "money_to_book": "INR 1600/hour",
    "timing": "Daily 10:00 AM - 7:00 PM",
    "how_old": 6,
    "contact": {
      "number": "+91 9765432101",
      "email": "book@punearana10.com",
      "social_media": {
        "facebook": "https://facebook.com/punearana10",
        "instagram": "https://instagram.com/punearana10",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Turf ground, suitable for competitive matches."
  },
  {
    "name": "Pune Arena 11",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Pune+Arena+11",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Pune+Arena+11+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Pune+Arena+11+Photo+2"
    ],
    "sport": [
      "Volleyball"
    ],
    "money_to_book": "INR 900/hour",
    "timing": "Daily 6:00 AM - 10:00 PM",
    "how_old": 2,
    "contact": {
      "number": "+91 8976543211",
      "email": "book@punearana11.com",
      "social_media": {
        "facebook": "https://facebook.com/punearana11",
        "instagram": "https://instagram.com/punearana11",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Floodlit for night play, ample parking available."
  },
  {
    "name": "Pune Arena 12",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Pune+Arena+12",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Pune+Arena+12+Photo+1"
    ],
    "sport": [
      "Football"
    ],
    "money_to_book": "INR 3000/hour",
    "timing": "Daily 7:00 AM - 9:00 PM",
    "how_old": 8,
    "contact": {
      "number": "+91 7654321001",
      "email": "book@punearana12.com",
      "social_media": {
        "facebook": "https://facebook.com/punearana12",
        "instagram": "https://instagram.com/punearana12",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Professional coaching staff on-site, equipment rental."
  },
  {
    "name": "Pune Arena 13",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Pune+Arena+13",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Pune+Arena+13+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Pune+Arena+13+Photo+2"
    ],
    "sport": [
      "Cricket"
    ],
    "money_to_book": "INR 2700/hour",
    "timing": "Daily 8:00 AM - 11:00 PM",
    "how_old": 1,
    "contact": {
      "number": "+91 9123456701",
      "email": "book@punearana13.com",
      "social_media": {
        "facebook": "https://facebook.com/punearana13",
        "instagram": "https://instagram.com/punearana13",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Cafeteria and changing rooms, accessible for all ages."
  },
  {
    "name": "Pune Arena 14",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Pune+Arena+14",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Pune+Arena+14+Photo+1"
    ],
    "sport": [
      "Badminton"
    ],
    "money_to_book": "INR 1200/hour",
    "timing": "Daily 9:00 AM - 8:00 PM",
    "how_old": 10,
    "contact": {
      "number": "+91 8012345601",
      "email": "book@punearana14.com",
      "social_media": {
        "facebook": "https://facebook.com/punearana14",
        "instagram": "https://instagram.com/punearana14",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Multi-sport complex with indoor and outdoor facilities."
  },
  {
    "name": "Pune Arena 15",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Pune+Arena+15",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Pune+Arena+15+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Pune+Arena+15+Photo+2"
    ],
    "sport": [
      "Tennis"
    ],
    "money_to_book": "INR 2000/hour",
    "timing": "Daily 10:00 AM - 7:00 PM",
    "how_old": 5,
    "contact": {
      "number": "+91 9012345601",
      "email": "book@punearana15.com",
      "social_media": {
        "facebook": "https://facebook.com/punearana15",
        "instagram": "https://instagram.com/punearana15",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Turf ground, suitable for competitive matches."
  },
  {
    "name": "Pune Arena 16",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Pune+Arena+16",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Pune+Arena+16+Photo+1"
    ],
    "sport": [
      "Basketball"
    ],
    "money_to_book": "INR 1700/hour",
    "timing": "Daily 6:00 AM - 10:00 PM",
    "how_old": 3,
    "contact": {
      "number": "+91 7890123450",
      "email": "book@punearana16.com",
      "social_media": {
        "facebook": "https://facebook.com/punearana16",
        "instagram": "https://instagram.com/punearana16",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Floodlit for night play, ample parking available."
  },
  {
    "name": "Pune Arena 17",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Pune+Arena+17",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Pune+Arena+17+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Pune+Arena+17+Photo+2"
    ],
    "sport": [
      "Volleyball"
    ],
    "money_to_book": "INR 1000/hour",
    "timing": "Daily 7:00 AM - 9:00 PM",
    "how_old": 8,
    "contact": {
      "number": "+91 9988776650",
      "email": "book@punearana17.com",
      "social_media": {
        "facebook": "https://facebook.com/punearana17",
        "instagram": "https://instagram.com/punearana17",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Professional coaching staff on-site, equipment rental."
  },
  {
    "name": "Pune Arena 18",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Pune+Arena+18",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Pune+Arena+18+Photo+1"
    ],
    "sport": [
      "Football"
    ],
    "money_to_book": "INR 2800/hour",
    "timing": "Daily 8:00 AM - 11:00 PM",
    "how_old": 1,
    "contact": {
      "number": "+91 7766554430",
      "email": "book@punearana18.com",
      "social_media": {
        "facebook": "https://facebook.com/punearana18",
        "instagram": "https://instagram.com/punearana18",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Cafeteria and changing rooms, accessible for all ages."
  },
  {
    "name": "Pune Arena 19",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Pune+Arena+19",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Pune+Arena+19+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Pune+Arena+19+Photo+2"
    ],
    "sport": [
      "Cricket"
    ],
    "money_to_book": "INR 2500/hour",
    "timing": "Daily 9:00 AM - 10:00 PM",
    "how_old": 11,
    "contact": {
      "number": "+91 8877665540",
      "email": "book@punearana19.com",
      "social_media": {
        "facebook": "https://facebook.com/punearana19",
        "instagram": "https://instagram.com/punearana19",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Turf ground, suitable for competitive matches."
  },
  {
    "name": "Pune Arena 20",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Pune+Arena+20",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Pune+Arena+20+Photo+1"
    ],
    "sport": [
      "Badminton"
    ],
    "money_to_book": "INR 1300/hour",
    "timing": "Daily 10:00 AM - 7:00 PM",
    "how_old": 4,
    "contact": {
      "number": "+91 9765432100",
      "email": "book@punearana20.com",
      "social_media": {
        "facebook": "https://facebook.com/punearana20",
        "instagram": "https://instagram.com/punearana20",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Multi-sport complex with indoor and outdoor facilities."
  },
  {
    "name": "Pune Arena 21",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Pune+Arena+21",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Pune+Arena+21+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Pune+Arena+21+Photo+2"
    ],
    "sport": [
      "Tennis"
    ],
    "money_to_book": "INR 1950/hour",
    "timing": "Daily 6:00 AM - 10:00 PM",
    "how_old": 6,
    "contact": {
      "number": "+91 8976543210",
      "email": "book@punearana21.com",
      "social_media": {
        "facebook": "https://facebook.com/punearana21",
        "instagram": "https://instagram.com/punearana21",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Floodlit for night play, ample parking available."
  },
  {
    "name": "Pune Arena 22",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Pune+Arena+22",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Pune+Arena+22+Photo+1"
    ],
    "sport": [
      "Basketball"
    ],
    "money_to_book": "INR 1650/hour",
    "timing": "Daily 7:00 AM - 9:00 PM",
    "how_old": 2,
    "contact": {
      "number": "+91 7654321000",
      "email": "book@punearana22.com",
      "social_media": {
        "facebook": "https://facebook.com/punearana22",
        "instagram": "https://instagram.com/punearana22",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Professional coaching staff on-site, equipment rental."
  },
  {
    "name": "Pune Arena 23",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Pune+Arena+23",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Pune+Arena+23+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Pune+Arena+23+Photo+2"
    ],
    "sport": [
      "Volleyball"
    ],
    "money_to_book": "INR 850/hour",
    "timing": "Daily 8:00 AM - 11:00 PM",
    "how_old": 7,
    "contact": {
      "number": "+91 9123456700",
      "email": "book@punearana23.com",
      "social_media": {
        "facebook": "https://facebook.com/punearana23",
        "instagram": "https://instagram.com/punearana23",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Cafeteria and changing rooms, accessible for all ages."
  },
  {
    "name": "Pune Arena 24",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Pune+Arena+24",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Pune+Arena+24+Photo+1"
    ],
    "sport": [
      "Football"
    ],
    "money_to_book": "INR 2950/hour",
    "timing": "Daily 9:00 AM - 10:00 PM",
    "how_old": 3,
    "contact": {
      "number": "+91 8012345600",
      "email": "book@punearana24.com",
      "social_media": {
        "facebook": "https://facebook.com/punearana24",
        "instagram": "https://instagram.com/punearana24",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Turf ground, suitable for competitive matches."
  },
  {
    "name": "Pune Arena 25",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Pune+Arena+25",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Pune+Arena+25+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Pune+Arena+25+Photo+2"
    ],
    "sport": [
      "Cricket"
    ],
    "money_to_book": "INR 2650/hour",
    "timing": "Daily 10:00 AM - 7:00 PM",
    "how_old": 5,
    "contact": {
      "number": "+91 9012345600",
      "email": "book@punearana25.com",
      "social_media": {
        "facebook": "https://facebook.com/punearana25",
        "instagram": "https://instagram.com/punearana25",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Multi-sport complex with indoor and outdoor facilities."
  },
  {
    "name": "Nagpur Arena 1",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Nagpur+Arena+1",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Nagpur+Arena+1+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Nagpur+Arena+1+Photo+2"
    ],
    "sport": [
      "Football"
    ],
    "money_to_book": "INR 1500/hour",
    "timing": "Daily 7:00 AM - 9:00 PM",
    "how_old": 3,
    "contact": {
      "number": "+91 8765432100",
      "email": "book@nagpurarena1.com",
      "social_media": {
        "facebook": "https://facebook.com/nagpurarena1",
        "instagram": "https://instagram.com/nagpurarena1",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Floodlit for night play, ample parking available."
  },
  {
    "name": "Nagpur Arena 2",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Nagpur+Arena+2",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Nagpur+Arena+2+Photo+1"
    ],
    "sport": [
      "Cricket"
    ],
    "money_to_book": "INR 1800/hour",
    "timing": "Daily 8:00 AM - 10:00 PM",
    "how_old": 5,
    "contact": {
      "number": "+91 9876543210",
      "email": "book@nagpurarena2.com",
      "social_media": {
        "facebook": "https://facebook.com/nagpurarena2",
        "instagram": "https://instagram.com/nagpurarena2",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Professional coaching staff on-site, equipment rental."
  },
  {
    "name": "Nagpur Arena 3",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Nagpur+Arena+3",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Nagpur+Arena+3+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Nagpur+Arena+3+Photo+2"
    ],
    "sport": [
      "Badminton"
    ],
    "money_to_book": "INR 700/hour",
    "timing": "Daily 6:00 AM - 11:00 PM",
    "how_old": 2,
    "contact": {
      "number": "+91 7654321090",
      "email": "book@nagpurarena3.com",
      "social_media": {
        "facebook": "https://facebook.com/nagpurarena3",
        "instagram": "https://instagram.com/nagpurarena3",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Cafeteria and changing rooms, accessible for all ages."
  },
  {
    "name": "Nagpur Arena 4",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Nagpur+Arena+4",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Nagpur+Arena+4+Photo+1"
    ],
    "sport": [
      "Tennis"
    ],
    "money_to_book": "INR 1200/hour",
    "timing": "Daily 9:00 AM - 8:00 PM",
    "how_old": 4,
    "contact": {
      "number": "+91 9123456780",
      "email": "book@nagpurarena4.com",
      "social_media": {
        "facebook": "https://facebook.com/nagpurarena4",
        "instagram": "https://instagram.com/nagpurarena4",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Multi-sport complex with indoor and outdoor facilities."
  },
  {
    "name": "Nagpur Arena 5",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Nagpur+Arena+5",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Nagpur+Arena+5+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Nagpur+Arena+5+Photo+2"
    ],
    "sport": [
      "Basketball"
    ],
    "money_to_book": "INR 900/hour",
    "timing": "Daily 10:00 AM - 7:00 PM",
    "how_old": 1,
    "contact": {
      "number": "+91 8012345670",
      "email": "book@nagpurarena5.com",
      "social_media": {
        "facebook": "https://facebook.com/nagpurarena5",
        "instagram": "https://instagram.com/nagpurarena5",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Turf ground, suitable for competitive matches."
  },
  {
    "name": "Nagpur Arena 6",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Nagpur+Arena+6",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Nagpur+Arena+6+Photo+1"
    ],
    "sport": [
      "Volleyball"
    ],
    "money_to_book": "INR 600/hour",
    "timing": "Daily 6:00 AM - 10:00 PM",
    "how_old": 6,
    "contact": {
      "number": "+91 9012345670",
      "email": "book@nagpurarena6.com",
      "social_media": {
        "facebook": "https://facebook.com/nagpurarena6",
        "instagram": "https://instagram.com/nagpurarena6",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Floodlit for night play, ample parking available."
  },
  {
    "name": "Nagpur Arena 7",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Nagpur+Arena+7",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Nagpur+Arena+7+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Nagpur+Arena+7+Photo+2"
    ],
    "sport": [
      "Football"
    ],
    "money_to_book": "INR 1600/hour",
    "timing": "Daily 7:00 AM - 9:00 PM",
    "how_old": 3,
    "contact": {
      "number": "+91 7890123450",
      "email": "book@nagpurarena7.com",
      "social_media": {
        "facebook": "https://facebook.com/nagpurarena7",
        "instagram": "https://instagram.com/nagpurarena7",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Professional coaching staff on-site, equipment rental."
  },
  {
    "name": "Nagpur Arena 8",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Nagpur+Arena+8",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Nagpur+Arena+8+Photo+1"
    ],
    "sport": [
      "Cricket"
    ],
    "money_to_book": "INR 1900/hour",
    "timing": "Daily 8:00 AM - 11:00 PM",
    "how_old": 8,
    "contact": {
      "number": "+91 9988776650",
      "email": "book@nagpurarena8.com",
      "social_media": {
        "facebook": "https://facebook.com/nagpurarena8",
        "instagram": "https://instagram.com/nagpurarena8",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Cafeteria and changing rooms, accessible for all ages."
  },
  {
    "name": "Nagpur Arena 9",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Nagpur+Arena+9",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Nagpur+Arena+9+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Nagpur+Arena+9+Photo+2"
    ],
    "sport": [
      "Badminton"
    ],
    "money_to_book": "INR 750/hour",
    "timing": "Daily 9:00 AM - 10:00 PM",
    "how_old": 2,
    "contact": {
      "number": "+91 7766554430",
      "email": "book@nagpurarena9.com",
      "social_media": {
        "facebook": "https://facebook.com/nagpurarena9",
        "instagram": "https://instagram.com/nagpurarena9",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Turf ground, suitable for competitive matches."
  },
  {
    "name": "Nagpur Arena 10",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Nagpur+Arena+10",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Nagpur+Arena+10+Photo+1"
    ],
    "sport": [
      "Tennis"
    ],
    "money_to_book": "INR 1300/hour",
    "timing": "Daily 10:00 AM - 7:00 PM",
    "how_old": 5,
    "contact": {
      "number": "+91 8877665540",
      "email": "book@nagpurarena10.com",
      "social_media": {
        "facebook": "https://facebook.com/nagpurarena10",
        "instagram": "https://instagram.com/nagpurarena10",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Multi-sport complex with indoor and outdoor facilities."
  },
  {
    "name": "Nashik Arena 1",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Nashik+Arena+1",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Nashik+Arena+1+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Nashik+Arena+1+Photo+2"
    ],
    "sport": [
      "Football"
    ],
    "money_to_book": "INR 1200/hour",
    "timing": "Daily 7:00 AM - 9:00 PM",
    "how_old": 2,
    "contact": {
      "number": "+91 8765432101",
      "email": "book@nashikarena1.com",
      "social_media": {
        "facebook": "https://facebook.com/nashikarena1",
        "instagram": "https://instagram.com/nashikarena1",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Floodlit for night play, ample parking available."
  },
  {
    "name": "Nashik Arena 2",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Nashik+Arena+2",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Nashik+Arena+2+Photo+1"
    ],
    "sport": [
      "Cricket"
    ],
    "money_to_book": "INR 1500/hour",
    "timing": "Daily 8:00 AM - 10:00 PM",
    "how_old": 4,
    "contact": {
      "number": "+91 9876543211",
      "email": "book@nashikarena2.com",
      "social_media": {
        "facebook": "https://facebook.com/nashikarena2",
        "instagram": "https://instagram.com/nashikarena2",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Professional coaching staff on-site, equipment rental."
  },
  {
    "name": "Nashik Arena 3",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Nashik+Arena+3",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Nashik+Arena+3+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Nashik+Arena+3+Photo+2"
    ],
    "sport": [
      "Badminton"
    ],
    "money_to_book": "INR 600/hour",
    "timing": "Daily 6:00 AM - 11:00 PM",
    "how_old": 1,
    "contact": {
      "number": "+91 7654321091",
      "email": "book@nashikarena3.com",
      "social_media": {
        "facebook": "https://facebook.com/nashikarena3",
        "instagram": "https://instagram.com/nashikarena3",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Cafeteria and changing rooms, accessible for all ages."
  },
  {
    "name": "Nashik Arena 4",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Nashik+Arena+4",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Nashik+Arena+4+Photo+1"
    ],
    "sport": [
      "Tennis"
    ],
    "money_to_book": "INR 1000/hour",
    "timing": "Daily 9:00 AM - 8:00 PM",
    "how_old": 3,
    "contact": {
      "number": "+91 9123456781",
      "email": "book@nashikarena4.com",
      "social_media": {
        "facebook": "https://facebook.com/nashikarena4",
        "instagram": "https://instagram.com/nashikarena4",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Multi-sport complex with indoor and outdoor facilities."
  },
  {
    "name": "Nashik Arena 5",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Nashik+Arena+5",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Nashik+Arena+5+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Nashik+Arena+5+Photo+2"
    ],
    "sport": [
      "Basketball"
    ],
    "money_to_book": "INR 800/hour",
    "timing": "Daily 10:00 AM - 7:00 PM",
    "how_old": 6,
    "contact": {
      "number": "+91 8012345671",
      "email": "book@nashikarena5.com",
      "social_media": {
        "facebook": "https://facebook.com/nashikarena5",
        "instagram": "https://instagram.com/nashikarena5",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Turf ground, suitable for competitive matches."
  },
  {
    "name": "Aurangabad Arena 1",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Aurangabad+Arena+1",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Aurangabad+Arena+1+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Aurangabad+Arena+1+Photo+2"
    ],
    "sport": [
      "Football"
    ],
    "money_to_book": "INR 1000/hour",
    "timing": "Daily 7:00 AM - 9:00 PM",
    "how_old": 4,
    "contact": {
      "number": "+91 8765432102",
      "email": "book@aurangabadarena1.com",
      "social_media": {
        "facebook": "https://facebook.com/aurangabadarena1",
        "instagram": "https://instagram.com/aurangabadarena1",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Floodlit for night play, ample parking available."
  },
  {
    "name": "Aurangabad Arena 2",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Aurangabad+Arena+2",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Aurangabad+Arena+2+Photo+1"
    ],
    "sport": [
      "Cricket"
    ],
    "money_to_book": "INR 1300/hour",
    "timing": "Daily 8:00 AM - 10:00 PM",
    "how_old": 6,
    "contact": {
      "number": "+91 9876543212",
      "email": "book@aurangabadarena2.com",
      "social_media": {
        "facebook": "https://facebook.com/aurangabadarena2",
        "instagram": "https://instagram.com/aurangabadarena2",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Professional coaching staff on-site, equipment rental."
  },
  {
    "name": "Aurangabad Arena 3",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Aurangabad+Arena+3",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Aurangabad+Arena+3+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Aurangabad+Arena+3+Photo+2"
    ],
    "sport": [
      "Badminton"
    ],
    "money_to_book": "INR 500/hour",
    "timing": "Daily 6:00 AM - 11:00 PM",
    "how_old": 3,
    "contact": {
      "number": "+91 7654321092",
      "email": "book@aurangabadarena3.com",
      "social_media": {
        "facebook": "https://facebook.com/aurangabadarena3",
        "instagram": "https://instagram.com/aurangabadarena3",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Cafeteria and changing rooms, accessible for all ages."
  },
  {
    "name": "Aurangabad Arena 4",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Aurangabad+Arena+4",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Aurangabad+Arena+4+Photo+1"
    ],
    "sport": [
      "Tennis"
    ],
    "money_to_book": "INR 800/hour",
    "timing": "Daily 9:00 AM - 8:00 PM",
    "how_old": 5,
    "contact": {
      "number": "+91 9123456782",
      "email": "book@aurangabadarena4.com",
      "social_media": {
        "facebook": "https://facebook.com/aurangabadarena4",
        "instagram": "https://instagram.com/aurangabadarena4",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Multi-sport complex with indoor and outdoor facilities."
  },
  {
    "name": "Aurangabad Arena 5",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Aurangabad+Arena+5",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Aurangabad+Arena+5+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Aurangabad+Arena+5+Photo+2"
    ],
    "sport": [
      "Basketball"
    ],
    "money_to_book": "INR 700/hour",
    "timing": "Daily 10:00 AM - 7:00 PM",
    "how_old": 2,
    "contact": {
      "number": "+91 8012345672",
      "email": "book@aurangabadarena5.com",
      "social_media": {
        "facebook": "https://facebook.com/aurangabadarena5",
        "instagram": "https://instagram.com/aurangabadarena5",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Turf ground, suitable for competitive matches."
  },
  {
    "name": "Kolhapur Arena 1",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Kolhapur+Arena+1",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Kolhapur+Arena+1+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Kolhapur+Arena+1+Photo+2"
    ],
    "sport": [
      "Football"
    ],
    "money_to_book": "INR 900/hour",
    "timing": "Daily 7:00 AM - 9:00 PM",
    "how_old": 3,
    "contact": {
      "number": "+91 8765432103",
      "email": "book@kolhapurarena1.com",
      "social_media": {
        "facebook": "https://facebook.com/kolhapurarena1",
        "instagram": "https://instagram.com/kolhapurarena1",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Floodlit for night play, ample parking available."
  },
  {
    "name": "Kolhapur Arena 2",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Kolhapur+Arena+2",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Kolhapur+Arena+2+Photo+1"
    ],
    "sport": [
      "Cricket"
    ],
    "money_to_book": "INR 1200/hour",
    "timing": "Daily 8:00 AM - 10:00 PM",
    "how_old": 5,
    "contact": {
      "number": "+91 9876543213",
      "email": "book@kolhapurarena2.com",
      "social_media": {
        "facebook": "https://facebook.com/kolhapurarena2",
        "instagram": "https://instagram.com/kolhapurarena2",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Professional coaching staff on-site, equipment rental."
  },
  {
    "name": "Kolhapur Arena 3",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Kolhapur+Arena+3",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Kolhapur+Arena+3+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Kolhapur+Arena+3+Photo+2"
    ],
    "sport": [
      "Badminton"
    ],
    "money_to_book": "INR 400/hour",
    "timing": "Daily 6:00 AM - 11:00 PM",
    "how_old": 2,
    "contact": {
      "number": "+91 7654321093",
      "email": "book@kolhapurarena3.com",
      "social_media": {
        "facebook": "https://facebook.com/kolhapurarena3",
        "instagram": "https://instagram.com/kolhapurarena3",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Cafeteria and changing rooms, accessible for all ages."
  },
  {
    "name": "Kolhapur Arena 4",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Kolhapur+Arena+4",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Kolhapur+Arena+4+Photo+1"
    ],
    "sport": [
      "Tennis"
    ],
    "money_to_book": "INR 700/hour",
    "timing": "Daily 9:00 AM - 8:00 PM",
    "how_old": 4,
    "contact": {
      "number": "+91 9123456783",
      "email": "book@kolhapurarena4.com",
      "social_media": {
        "facebook": "https://facebook.com/kolhapurarena4",
        "instagram": "https://instagram.com/kolhapurarena4",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Multi-sport complex with indoor and outdoor facilities."
  },
  {
    "name": "Kolhapur Arena 5",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Kolhapur+Arena+5",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Kolhapur+Arena+5+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Kolhapur+Arena+5+Photo+2"
    ],
    "sport": [
      "Basketball"
    ],
    "money_to_book": "INR 600/hour",
    "timing": "Daily 10:00 AM - 7:00 PM",
    "how_old": 1,
    "contact": {
      "number": "+91 8012345673",
      "email": "book@kolhapurarena5.com",
      "social_media": {
        "facebook": "https://facebook.com/kolhapurarena5",
        "instagram": "https://instagram.com/kolhapurarena5",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Turf ground, suitable for competitive matches."
  },
  {
    "name": "Thane Arena 1",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Thane+Arena+1",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Thane+Arena+1+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Thane+Arena+1+Photo+2"
    ],
    "sport": [
      "Football"
    ],
    "money_to_book": "INR 1100/hour",
    "timing": "Daily 7:00 AM - 9:00 PM",
    "how_old": 2,
    "contact": {
      "number": "+91 8765432104",
      "email": "book@thanearena1.com",
      "social_media": {
        "facebook": "https://facebook.com/thanearena1",
        "instagram": "https://instagram.com/thanearena1",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Floodlit for night play, ample parking available."
  },
  {
    "name": "Thane Arena 2",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Thane+Arena+2",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Thane+Arena+2+Photo+1"
    ],
    "sport": [
      "Cricket"
    ],
    "money_to_book": "INR 1400/hour",
    "timing": "Daily 8:00 AM - 10:00 PM",
    "how_old": 4,
    "contact": {
      "number": "+91 9876543214",
      "email": "book@thanearena2.com",
      "social_media": {
        "facebook": "https://facebook.com/thanearena2",
        "instagram": "https://instagram.com/thanearena2",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Professional coaching staff on-site, equipment rental."
  },
  {
    "name": "Thane Arena 3",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Thane+Arena+3",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Thane+Arena+3+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Thane+Arena+3+Photo+2"
    ],
    "sport": [
      "Badminton"
    ],
    "money_to_book": "INR 550/hour",
    "timing": "Daily 6:00 AM - 11:00 PM",
    "how_old": 1,
    "contact": {
      "number": "+91 7654321094",
      "email": "book@thanearena3.com",
      "social_media": {
        "facebook": "https://facebook.com/thanearena3",
        "instagram": "https://instagram.com/thanearena3",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Cafeteria and changing rooms, accessible for all ages."
  },
  {
    "name": "Thane Arena 4",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Thane+Arena+4",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Thane+Arena+4+Photo+1"
    ],
    "sport": [
      "Tennis"
    ],
    "money_to_book": "INR 900/hour",
    "timing": "Daily 9:00 AM - 8:00 PM",
    "how_old": 3,
    "contact": {
      "number": "+91 9123456784",
      "email": "book@thanearena4.com",
      "social_media": {
        "facebook": "https://facebook.com/thanearena4",
        "instagram": "https://instagram.com/thanearena4",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Multi-sport complex with indoor and outdoor facilities."
  },
  {
    "name": "Thane Arena 5",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Thane+Arena+5",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Thane+Arena+5+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Thane+Arena+5+Photo+2"
    ],
    "sport": [
      "Basketball"
    ],
    "money_to_book": "INR 750/hour",
    "timing": "Daily 10:00 AM - 7:00 PM",
    "how_old": 6,
    "contact": {
      "number": "+91 8012345674",
      "email": "book@thanearena5.com",
      "social_media": {
        "facebook": "https://facebook.com/thanearena5",
        "instagram": "https://instagram.com/thanearena5",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Turf ground, suitable for competitive matches."
  },
  {
    "name": "Ahmedabad Arena 1",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Ahmedabad+Arena+1",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Ahmedabad+Arena+1+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Ahmedabad+Arena+1+Photo+2"
    ],
    "sport": [
      "Football",
      "Cricket"
    ],
    "money_to_book": "INR 3200/hour",
    "timing": "Daily 7:00 AM - 10:00 PM",
    "how_old": 6,
    "contact": {
      "number": "+91 8765432105",
      "email": "book@ahmedabadarena1.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadarena1",
        "instagram": "https://instagram.com/ahmedabadarena1",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Floodlit for night play, ample parking available."
  },
  {
    "name": "Ahmedabad Arena 2",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Ahmedabad+Arena+2",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Ahmedabad+Arena+2+Photo+1"
    ],
    "sport": [
      "Badminton",
      "Basketball"
    ],
    "money_to_book": "INR 1100/hour",
    "timing": "Daily 8:00 AM - 9:00 PM",
    "how_old": 4,
    "contact": {
      "number": "+91 9876543215",
      "email": "book@ahmedabadarena2.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadarena2",
        "instagram": "https://instagram.com/ahmedabadarena2",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Professional coaching staff on-site, equipment rental."
  },
  {
    "name": "Ahmedabad Arena 3",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Ahmedabad+Arena+3",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Ahmedabad+Arena+3+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Ahmedabad+Arena+3+Photo+2"
    ],
    "sport": [
      "Tennis"
    ],
    "money_to_book": "INR 1900/hour",
    "timing": "Daily 6:00 AM - 11:00 PM",
    "how_old": 3,
    "contact": {
      "number": "+91 7654321095",
      "email": "book@ahmedabadarena3.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadarena3",
        "instagram": "https://instagram.com/ahmedabadarena3",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Cafeteria and changing rooms, accessible for all ages."
  },
  {
    "name": "Ahmedabad Arena 4",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Ahmedabad+Arena+4",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Ahmedabad+Arena+4+Photo+1"
    ],
    "sport": [
      "Volleyball"
    ],
    "money_to_book": "INR 950/hour",
    "timing": "Daily 9:00 AM - 8:00 PM",
    "how_old": 7,
    "contact": {
      "number": "+91 9123456785",
      "email": "book@ahmedabadarena4.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadarena4",
        "instagram": "https://instagram.com/ahmedabadarena4",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Multi-sport complex with indoor and outdoor facilities."
  },
  {
    "name": "Ahmedabad Arena 5",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Ahmedabad+Arena+5",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Ahmedabad+Arena+5+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Ahmedabad+Arena+5+Photo+2"
    ],
    "sport": [
      "Football"
    ],
    "money_to_book": "INR 3500/hour",
    "timing": "Daily 10:00 AM - 7:00 PM",
    "how_old": 2,
    "contact": {
      "number": "+91 8012345675",
      "email": "book@ahmedabadarena5.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadarena5",
        "instagram": "https://instagram.com/ahmedabadarena5",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Turf ground, suitable for competitive matches."
  },
  {
    "name": "Ahmedabad Arena 6",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Ahmedabad+Arena+6",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Ahmedabad+Arena+6+Photo+1"
    ],
    "sport": [
      "Cricket"
    ],
    "money_to_book": "INR 2800/hour",
    "timing": "Daily 7:00 AM - 10:00 PM",
    "how_old": 5,
    "contact": {
      "number": "+91 9012345675",
      "email": "book@ahmedabadarena6.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadarena6",
        "instagram": "https://instagram.com/ahmedabadarena6",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Floodlit for night play, ample parking available."
  },
  {
    "name": "Ahmedabad Arena 7",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Ahmedabad+Arena+7",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Ahmedabad+Arena+7+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Ahmedabad+Arena+7+Photo+2"
    ],
    "sport": [
      "Badminton"
    ],
    "money_to_book": "INR 1200/hour",
    "timing": "Daily 8:00 AM - 9:00 PM",
    "how_old": 8,
    "contact": {
      "number": "+91 7890123455",
      "email": "book@ahmedabadarena7.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadarena7",
        "instagram": "https://instagram.com/ahmedabadarena7",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Professional coaching staff on-site, equipment rental."
  },
  {
    "name": "Ahmedabad Arena 8",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Ahmedabad+Arena+8",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Ahmedabad+Arena+8+Photo+1"
    ],
    "sport": [
      "Basketball"
    ],
    "money_to_book": "INR 1500/hour",
    "timing": "Daily 6:00 AM - 11:00 PM",
    "how_old": 1,
    "contact": {
      "number": "+91 9988776655",
      "email": "book@ahmedabadarena8.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadarena8",
        "instagram": "https://instagram.com/ahmedabadarena8",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Cafeteria and changing rooms, accessible for all ages."
  },
  {
    "name": "Ahmedabad Arena 9",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Ahmedabad+Arena+9",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Ahmedabad+Arena+9+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Ahmedabad+Arena+9+Photo+2"
    ],
    "sport": [
      "Tennis"
    ],
    "money_to_book": "INR 2000/hour",
    "timing": "Daily 9:00 AM - 8:00 PM",
    "how_old": 10,
    "contact": {
      "number": "+91 7766554435",
      "email": "book@ahmedabadarena9.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadarena9",
        "instagram": "https://instagram.com/ahmedabadarena9",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Turf ground, suitable for competitive matches."
  },
  {
    "name": "Ahmedabad Arena 10",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Ahmedabad+Arena+10",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Ahmedabad+Arena+10+Photo+1"
    ],
    "sport": [
      "Volleyball"
    ],
    "money_to_book": "INR 1000/hour",
    "timing": "Daily 10:00 AM - 7:00 PM",
    "how_old": 4,
    "contact": {
      "number": "+91 8877665545",
      "email": "book@ahmedabadarena10.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadarena10",
        "instagram": "https://instagram.com/ahmedabadarena10",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Multi-sport complex with indoor and outdoor facilities."
  },
  {
    "name": "Ahmedabad Arena 11",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Ahmedabad+Arena+11",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Ahmedabad+Arena+11+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Ahmedabad+Arena+11+Photo+2"
    ],
    "sport": [
      "Football"
    ],
    "money_to_book": "INR 3300/hour",
    "timing": "Daily 7:00 AM - 10:00 PM",
    "how_old": 5,
    "contact": {
      "number": "+91 9765432105",
      "email": "book@ahmedabadarena11.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadarena11",
        "instagram": "https://instagram.com/ahmedabadarena11",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Floodlit for night play, ample parking available."
  },
  {
    "name": "Ahmedabad Arena 12",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Ahmedabad+Arena+12",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Ahmedabad+Arena+12+Photo+1"
    ],
    "sport": [
      "Cricket"
    ],
    "money_to_book": "INR 2900/hour",
    "timing": "Daily 8:00 AM - 9:00 PM",
    "how_old": 7,
    "contact": {
      "number": "+91 8976543215",
      "email": "book@ahmedabadarena12.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadarena12",
        "instagram": "https://instagram.com/ahmedabadarena12",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Professional coaching staff on-site, equipment rental."
  },
  {
    "name": "Ahmedabad Arena 13",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Ahmedabad+Arena+13",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Ahmedabad+Arena+13+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Ahmedabad+Arena+13+Photo+2"
    ],
    "sport": [
      "Badminton"
    ],
    "money_to_book": "INR 1150/hour",
    "timing": "Daily 6:00 AM - 11:00 PM",
    "how_old": 2,
    "contact": {
      "number": "+91 7654321005",
      "email": "book@ahmedabadarena13.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadarena13",
        "instagram": "https://instagram.com/ahmedabadarena13",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Cafeteria and changing rooms, accessible for all ages."
  },
  {
    "name": "Ahmedabad Arena 14",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Ahmedabad+Arena+14",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Ahmedabad+Arena+14+Photo+1"
    ],
    "sport": [
      "Basketball"
    ],
    "money_to_book": "INR 1450/hour",
    "timing": "Daily 9:00 AM - 8:00 PM",
    "how_old": 9,
    "contact": {
      "number": "+91 9123456705",
      "email": "book@ahmedabadarena14.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadarena14",
        "instagram": "https://instagram.com/ahmedabadarena14",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Multi-sport complex with indoor and outdoor facilities."
  },
  {
    "name": "Ahmedabad Arena 15",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Ahmedabad+Arena+15",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Ahmedabad+Arena+15+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Ahmedabad+Arena+15+Photo+2"
    ],
    "sport": [
      "Tennis"
    ],
    "money_to_book": "INR 2100/hour",
    "timing": "Daily 10:00 AM - 7:00 PM",
    "how_old": 5,
    "contact": {
      "number": "+91 8012345605",
      "email": "book@ahmedabadarena15.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadarena15",
        "instagram": "https://instagram.com/ahmedabadarena15",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Turf ground, suitable for competitive matches."
  },
  {
    "name": "Ahmedabad Arena 16",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Ahmedabad+Arena+16",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Ahmedabad+Arena+16+Photo+1"
    ],
    "sport": [
      "Volleyball"
    ],
    "money_to_book": "INR 1050/hour",
    "timing": "Daily 6:00 AM - 10:00 PM",
    "how_old": 3,
    "contact": {
      "number": "+91 9012345605",
      "email": "book@ahmedabadarena16.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadarena16",
        "instagram": "https://instagram.com/ahmedabadarena16",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Floodlit for night play, ample parking available."
  },
  {
    "name": "Ahmedabad Arena 17",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Ahmedabad+Arena+17",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Ahmedabad+Arena+17+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Ahmedabad+Arena+17+Photo+2"
    ],
    "sport": [
      "Football"
    ],
    "money_to_book": "INR 3400/hour",
    "timing": "Daily 7:00 AM - 9:00 PM",
    "how_old": 8,
    "contact": {
      "number": "+91 7890123455",
      "email": "book@ahmedabadarena17.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadarena17",
        "instagram": "https://instagram.com/ahmedabadarena17",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Professional coaching staff on-site, equipment rental."
  },
  {
    "name": "Ahmedabad Arena 18",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Ahmedabad+Arena+18",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Ahmedabad+Arena+18+Photo+1"
    ],
    "sport": [
      "Cricket"
    ],
    "money_to_book": "INR 3000/hour",
    "timing": "Daily 8:00 AM - 11:00 PM",
    "how_old": 1,
    "contact": {
      "number": "+91 9988776655",
      "email": "book@ahmedabadarena18.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadarena18",
        "instagram": "https://instagram.com/ahmedabadarena18",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Cafeteria and changing rooms, accessible for all ages."
  },
  {
    "name": "Ahmedabad Arena 19",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Ahmedabad+Arena+19",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Ahmedabad+Arena+19+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Ahmedabad+Arena+19+Photo+2"
    ],
    "sport": [
      "Badminton"
    ],
    "money_to_book": "INR 1300/hour",
    "timing": "Daily 9:00 AM - 10:00 PM",
    "how_old": 11,
    "contact": {
      "number": "+91 7766554435",
      "email": "book@ahmedabadarena19.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadarena19",
        "instagram": "https://instagram.com/ahmedabadarena19",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Turf ground, suitable for competitive matches."
  },
  {
    "name": "Ahmedabad Arena 20",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Ahmedabad+Arena+20",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Ahmedabad+Arena+20+Photo+1"
    ],
    "sport": [
      "Basketball"
    ],
    "money_to_book": "INR 1600/hour",
    "timing": "Daily 10:00 AM - 7:00 PM",
    "how_old": 4,
    "contact": {
      "number": "+91 8877665545",
      "email": "book@ahmedabadarena20.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadarena20",
        "instagram": "https://instagram.com/ahmedabadarena20",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Multi-sport complex with indoor and outdoor facilities."
  },
  {
    "name": "Ahmedabad Arena 21",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Ahmedabad+Arena+21",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Ahmedabad+Arena+21+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Ahmedabad+Arena+21+Photo+2"
    ],
    "sport": [
      "Tennis"
    ],
    "money_to_book": "INR 2300/hour",
    "timing": "Daily 6:00 AM - 10:00 PM",
    "how_old": 6,
    "contact": {
      "number": "+91 9765432105",
      "email": "book@ahmedabadarena21.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadarena21",
        "instagram": "https://instagram.com/ahmedabadarena21",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Floodlit for night play, ample parking available."
  },
  {
    "name": "Ahmedabad Arena 22",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Ahmedabad+Arena+22",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Ahmedabad+Arena+22+Photo+1"
    ],
    "sport": [
      "Volleyball"
    ],
    "money_to_book": "INR 1000/hour",
    "timing": "Daily 7:00 AM - 9:00 PM",
    "how_old": 2,
    "contact": {
      "number": "+91 8976543215",
      "email": "book@ahmedabadarena22.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadarena22",
        "instagram": "https://instagram.com/ahmedabadarena22",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Professional coaching staff on-site, equipment rental."
  },
  {
    "name": "Ahmedabad Arena 23",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Ahmedabad+Arena+23",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Ahmedabad+Arena+23+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Ahmedabad+Arena+23+Photo+2"
    ],
    "sport": [
      "Football"
    ],
    "money_to_book": "INR 3600/hour",
    "timing": "Daily 8:00 AM - 11:00 PM",
    "how_old": 7,
    "contact": {
      "number": "+91 7654321005",
      "email": "book@ahmedabadarena23.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadarena23",
        "instagram": "https://instagram.com/ahmedabadarena23",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Cafeteria and changing rooms, accessible for all ages."
  },
  {
    "name": "Ahmedabad Arena 24",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Ahmedabad+Arena+24",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Ahmedabad+Arena+24+Photo+1"
    ],
    "sport": [
      "Cricket"
    ],
    "money_to_book": "INR 3000/hour",
    "timing": "Daily 9:00 AM - 10:00 PM",
    "how_old": 3,
    "contact": {
      "number": "+91 9123456705",
      "email": "book@ahmedabadarena24.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadarena24",
        "instagram": "https://instagram.com/ahmedabadarena24",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Turf ground, suitable for competitive matches."
  },
  {
    "name": "Ahmedabad Arena 25",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Ahmedabad+Arena+25",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Ahmedabad+Arena+25+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Ahmedabad+Arena+25+Photo+2"
    ],
    "sport": [
      "Badminton"
    ],
    "money_to_book": "INR 1250/hour",
    "timing": "Daily 10:00 AM - 7:00 PM",
    "how_old": 5,
    "contact": {
      "number": "+91 8012345605",
      "email": "book@ahmedabadarena25.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadarena25",
        "instagram": "https://instagram.com/ahmedabadarena25",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Multi-sport complex with indoor and outdoor facilities."
  },
  {
    "name": "Surat Arena 1",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Surat+Arena+1",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Surat+Arena+1+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Surat+Arena+1+Photo+2"
    ],
    "sport": [
      "Football"
    ],
    "money_to_book": "INR 1400/hour",
    "timing": "Daily 7:00 AM - 9:00 PM",
    "how_old": 3,
    "contact": {
      "number": "+91 8765432106",
      "email": "book@suratarena1.com",
      "social_media": {
        "facebook": "https://facebook.com/suratarena1",
        "instagram": "https://instagram.com/suratarena1",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Floodlit for night play, ample parking available."
  },
  {
    "name": "Surat Arena 2",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Surat+Arena+2",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Surat+Arena+2+Photo+1"
    ],
    "sport": [
      "Cricket"
    ],
    "money_to_book": "INR 1700/hour",
    "timing": "Daily 8:00 AM - 10:00 PM",
    "how_old": 5,
    "contact": {
      "number": "+91 9876543216",
      "email": "book@suratarena2.com",
      "social_media": {
        "facebook": "https://facebook.com/suratarena2",
        "instagram": "https://instagram.com/suratarena2",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Professional coaching staff on-site, equipment rental."
  },
  {
    "name": "Surat Arena 3",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Surat+Arena+3",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Surat+Arena+3+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Surat+Arena+3+Photo+2"
    ],
    "sport": [
      "Badminton"
    ],
    "money_to_book": "INR 650/hour",
    "timing": "Daily 6:00 AM - 11:00 PM",
    "how_old": 2,
    "contact": {
      "number": "+91 7654321096",
      "email": "book@suratarena3.com",
      "social_media": {
        "facebook": "https://facebook.com/suratarena3",
        "instagram": "https://instagram.com/suratarena3",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Cafeteria and changing rooms, accessible for all ages."
  },
  {
    "name": "Surat Arena 4",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Surat+Arena+4",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Surat+Arena+4+Photo+1"
    ],
    "sport": [
      "Tennis"
    ],
    "money_to_book": "INR 1100/hour",
    "timing": "Daily 9:00 AM - 8:00 PM",
    "how_old": 4,
    "contact": {
      "number": "+91 9123456786",
      "email": "book@suratarena4.com",
      "social_media": {
        "facebook": "https://facebook.com/suratarena4",
        "instagram": "https://instagram.com/suratarena4",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Multi-sport complex with indoor and outdoor facilities."
  },
  {
    "name": "Surat Arena 5",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Surat+Arena+5",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Surat+Arena+5+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Surat+Arena+5+Photo+2"
    ],
    "sport": [
      "Basketball"
    ],
    "money_to_book": "INR 850/hour",
    "timing": "Daily 10:00 AM - 7:00 PM",
    "how_old": 1,
    "contact": {
      "number": "+91 8012345676",
      "email": "book@suratarena5.com",
      "social_media": {
        "facebook": "https://facebook.com/suratarena5",
        "instagram": "https://instagram.com/suratarena5",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Turf ground, suitable for competitive matches."
  },
  {
    "name": "Vadodara Arena 1",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Vadodara+Arena+1",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Vadodara+Arena+1+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Vadodara+Arena+1+Photo+2"
    ],
    "sport": [
      "Football"
    ],
    "money_to_book": "INR 1200/hour",
    "timing": "Daily 7:00 AM - 9:00 PM",
    "how_old": 4,
    "contact": {
      "number": "+91 8765432107",
      "email": "book@vadodaraarena1.com",
      "social_media": {
        "facebook": "https://facebook.com/vadodaraarena1",
        "instagram": "https://instagram.com/vadodaraarena1",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Floodlit for night play, ample parking available."
  },
  {
    "name": "Vadodara Arena 2",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Vadodara+Arena+2",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Vadodara+Arena+2+Photo+1"
    ],
    "sport": [
      "Cricket"
    ],
    "money_to_book": "INR 1500/hour",
    "timing": "Daily 8:00 AM - 10:00 PM",
    "how_old": 6,
    "contact": {
      "number": "+91 9876543217",
      "email": "book@vadodaraarena2.com",
      "social_media": {
        "facebook": "https://facebook.com/vadodaraarena2",
        "instagram": "https://instagram.com/vadodaraarena2",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Professional coaching staff on-site, equipment rental."
  },
  {
    "name": "Vadodara Arena 3",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Vadodara+Arena+3",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Vadodara+Arena+3+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Vadodara+Arena+3+Photo+2"
    ],
    "sport": [
      "Badminton"
    ],
    "money_to_book": "INR 500/hour",
    "timing": "Daily 6:00 AM - 11:00 PM",
    "how_old": 3,
    "contact": {
      "number": "+91 7654321097",
      "email": "book@vadodaraarena3.com",
      "social_media": {
        "facebook": "https://facebook.com/vadodaraarena3",
        "instagram": "https://instagram.com/vadodaraarena3",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Cafeteria and changing rooms, accessible for all ages."
  },
  {
    "name": "Vadodara Arena 4",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Vadodara+Arena+4",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Vadodara+Arena+4+Photo+1"
    ],
    "sport": [
      "Tennis"
    ],
    "money_to_book": "INR 800/hour",
    "timing": "Daily 9:00 AM - 8:00 PM",
    "how_old": 5,
    "contact": {
      "number": "+91 9123456787",
      "email": "book@vadodaraarena4.com",
      "social_media": {
        "facebook": "https://facebook.com/vadodaraarena4",
        "instagram": "https://instagram.com/vadodaraarena4",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Multi-sport complex with indoor and outdoor facilities."
  },
  {
    "name": "Vadodara Arena 5",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Vadodara+Arena+5",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Vadodara+Arena+5+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Vadodara+Arena+5+Photo+2"
    ],
    "sport": [
      "Basketball"
    ],
    "money_to_book": "INR 700/hour",
    "timing": "Daily 10:00 AM - 7:00 PM",
    "how_old": 2,
    "contact": {
      "number": "+91 8012345677",
      "email": "book@vadodaraarena5.com",
      "social_media": {
        "facebook": "https://facebook.com/vadodaraarena5",
        "instagram": "https://instagram.com/vadodaraarena5",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Turf ground, suitable for competitive matches."
  },
  {
    "name": "Rajkot Arena 1",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Rajkot+Arena+1",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Rajkot+Arena+1+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Rajkot+Arena+1+Photo+2"
    ],
    "sport": [
      "Football"
    ],
    "money_to_book": "INR 1000/hour",
    "timing": "Daily 7:00 AM - 9:00 PM",
    "how_old": 3,
    "contact": {
      "number": "+91 8765432108",
      "email": "book@rajkotarena1.com",
      "social_media": {
        "facebook": "https://facebook.com/rajkotarena1",
        "instagram": "https://instagram.com/rajkotarena1",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Floodlit for night play, ample parking available."
  },
  {
    "name": "Rajkot Arena 2",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Rajkot+Arena+2",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Rajkot+Arena+2+Photo+1"
    ],
    "sport": [
      "Cricket"
    ],
    "money_to_book": "INR 1300/hour",
    "timing": "Daily 8:00 AM - 10:00 PM",
    "how_old": 5,
    "contact": {
      "number": "+91 9876543218",
      "email": "book@rajkotarena2.com",
      "social_media": {
        "facebook": "https://facebook.com/rajkotarena2",
        "instagram": "https://instagram.com/rajkotarena2",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Professional coaching staff on-site, equipment rental."
  },
  {
    "name": "Rajkot Arena 3",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Rajkot+Arena+3",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Rajkot+Arena+3+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Rajkot+Arena+3+Photo+2"
    ],
    "sport": [
      "Badminton"
    ],
    "money_to_book": "INR 500/hour",
    "timing": "Daily 6:00 AM - 11:00 PM",
    "how_old": 2,
    "contact": {
      "number": "+91 7654321098",
      "email": "book@rajkotarena3.com",
      "social_media": {
        "facebook": "https://facebook.com/rajkotarena3",
        "instagram": "https://instagram.com/rajkotarena3",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Cafeteria and changing rooms, accessible for all ages."
  },
  {
    "name": "Rajkot Arena 4",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Rajkot+Arena+4",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Rajkot+Arena+4+Photo+1"
    ],
    "sport": [
      "Tennis"
    ],
    "money_to_book": "INR 800/hour",
    "timing": "Daily 9:00 AM - 8:00 PM",
    "how_old": 4,
    "contact": {
      "number": "+91 9123456788",
      "email": "book@rajkotarena4.com",
      "social_media": {
        "facebook": "https://facebook.com/rajkotarena4",
        "instagram": "https://instagram.com/rajkotarena4",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Multi-sport complex with indoor and outdoor facilities."
  },
  {
    "name": "Rajkot Arena 5",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Rajkot+Arena+5",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Rajkot+Arena+5+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Rajkot+Arena+5+Photo+2"
    ],
    "sport": [
      "Basketball"
    ],
    "money_to_book": "INR 700/hour",
    "timing": "Daily 10:00 AM - 7:00 PM",
    "how_old": 1,
    "contact": {
      "number": "+91 8012345678",
      "email": "book@rajkotarena5.com",
      "social_media": {
        "facebook": "https://facebook.com/rajkotarena5",
        "instagram": "https://instagram.com/rajkotarena5",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Turf ground, suitable for competitive matches."
  },
  {
    "name": "Gandhinagar Arena 1",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Gandhinagar+Arena+1",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Gandhinagar+Arena+1+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Gandhinagar+Arena+1+Photo+2"
    ],
    "sport": [
      "Football"
    ],
    "money_to_book": "INR 900/hour",
    "timing": "Daily 7:00 AM - 9:00 PM",
    "how_old": 2,
    "contact": {
      "number": "+91 8765432109",
      "email": "book@gandhinagararena1.com",
      "social_media": {
        "facebook": "https://facebook.com/gandhinagararena1",
        "instagram": "https://instagram.com/gandhinagararena1",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Floodlit for night play, ample parking available."
  },
  {
    "name": "Gandhinagar Arena 2",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Gandhinagar+Arena+2",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Gandhinagar+Arena+2+Photo+1"
    ],
    "sport": [
      "Cricket"
    ],
    "money_to_book": "INR 1200/hour",
    "timing": "Daily 8:00 AM - 10:00 PM",
    "how_old": 4,
    "contact": {
      "number": "+91 9876543219",
      "email": "book@gandhinagararena2.com",
      "social_media": {
        "facebook": "https://facebook.com/gandhinagararena2",
        "instagram": "https://instagram.com/gandhinagararena2",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Professional coaching staff on-site, equipment rental."
  },
  {
    "name": "Gandhinagar Arena 3",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Gandhinagar+Arena+3",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Gandhinagar+Arena+3+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Gandhinagar+Arena+3+Photo+2"
    ],
    "sport": [
      "Badminton"
    ],
    "money_to_book": "INR 400/hour",
    "timing": "Daily 6:00 AM - 11:00 PM",
    "how_old": 1,
    "contact": {
      "number": "+91 7654321099",
      "email": "book@gandhinagararena3.com",
      "social_media": {
        "facebook": "https://facebook.com/gandhinagararena3",
        "instagram": "https://instagram.com/gandhinagararena3",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Cafeteria and changing rooms, accessible for all ages."
  },
  {
    "name": "Gandhinagar Arena 4",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Gandhinagar+Arena+4",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Gandhinagar+Arena+4+Photo+1"
    ],
    "sport": [
      "Tennis"
    ],
    "money_to_book": "INR 700/hour",
    "timing": "Daily 9:00 AM - 8:00 PM",
    "how_old": 3,
    "contact": {
      "number": "+91 9123456789",
      "email": "book@gandhinagararena4.com",
      "social_media": {
        "facebook": "https://facebook.com/gandhinagararena4",
        "instagram": "https://instagram.com/gandhinagararena4",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Multi-sport complex with indoor and outdoor facilities."
  },
  {
    "name": "Gandhinagar Arena 5",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Gandhinagar+Arena+5",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Gandhinagar+Arena+5+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Gandhinagar+Arena+5+Photo+2"
    ],
    "sport": [
      "Basketball"
    ],
    "money_to_book": "INR 600/hour",
    "timing": "Daily 10:00 AM - 7:00 PM",
    "how_old": 6,
    "contact": {
      "number": "+91 8012345679",
      "email": "book@gandhinagararena5.com",
      "social_media": {
        "facebook": "https://facebook.com/gandhinagararena5",
        "instagram": "https://instagram.com/gandhinagararena5",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Turf ground, suitable for competitive matches."
  },
  {
    "name": "Jamnagar Arena 1",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Jamnagar+Arena+1",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Jamnagar+Arena+1+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Jamnagar+Arena+1+Photo+2"
    ],
    "sport": [
      "Football"
    ],
    "money_to_book": "INR 800/hour",
    "timing": "Daily 7:00 AM - 9:00 PM",
    "how_old": 3,
    "contact": {
      "number": "+91 8765432100",
      "email": "book@jamnagararena1.com",
      "social_media": {
        "facebook": "https://facebook.com/jamnagararena1",
        "instagram": "https://instagram.com/jamnagararena1",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Floodlit for night play, ample parking available."
  },
  {
    "name": "Jamnagar Arena 2",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Jamnagar+Arena+2",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Jamnagar+Arena+2+Photo+1"
    ],
    "sport": [
      "Cricket"
    ],
    "money_to_book": "INR 1100/hour",
    "timing": "Daily 8:00 AM - 10:00 PM",
    "how_old": 5,
    "contact": {
      "number": "+91 9876543210",
      "email": "book@jamnagararena2.com",
      "social_media": {
        "facebook": "https://facebook.com/jamnagararena2",
        "instagram": "https://instagram.com/jamnagararena2",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Professional coaching staff on-site, equipment rental."
  },
  {
    "name": "Jamnagar Arena 3",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Jamnagar+Arena+3",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Jamnagar+Arena+3+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Jamnagar+Arena+3+Photo+2"
    ],
    "sport": [
      "Badminton"
    ],
    "money_to_book": "INR 350/hour",
    "timing": "Daily 6:00 AM - 11:00 PM",
    "how_old": 2,
    "contact": {
      "number": "+91 7654321090",
      "email": "book@jamnagararena3.com",
      "social_media": {
        "facebook": "https://facebook.com/jamnagararena3",
        "instagram": "https://instagram.com/jamnagararena3",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Cafeteria and changing rooms, accessible for all ages."
  },
  {
    "name": "Jamnagar Arena 4",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Jamnagar+Arena+4",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Jamnagar+Arena+4+Photo+1"
    ],
    "sport": [
      "Tennis"
    ],
    "money_to_book": "INR 650/hour",
    "timing": "Daily 9:00 AM - 8:00 PM",
    "how_old": 4,
    "contact": {
      "number": "+91 9123456780",
      "email": "book@jamnagararena4.com",
      "social_media": {
        "facebook": "https://facebook.com/jamnagararena4",
        "instagram": "https://instagram.com/jamnagararena4",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Multi-sport complex with indoor and outdoor facilities."
  },
  {
    "name": "Jamnagar Arena 5",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Jamnagar+Arena+5",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Jamnagar+Arena+5+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Jamnagar+Arena+5+Photo+2"
    ],
    "sport": [
      "Basketball"
    ],
    "money_to_book": "INR 550/hour",
    "timing": "Daily 10:00 AM - 7:00 PM",
    "how_old": 1,
    "contact": {
      "number": "+91 8012345670",
      "email": "book@jamnagararena5.com",
      "social_media": {
        "facebook": "https://facebook.com/jamnagararena5",
        "instagram": "https://instagram.com/jamnagararena5",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Turf ground, suitable for competitive matches."
  },
  {
    "name": "Bhavnagar Arena 1",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Bhavnagar+Arena+1",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Bhavnagar+Arena+1+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Bhavnagar+Arena+1+Photo+2"
    ],
    "sport": [
      "Football"
    ],
    "money_to_book": "INR 700/hour",
    "timing": "Daily 7:00 AM - 9:00 PM",
    "how_old": 2,
    "contact": {
      "number": "+91 8765432101",
      "email": "book@bhavnagararena1.com",
      "social_media": {
        "facebook": "https://facebook.com/bhavnagararena1",
        "instagram": "https://instagram.com/bhavnagararena1",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Floodlit for night play, ample parking available."
  },
  {
    "name": "Bhavnagar Arena 2",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Bhavnagar+Arena+2",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Bhavnagar+Arena+2+Photo+1"
    ],
    "sport": [
      "Cricket"
    ],
    "money_to_book": "INR 1000/hour",
    "timing": "Daily 8:00 AM - 10:00 PM",
    "how_old": 4,
    "contact": {
      "number": "+91 9876543211",
      "email": "book@bhavnagararena2.com",
      "social_media": {
        "facebook": "https://facebook.com/bhavnagararena2",
        "instagram": "https://instagram.com/bhavnagararena2",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Professional coaching staff on-site, equipment rental."
  },
  {
    "name": "Bhavnagar Arena 3",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Bhavnagar+Arena+3",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Bhavnagar+Arena+3+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Bhavnagar+Arena+3+Photo+2"
    ],
    "sport": [
      "Badminton"
    ],
    "money_to_book": "INR 300/hour",
    "timing": "Daily 6:00 AM - 11:00 PM",
    "how_old": 1,
    "contact": {
      "number": "+91 7654321091",
      "email": "book@bhavnagararena3.com",
      "social_media": {
        "facebook": "https://facebook.com/bhavnagararena3",
        "instagram": "https://instagram.com/bhavnagararena3",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Cafeteria and changing rooms, accessible for all ages."
  },
  {
    "name": "Bhavnagar Arena 4",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Bhavnagar+Arena+4",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Bhavnagar+Arena+4+Photo+1"
    ],
    "sport": [
      "Tennis"
    ],
    "money_to_book": "INR 600/hour",
    "timing": "Daily 9:00 AM - 8:00 PM",
    "how_old": 3,
    "contact": {
      "number": "+91 9123456781",
      "email": "book@bhavnagararena4.com",
      "social_media": {
        "facebook": "https://facebook.com/bhavnagararena4",
        "instagram": "https://instagram.com/bhavnagararena4",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Multi-sport complex with indoor and outdoor facilities."
  },
  {
    "name": "Bhavnagar Arena 5",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Bhavnagar+Arena+5",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Bhavnagar+Arena+5+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Bhavnagar+Arena+5+Photo+2"
    ],
    "sport": [
      "Basketball"
    ],
    "money_to_book": "INR 500/hour",
    "timing": "Daily 10:00 AM - 7:00 PM",
    "how_old": 6,
    "contact": {
      "number": "+91 8012345671",
      "email": "book@bhavnagararena5.com",
      "social_media": {
        "facebook": "https://facebook.com/bhavnagararena5",
        "instagram": "https://instagram.com/bhavnagararena5",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Turf ground, suitable for competitive matches."
  },
  {
    "name": "Ludhiana Arena 1",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Ludhiana+Arena+1",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Ludhiana+Arena+1+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Ludhiana+Arena+1+Photo+2"
    ],
    "sport": [
      "Football"
    ],
    "money_to_book": "INR 1300/hour",
    "timing": "Daily 7:00 AM - 9:00 PM",
    "how_old": 4,
    "contact": {
      "number": "+91 8765432102",
      "email": "book@ludhianaarena1.com",
      "social_media": {
        "facebook": "https://facebook.com/ludhianaarena1",
        "instagram": "https://instagram.com/ludhianaarena1",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Floodlit for night play, ample parking available."
  },
  {
    "name": "Ludhiana Arena 2",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Ludhiana+Arena+2",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Ludhiana+Arena+2+Photo+1"
    ],
    "sport": [
      "Cricket"
    ],
    "money_to_book": "INR 1600/hour",
    "timing": "Daily 8:00 AM - 10:00 PM",
    "how_old": 6,
    "contact": {
      "number": "+91 9876543212",
      "email": "book@ludhianaarena2.com",
      "social_media": {
        "facebook": "https://facebook.com/ludhianaarena2",
        "instagram": "https://instagram.com/ludhianaarena2",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Professional coaching staff on-site, equipment rental."
  },
  {
    "name": "Ludhiana Arena 3",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Ludhiana+Arena+3",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Ludhiana+Arena+3+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Ludhiana+Arena+3+Photo+2"
    ],
    "sport": [
      "Badminton"
    ],
    "money_to_book": "INR 550/hour",
    "timing": "Daily 6:00 AM - 11:00 PM",
    "how_old": 3,
    "contact": {
      "number": "+91 7654321092",
      "email": "book@ludhianaarena3.com",
      "social_media": {
        "facebook": "https://facebook.com/ludhianaarena3",
        "instagram": "https://instagram.com/ludhianaarena3",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Cafeteria and changing rooms, accessible for all ages."
  },
  {
    "name": "Ludhiana Arena 4",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Ludhiana+Arena+4",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Ludhiana+Arena+4+Photo+1"
    ],
    "sport": [
      "Tennis"
    ],
    "money_to_book": "INR 900/hour",
    "timing": "Daily 9:00 AM - 8:00 PM",
    "how_old": 5,
    "contact": {
      "number": "+91 9123456782",
      "email": "book@ludhianaarena4.com",
      "social_media": {
        "facebook": "https://facebook.com/ludhianaarena4",
        "instagram": "https://instagram.com/ludhianaarena4",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Multi-sport complex with indoor and outdoor facilities."
  },
  {
    "name": "Ludhiana Arena 5",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Ludhiana+Arena+5",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Ludhiana+Arena+5+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Ludhiana+Arena+5+Photo+2"
    ],
    "sport": [
      "Basketball"
    ],
    "money_to_book": "INR 750/hour",
    "timing": "Daily 10:00 AM - 7:00 PM",
    "how_old": 2,
    "contact": {
      "number": "+91 8012345672",
      "email": "book@ludhianaarena5.com",
      "social_media": {
        "facebook": "https://facebook.com/ludhianaarena5",
        "instagram": "https://instagram.com/ludhianaarena5",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Turf ground, suitable for competitive matches."
  },
  {
    "name": "Amritsar Arena 1",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Amritsar+Arena+1",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Amritsar+Arena+1+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Amritsar+Arena+1+Photo+2"
    ],
    "sport": [
      "Football"
    ],
    "money_to_book": "INR 1100/hour",
    "timing": "Daily 7:00 AM - 9:00 PM",
    "how_old": 3,
    "contact": {
      "number": "+91 8765432103",
      "email": "book@amritsararena1.com",
      "social_media": {
        "facebook": "https://facebook.com/amritsararena1",
        "instagram": "https://instagram.com/amritsararena1",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Floodlit for night play, ample parking available."
  },
  {
    "name": "Amritsar Arena 2",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Amritsar+Arena+2",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Amritsar+Arena+2+Photo+1"
    ],
    "sport": [
      "Cricket"
    ],
    "money_to_book": "INR 1400/hour",
    "timing": "Daily 8:00 AM - 10:00 PM",
    "how_old": 5,
    "contact": {
      "number": "+91 9876543213",
      "email": "book@amritsararena2.com",
      "social_media": {
        "facebook": "https://facebook.com/amritsararena2",
        "instagram": "https://instagram.com/amritsararena2",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Professional coaching staff on-site, equipment rental."
  },
  {
    "name": "Amritsar Arena 3",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Amritsar+Arena+3",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Amritsar+Arena+3+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Amritsar+Arena+3+Photo+2"
    ],
    "sport": [
      "Badminton"
    ],
    "money_to_book": "INR 450/hour",
    "timing": "Daily 6:00 AM - 11:00 PM",
    "how_old": 2,
    "contact": {
      "number": "+91 7654321093",
      "email": "book@amritsararena3.com",
      "social_media": {
        "facebook": "https://facebook.com/amritsararena3",
        "instagram": "https://instagram.com/amritsararena3",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Cafeteria and changing rooms, accessible for all ages."
  },
  {
    "name": "Amritsar Arena 4",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Amritsar+Arena+4",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Amritsar+Arena+4+Photo+1"
    ],
    "sport": [
      "Tennis"
    ],
    "money_to_book": "INR 800/hour",
    "timing": "Daily 9:00 AM - 8:00 PM",
    "how_old": 4,
    "contact": {
      "number": "+91 9123456783",
      "email": "book@amritsararena4.com",
      "social_media": {
        "facebook": "https://facebook.com/amritsararena4",
        "instagram": "https://instagram.com/amritsararena4",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Multi-sport complex with indoor and outdoor facilities."
  },
  {
    "name": "Amritsar Arena 5",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Amritsar+Arena+5",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Amritsar+Arena+5+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Amritsar+Arena+5+Photo+2"
    ],
    "sport": [
      "Basketball"
    ],
    "money_to_book": "INR 650/hour",
    "timing": "Daily 10:00 AM - 7:00 PM",
    "how_old": 1,
    "contact": {
      "number": "+91 8012345673",
      "email": "book@amritsararena5.com",
      "social_media": {
        "facebook": "https://facebook.com/amritsararena5",
        "instagram": "https://instagram.com/amritsararena5",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Turf ground, suitable for competitive matches."
  },
  {
    "name": "Jalandhar Arena 1",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Jalandhar+Arena+1",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Jalandhar+Arena+1+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Jalandhar+Arena+1+Photo+2"
    ],
    "sport": [
      "Football"
    ],
    "money_to_book": "INR 1000/hour",
    "timing": "Daily 7:00 AM - 9:00 PM",
    "how_old": 2,
    "contact": {
      "number": "+91 8765432104",
      "email": "book@jalandhararena1.com",
      "social_media": {
        "facebook": "https://facebook.com/jalandhararena1",
        "instagram": "https://instagram.com/jalandhararena1",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Floodlit for night play, ample parking available."
  },
  {
    "name": "Jalandhar Arena 2",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Jalandhar+Arena+2",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Jalandhar+Arena+2+Photo+1"
    ],
    "sport": [
      "Cricket"
    ],
    "money_to_book": "INR 1300/hour",
    "timing": "Daily 8:00 AM - 10:00 PM",
    "how_old": 4,
    "contact": {
      "number": "+91 9876543214",
      "email": "book@jalandhararena2.com",
      "social_media": {
        "facebook": "https://facebook.com/jalandhararena2",
        "instagram": "https://instagram.com/jalandhararena2",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Professional coaching staff on-site, equipment rental."
  },
  {
    "name": "Jalandhar Arena 3",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Jalandhar+Arena+3",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Jalandhar+Arena+3+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Jalandhar+Arena+3+Photo+2"
    ],
    "sport": [
      "Badminton"
    ],
    "money_to_book": "INR 400/hour",
    "timing": "Daily 6:00 AM - 11:00 PM",
    "how_old": 1,
    "contact": {
      "number": "+91 7654321094",
      "email": "book@jalandhararena3.com",
      "social_media": {
        "facebook": "https://facebook.com/jalandhararena3",
        "instagram": "https://instagram.com/jalandhararena3",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Cafeteria and changing rooms, accessible for all ages."
  },
  {
    "name": "Jalandhar Arena 4",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Jalandhar+Arena+4",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Jalandhar+Arena+4+Photo+1"
    ],
    "sport": [
      "Tennis"
    ],
    "money_to_book": "INR 700/hour",
    "timing": "Daily 9:00 AM - 8:00 PM",
    "how_old": 3,
    "contact": {
      "number": "+91 9123456784",
      "email": "book@jalandhararena4.com",
      "social_media": {
        "facebook": "https://facebook.com/jalandhararena4",
        "instagram": "https://instagram.com/jalandhararena4",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Multi-sport complex with indoor and outdoor facilities."
  },
  {
    "name": "Jalandhar Arena 5",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Jalandhar+Arena+5",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Jalandhar+Arena+5+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Jalandhar+Arena+5+Photo+2"
    ],
    "sport": [
      "Basketball"
    ],
    "money_to_book": "INR 600/hour",
    "timing": "Daily 10:00 AM - 7:00 PM",
    "how_old": 6,
    "contact": {
      "number": "+91 8012345674",
      "email": "book@jalandhararena5.com",
      "social_media": {
        "facebook": "https://facebook.com/jalandhararena5",
        "instagram": "https://instagram.com/jalandhararena5",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Turf ground, suitable for competitive matches."
  },
  {
    "name": "Patiala Arena 1",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Patiala+Arena+1",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Patiala+Arena+1+Photo+1",
      "https://placehold.co/600x400/CCCCCC/333333?text=Patiala+Arena+1+Photo+2"
    ],
    "sport": [
      "Football"
    ],
    "money_to_book": "INR 900/hour",
    "timing": "Daily 7:00 AM - 9:00 PM",
    "how_old": 3,
    "contact": {
      "number": "+91 8765432105",
      "email": "book@patialaarena1.com",
      "social_media": {
        "facebook": "https://facebook.com/patialaarena1",
        "instagram": "https://instagram.com/patialaarena1",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Floodlit for night play, ample parking available."
  },
  {
    "name": "Patiala Arena 2",
    "logo": "https://placehold.co/100x100/4CAF50/FFFFFF?text=Patiala+Arena+2",
    "photos_of_ground": [
      "https://placehold.co/600x400/CCCCCC/333333?text=Patiala+Arena+2+Photo+1"
    ],
    "sport": [
      "Cricket"
    ],
    "money_to_book": "INR 1200/hour",
    "timing": "Daily 8:00 AM - 10:00 PM",
    "how_old": 5,
    "contact": {
      "number": "+91 9876543215",
      "email": "book@patialaarena2.com",
      "social_media": {
        "facebook": "https://facebook.com/patialaarena2",
        "instagram": "https://instagram.com/patialaarena2",
        "linkedin": "",
        "youtube": ""
      }
    },
    "important_data_to_be_shown": "Professional coaching staff on-site, equipment rental."
  }
]


// Connect to MongoDB using your existing URI
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ MongoDB connected for club seeding");
}).catch((err) => {
  console.error("❌ MongoDB connection error:", err);
  process.exit(1);
});

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    await Ground.insertMany(sampleGrounds);

    console.log('✅ Database seeded with Grounds data.');
    process.exit();
  } catch (err) {
    console.error('❌ Error seeding database:', err);
    process.exit(1);
  }
};

seedDB();