const mongoose = require("mongoose");
const dotenv = require("dotenv");
const OtherClub = require("../models/other-clubs-model");

dotenv.config(); 


const sampleClubs=[
  {
    "name": "Rush Sports Arena",
    "location": "Bengaluru, Karnataka",
    "description": "Premier multi-sport facility offering football, badminton, squash, and corporate events.",
    "founded": 2018,
    "type": "Private",
    "sports": [
      "Football",
      "Badminton",
      "Squash"
    ],
    "website": "https://www.myrush.in",
    "logo": "https://upload.wikimedia.org/wikipedia/en/4/4e/Bengaluru_FC_Logo.svg",
    "contact": {
      "number": "+91 7624898999",
      "email": "harsha@myrush.in",
      "social_media": {
        "facebook": "https://facebook.com/rushsports",
        "instagram": "https://instagram.com/rushsports",
        "linkedin": "https://linkedin.com/company/rushsports",
        "youtube": "https://youtube.com/rushsports"
      }
    }
  },
  {
    "name": "Padukone-Dravid Centre For Sports Excellence",
    "location": "Bengaluru, Karnataka",
    "description": "Elite multi-sport facility with world-class infrastructure for various sports.",
    "founded": 2017,
    "type": "Private",
    "sports": [
      "Badminton",
      "Cricket",
      "Football",
      "Swimming",
      "Athletics",
      "Basketball"
    ],
    "website": "https://pdcesports.com",
    "logo": "https://pdcesports.com/wp-content/uploads/2017/08/PDCSE-Logo-New.png",
    "contact": {
      "number": "+91 80 2795 8000",
      "email": "info@pdcesports.com",
      "social_media": {
        "facebook": "https://www.facebook.com/PDCSEsports/",
        "instagram": "https://www.instagram.com/pdcesports/",
        "linkedin": "https://www.linkedin.com/company/padukone-dravid-centre-for-sports-excellence/",
        "youtube": "https://www.youtube.com/channel/UCy_10X_2p_0k_0w_0j_0qA"
      }
    }
  },
  {
    "name": "Mumbai Sports Academy 1",
    "location": "Mumbai, Maharashtra",
    "description": "A leading sports academy in Mumbai, Maharashtra focusing on youth development.",
    "founded": 2012,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Badminton",
      "Basketball"
    ],
    "website": "https://www.mumbaisportsacademy1.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Mumbai+Sports+Academy+1",
    "contact": {
      "number": "+91 8325740453",
      "email": "info@mumbaisportsacademy1.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaisportsacademy1",
        "instagram": "https://instagram.com/mumbaisportsacademy1",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Mumbai Sports Academy 2",
    "location": "Mumbai, Maharashtra",
    "description": "A leading sports academy in Mumbai, Maharashtra focusing on youth development.",
    "founded": 2004,
    "type": "Academy",
    "sports": [
      "Athletics",
      "Squash"
    ],
    "website": "https://www.mumbaisportsacademy2.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Mumbai+Sports+Academy+2",
    "contact": {
      "number": "+91 8049281734",
      "email": "info@mumbaisportsacademy2.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaisportsacademy2",
        "instagram": "https://instagram.com/mumbaisportsacademy2",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Mumbai Sports Academy 3",
    "location": "Mumbai, Maharashtra",
    "description": "A leading sports academy in Mumbai, Maharashtra focusing on youth development.",
    "founded": 2000,
    "type": "Academy",
    "sports": [
      "Football",
      "Swimming",
      "Basketball",
      "Table Tennis"
    ],
    "website": "https://www.mumbaisportsacademy3.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Mumbai+Sports+Academy+3",
    "contact": {
      "number": "+91 8943706037",
      "email": "info@mumbaisportsacademy3.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaisportsacademy3",
        "instagram": "https://instagram.com/mumbaisportsacademy3",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Mumbai Sports Academy 4",
    "location": "Mumbai, Maharashtra",
    "description": "A leading sports academy in Mumbai, Maharashtra focusing on youth development.",
    "founded": 2017,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Badminton",
      "Swimming"
    ],
    "website": "https://www.mumbaisportsacademy4.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Mumbai+Sports+Academy+4",
    "contact": {
      "number": "+91 8328005367",
      "email": "info@mumbaisportsacademy4.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaisportsacademy4",
        "instagram": "https://instagram.com/mumbaisportsacademy4",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Mumbai Sports Academy 5",
    "location": "Mumbai, Maharashtra",
    "description": "A leading sports academy in Mumbai, Maharashtra focusing on youth development.",
    "founded": 2005,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Squash"
    ],
    "website": "https://www.mumbaisportsacademy5.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Mumbai+Sports+Academy+5",
    "contact": {
      "number": "+91 9772186708",
      "email": "info@mumbaisportsacademy5.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaisportsacademy5",
        "instagram": "https://instagram.com/mumbaisportsacademy5",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Mumbai Sports Academy 6",
    "location": "Mumbai, Maharashtra",
    "description": "A leading sports academy in Mumbai, Maharashtra focusing on youth development.",
    "founded": 2005,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Swimming",
      "Table Tennis"
    ],
    "website": "https://www.mumbaisportsacademy6.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Mumbai+Sports+Academy+6",
    "contact": {
      "number": "+91 7990145266",
      "email": "info@mumbaisportsacademy6.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaisportsacademy6",
        "instagram": "https://instagram.com/mumbaisportsacademy6",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Mumbai Sports Academy 7",
    "location": "Mumbai, Maharashtra",
    "description": "A leading sports academy in Mumbai, Maharashtra focusing on youth development.",
    "founded": 1999,
    "type": "Academy",
    "sports": [
      "Badminton",
      "Tennis",
      "Basketball"
    ],
    "website": "https://www.mumbaisportsacademy7.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Mumbai+Sports+Academy+7",
    "contact": {
      "number": "+91 9741270258",
      "email": "info@mumbaisportsacademy7.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaisportsacademy7",
        "instagram": "https://instagram.com/mumbaisportsacademy7",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Mumbai Sports Academy 8",
    "location": "Mumbai, Maharashtra",
    "description": "A leading sports academy in Mumbai, Maharashtra focusing on youth development.",
    "founded": 2018,
    "type": "Academy",
    "sports": [
      "Badminton",
      "Swimming",
      "Basketball"
    ],
    "website": "https://www.mumbaisportsacademy8.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Mumbai+Sports+Academy+8",
    "contact": {
      "number": "+91 8727653860",
      "email": "info@mumbaisportsacademy8.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaisportsacademy8",
        "instagram": "https://instagram.com/mumbaisportsacademy8",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Mumbai Sports Academy 9",
    "location": "Mumbai, Maharashtra",
    "description": "A leading sports academy in Mumbai, Maharashtra focusing on youth development.",
    "founded": 2019,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Badminton",
      "Swimming"
    ],
    "website": "https://www.mumbaisportsacademy9.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Mumbai+Sports+Academy+9",
    "contact": {
      "number": "+91 9651717336",
      "email": "info@mumbaisportsacademy9.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaisportsacademy9",
        "instagram": "https://instagram.com/mumbaisportsacademy9",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Mumbai Sports Academy 10",
    "location": "Mumbai, Maharashtra",
    "description": "A leading sports academy in Mumbai, Maharashtra focusing on youth development.",
    "founded": 2003,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Athletics",
      "Basketball"
    ],
    "website": "https://www.mumbaisportsacademy10.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Mumbai+Sports+Academy+10",
    "contact": {
      "number": "+91 9170566318",
      "email": "info@mumbaisportsacademy10.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaisportsacademy10",
        "instagram": "https://instagram.com/mumbaisportsacademy10",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Mumbai Sports Academy 11",
    "location": "Mumbai, Maharashtra",
    "description": "A leading sports academy in Mumbai, Maharashtra focusing on youth development.",
    "founded": 1993,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Tennis",
      "Swimming"
    ],
    "website": "https://www.mumbaisportsacademy11.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Mumbai+Sports+Academy+11",
    "contact": {
      "number": "+91 7924840810",
      "email": "info@mumbaisportsacademy11.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaisportsacademy11",
        "instagram": "https://instagram.com/mumbaisportsacademy11",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Mumbai Sports Academy 12",
    "location": "Mumbai, Maharashtra",
    "description": "A leading sports academy in Mumbai, Maharashtra focusing on youth development.",
    "founded": 1996,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Tennis",
      "Swimming",
      "Table Tennis"
    ],
    "website": "https://www.mumbaisportsacademy12.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Mumbai+Sports+Academy+12",
    "contact": {
      "number": "+91 8092801456",
      "email": "info@mumbaisportsacademy12.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaisportsacademy12",
        "instagram": "https://instagram.com/mumbaisportsacademy12",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Mumbai Sports Academy 13",
    "location": "Mumbai, Maharashtra",
    "description": "A leading sports academy in Mumbai, Maharashtra focusing on youth development.",
    "founded": 2007,
    "type": "Academy",
    "sports": [
      "Football",
      "Tennis",
      "Swimming"
    ],
    "website": "https://www.mumbaisportsacademy13.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Mumbai+Sports+Academy+13",
    "contact": {
      "number": "+91 8213794356",
      "email": "info@mumbaisportsacademy13.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaisportsacademy13",
        "instagram": "https://instagram.com/mumbaisportsacademy13",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Mumbai Sports Academy 14",
    "location": "Mumbai, Maharashtra",
    "description": "A leading sports academy in Mumbai, Maharashtra focusing on youth development.",
    "founded": 2013,
    "type": "Academy",
    "sports": [
      "Football",
      "Badminton",
      "Tennis",
      "Swimming"
    ],
    "website": "https://www.mumbaisportsacademy14.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Mumbai+Sports+Academy+14",
    "contact": {
      "number": "+91 9332219803",
      "email": "info@mumbaisportsacademy14.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaisportsacademy14",
        "instagram": "https://instagram.com/mumbaisportsacademy14",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Mumbai Sports Academy 15",
    "location": "Mumbai, Maharashtra",
    "description": "A leading sports academy in Mumbai, Maharashtra focusing on youth development.",
    "founded": 2009,
    "type": "Academy",
    "sports": [
      "Football",
      "Badminton",
      "Tennis"
    ],
    "website": "https://www.mumbaisportsacademy15.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Mumbai+Sports+Academy+15",
    "contact": {
      "number": "+91 7575355605",
      "email": "info@mumbaisportsacademy15.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaisportsacademy15",
        "instagram": "https://instagram.com/mumbaisportsacademy15",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Mumbai Sports Academy 16",
    "location": "Mumbai, Maharashtra",
    "description": "A leading sports academy in Mumbai, Maharashtra focusing on youth development.",
    "founded": 2009,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Badminton",
      "Swimming"
    ],
    "website": "https://www.mumbaisportsacademy16.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Mumbai+Sports+Academy+16",
    "contact": {
      "number": "+91 9928507204",
      "email": "info@mumbaisportsacademy16.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaisportsacademy16",
        "instagram": "https://instagram.com/mumbaisportsacademy16",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Mumbai Sports Academy 17",
    "location": "Mumbai, Maharashtra",
    "description": "A leading sports academy in Mumbai, Maharashtra focusing on youth development.",
    "founded": 1993,
    "type": "Academy",
    "sports": [
      "Football",
      "Badminton",
      "Basketball"
    ],
    "website": "https://www.mumbaisportsacademy17.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Mumbai+Sports+Academy+17",
    "contact": {
      "number": "+91 9662887610",
      "email": "info@mumbaisportsacademy17.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaisportsacademy17",
        "instagram": "https://instagram.com/mumbaisportsacademy17",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Mumbai Sports Academy 18",
    "location": "Mumbai, Maharashtra",
    "description": "A leading sports academy in Mumbai, Maharashtra focusing on youth development.",
    "founded": 2005,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Badminton",
      "Swimming"
    ],
    "website": "https://www.mumbaisportsacademy18.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Mumbai+Sports+Academy+18",
    "contact": {
      "number": "+91 7606775585",
      "email": "info@mumbaisportsacademy18.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaisportsacademy18",
        "instagram": "https://instagram.com/mumbaisportsacademy18",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Mumbai Sports Academy 19",
    "location": "Mumbai, Maharashtra",
    "description": "A leading sports academy in Mumbai, Maharashtra focusing on youth development.",
    "founded": 2012,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Badminton",
      "Swimming",
      "Basketball"
    ],
    "website": "https://www.mumbaisportsacademy19.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Mumbai+Sports+Academy+19",
    "contact": {
      "number": "+91 9369904977",
      "email": "info@mumbaisportsacademy19.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaisportsacademy19",
        "instagram": "https://instagram.com/mumbaisportsacademy19",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Mumbai Sports Academy 20",
    "location": "Mumbai, Maharashtra",
    "description": "A leading sports academy in Mumbai, Maharashtra focusing on youth development.",
    "founded": 2017,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Swimming"
    ],
    "website": "https://www.mumbaisportsacademy20.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Mumbai+Sports+Academy+20",
    "contact": {
      "number": "+91 7167664673",
      "email": "info@mumbaisportsacademy20.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaisportsacademy20",
        "instagram": "https://instagram.com/mumbaisportsacademy20",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Mumbai Sports Academy 21",
    "location": "Mumbai, Maharashtra",
    "description": "A leading sports academy in Mumbai, Maharashtra focusing on youth development.",
    "founded": 2009,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Badminton",
      "Athletics"
    ],
    "website": "https://www.mumbaisportsacademy21.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Mumbai+Sports+Academy+21",
    "contact": {
      "number": "+91 9794026362",
      "email": "info@mumbaisportsacademy21.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaisportsacademy21",
        "instagram": "https://instagram.com/mumbaisportsacademy21",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Mumbai Sports Academy 22",
    "location": "Mumbai, Maharashtra",
    "description": "A leading sports academy in Mumbai, Maharashtra focusing on youth development.",
    "founded": 1999,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Swimming"
    ],
    "website": "https://www.mumbaisportsacademy22.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Mumbai+Sports+Academy+22",
    "contact": {
      "number": "+91 7575306915",
      "email": "info@mumbaisportsacademy22.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaisportsacademy22",
        "instagram": "https://instagram.com/mumbaisportsacademy22",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Mumbai Sports Academy 23",
    "location": "Mumbai, Maharashtra",
    "description": "A leading sports academy in Mumbai, Maharashtra focusing on youth development.",
    "founded": 2011,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Basketball",
      "Squash"
    ],
    "website": "https://www.mumbaisportsacademy23.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Mumbai+Sports+Academy+23",
    "contact": {
      "number": "+91 9329712615",
      "email": "info@mumbaisportsacademy23.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaisportsacademy23",
        "instagram": "https://instagram.com/mumbaisportsacademy23",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Mumbai Sports Academy 24",
    "location": "Mumbai, Maharashtra",
    "description": "A leading sports academy in Mumbai, Maharashtra focusing on youth development.",
    "founded": 2008,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Badminton",
      "Swimming"
    ],
    "website": "https://www.mumbaisportsacademy24.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Mumbai+Sports+Academy+24",
    "contact": {
      "number": "+91 8023151740",
      "email": "info@mumbaisportsacademy24.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaisportsacademy24",
        "instagram": "https://instagram.com/mumbaisportsacademy24",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Mumbai Sports Academy 25",
    "location": "Mumbai, Maharashtra",
    "description": "A leading sports academy in Mumbai, Maharashtra focusing on youth development.",
    "founded": 2012,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Badminton",
      "Swimming"
    ],
    "website": "https://www.mumbaisportsacademy25.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Mumbai+Sports+Academy+25",
    "contact": {
      "number": "+91 9360341763",
      "email": "info@mumbaisportsacademy25.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaisportsacademy25",
        "instagram": "https://instagram.com/mumbaisportsacademy25",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Mumbai Sports Academy 26",
    "location": "Mumbai, Maharashtra",
    "description": "A leading sports academy in Mumbai, Maharashtra focusing on youth development.",
    "founded": 2017,
    "type": "Academy",
    "sports": [
      "Football",
      "Swimming",
      "Athletics"
    ],
    "website": "https://www.mumbaisportsacademy26.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Mumbai+Sports+Academy+26",
    "contact": {
      "number": "+91 7480521633",
      "email": "info@mumbaisportsacademy26.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaisportsacademy26",
        "instagram": "https://instagram.com/mumbaisportsacademy26",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Mumbai Sports Academy 27",
    "location": "Mumbai, Maharashtra",
    "description": "A leading sports academy in Mumbai, Maharashtra focusing on youth development.",
    "founded": 2011,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Athletics",
      "Basketball",
      "Table Tennis"
    ],
    "website": "https://www.mumbaisportsacademy27.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Mumbai+Sports+Academy+27",
    "contact": {
      "number": "+91 7990520626",
      "email": "info@mumbaisportsacademy27.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaisportsacademy27",
        "instagram": "https://instagram.com/mumbaisportsacademy27",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Mumbai Sports Academy 28",
    "location": "Mumbai, Maharashtra",
    "description": "A leading sports academy in Mumbai, Maharashtra focusing on youth development.",
    "founded": 2003,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Badminton",
      "Swimming"
    ],
    "website": "https://www.mumbaisportsacademy28.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Mumbai+Sports+Academy+28",
    "contact": {
      "number": "+91 7991963242",
      "email": "info@mumbaisportsacademy28.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaisportsacademy28",
        "instagram": "https://instagram.com/mumbaisportsacademy28",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Mumbai Sports Academy 29",
    "location": "Mumbai, Maharashtra",
    "description": "A leading sports academy in Mumbai, Maharashtra focusing on youth development.",
    "founded": 2009,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Badminton",
      "Basketball",
      "Squash"
    ],
    "website": "https://www.mumbaisportsacademy29.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Mumbai+Sports+Academy+29",
    "contact": {
      "number": "+91 8016489360",
      "email": "info@mumbaisportsacademy29.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaisportsacademy29",
        "instagram": "https://instagram.com/mumbaisportsacademy29",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Mumbai Sports Academy 30",
    "location": "Mumbai, Maharashtra",
    "description": "A leading sports academy in Mumbai, Maharashtra focusing on youth development.",
    "founded": 2006,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Badminton",
      "Swimming"
    ],
    "website": "https://www.mumbaisportsacademy30.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Mumbai+Sports+Academy+30",
    "contact": {
      "number": "+91 7954546401",
      "email": "info@mumbaisportsacademy30.com",
      "social_media": {
        "facebook": "https://facebook.com/mumbaisportsacademy30",
        "instagram": "https://instagram.com/mumbaisportsacademy30",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Mumbai Sports Complex 1",
    "location": "Mumbai, Maharashtra",
    "description": "A popular multi-sport complex in Mumbai, Maharashtra with various facilities.",
    "founded": 2006,
    "type": "Public",
    "sports": [
      "Swimming",
      "Basketball"
    ],
    "website": "https://www.mumbaisportscomplex1.com",
    "logo": "https://placehold.co/100x100/ADD8E6/000000?text=Mumbai+Sports+Complex+1",
    "contact": {
      "number": "+91 7378377017",
      "email": "contact@mumbaisportscomplex1.com",
      "social_media": {}
    }
  },
  {
    "name": "Mumbai Sports Complex 2",
    "location": "Mumbai, Maharashtra",
    "description": "A popular multi-sport complex in Mumbai, Maharashtra with various facilities.",
    "founded": 2005,
    "type": "Public",
    "sports": [
      "Basketball",
      "Volleyball",
      "Yoga"
    ],
    "website": "https://www.mumbaisportscomplex2.com",
    "logo": "https://placehold.co/100x100/ADD8E6/000000?text=Mumbai+Sports+Complex+2",
    "contact": {
      "number": "+91 8593412701",
      "email": "contact@mumbaisportscomplex2.com",
      "social_media": {}
    }
  },
  {
    "name": "Mumbai Sports Complex 3",
    "location": "Mumbai, Maharashtra",
    "description": "A popular multi-sport complex in Mumbai, Maharashtra with various facilities.",
    "founded": 2007,
    "type": "Public",
    "sports": [
      "Swimming",
      "Gymnastics",
      "Zumba"
    ],
    "website": "https://www.mumbaisportscomplex3.com",
    "logo": "https://placehold.co/100x100/ADD8E6/000000?text=Mumbai+Sports+Complex+3",
    "contact": {
      "number": "+91 9170068469",
      "email": "contact@mumbaisportscomplex3.com",
      "social_media": {}
    }
  },
  {
    "name": "Mumbai Sports Complex 4",
    "location": "Mumbai, Maharashtra",
    "description": "A popular multi-sport complex in Mumbai, Maharashtra with various facilities.",
    "founded": 2009,
    "type": "Public",
    "sports": [
      "Swimming",
      "Gymnastics",
      "Basketball"
    ],
    "website": "https://www.mumbaisportscomplex4.com",
    "logo": "https://placehold.co/100x100/ADD8E6/000000?text=Mumbai+Sports+Complex+4",
    "contact": {
      "number": "+91 8459438902",
      "email": "contact@mumbaisportscomplex4.com",
      "social_media": {}
    }
  },
  {
    "name": "Mumbai Sports Complex 5",
    "location": "Mumbai, Maharashtra",
    "description": "A popular multi-sport complex in Mumbai, Maharashtra with various facilities.",
    "founded": 2011,
    "type": "Public",
    "sports": [
      "Swimming",
      "Basketball",
      "Volleyball"
    ],
    "website": "https://www.mumbaisportscomplex5.com",
    "logo": "https://placehold.co/100x100/ADD8E6/000000?text=Mumbai+Sports+Complex+5",
    "contact": {
      "number": "+91 7624022409",
      "email": "contact@mumbaisportscomplex5.com",
      "social_media": {}
    }
  },
  {
    "name": "Mumbai Sports Complex 6",
    "location": "Mumbai, Maharashtra",
    "description": "A popular multi-sport complex in Mumbai, Maharashtra with various facilities.",
    "founded": 2004,
    "type": "Public",
    "sports": [
      "Swimming",
      "Gymnastics",
      "Yoga"
    ],
    "website": "https://www.mumbaisportscomplex6.com",
    "logo": "https://placehold.co/100x100/ADD8E6/000000?text=Mumbai+Sports+Complex+6",
    "contact": {
      "number": "+91 9324683056",
      "email": "contact@mumbaisportscomplex6.com",
      "social_media": {}
    }
  },
  {
    "name": "Mumbai Sports Complex 7",
    "location": "Mumbai, Maharashtra",
    "description": "A popular multi-sport complex in Mumbai, Maharashtra with various facilities.",
    "founded": 2010,
    "type": "Public",
    "sports": [
      "Swimming",
      "Gymnastics",
      "Zumba"
    ],
    "website": "https://www.mumbaisportscomplex7.com",
    "logo": "https://placehold.co/100x100/ADD8E6/000000?text=Mumbai+Sports+Complex+7",
    "contact": {
      "number": "+91 8660374113",
      "email": "contact@mumbaisportscomplex7.com",
      "social_media": {}
    }
  },
  {
    "name": "Mumbai Sports Complex 8",
    "location": "Mumbai, Maharashtra",
    "description": "A popular multi-sport complex in Mumbai, Maharashtra with various facilities.",
    "founded": 2018,
    "type": "Public",
    "sports": [
      "Basketball",
      "Yoga"
    ],
    "website": "https://www.mumbaisportscomplex8.com",
    "logo": "https://placehold.co/100x100/ADD8E6/000000?text=Mumbai+Sports+Complex+8",
    "contact": {
      "number": "+91 7136056580",
      "email": "contact@mumbaisportscomplex8.com",
      "social_media": {}
    }
  },
  {
    "name": "Mumbai Sports Complex 9",
    "location": "Mumbai, Maharashtra",
    "description": "A popular multi-sport complex in Mumbai, Maharashtra with various facilities.",
    "founded": 2007,
    "type": "Public",
    "sports": [
      "Swimming",
      "Gymnastics",
      "Volleyball"
    ],
    "website": "https://www.mumbaisportscomplex9.com",
    "logo": "https://placehold.co/100x100/ADD8E6/000000?text=Mumbai+Sports+Complex+9",
    "contact": {
      "number": "+91 8094622177",
      "email": "contact@mumbaisportscomplex9.com",
      "social_media": {}
    }
  },
  {
    "name": "Mumbai Sports Complex 10",
    "location": "Mumbai, Maharashtra",
    "description": "A popular multi-sport complex in Mumbai, Maharashtra with various facilities.",
    "founded": 2014,
    "type": "Public",
    "sports": [
      "Swimming",
      "Gymnastics",
      "Basketball"
    ],
    "website": "https://www.mumbaisportscomplex10.com",
    "logo": "https://placehold.co/100x100/ADD8E6/000000?text=Mumbai+Sports+Complex+10",
    "contact": {
      "number": "+91 9772346765",
      "email": "contact@mumbaisportscomplex10.com",
      "social_media": {}
    }
  },
  {
    "name": "Mumbai Sports Complex 11",
    "location": "Mumbai, Maharashtra",
    "description": "A popular multi-sport complex in Mumbai, Maharashtra with various facilities.",
    "founded": 2000,
    "type": "Public",
    "sports": [
      "Swimming",
      "Gymnastics",
      "Volleyball"
    ],
    "website": "https://www.mumbaisportscomplex11.com",
    "logo": "https://placehold.co/100x100/ADD8E6/000000?text=Mumbai+Sports+Complex+11",
    "contact": {
      "number": "+91 7275619448",
      "email": "contact@mumbaisportscomplex11.com",
      "social_media": {}
    }
  },
  {
    "name": "Mumbai Sports Complex 12",
    "location": "Mumbai, Maharashtra",
    "description": "A popular multi-sport complex in Mumbai, Maharashtra with various facilities.",
    "founded": 2008,
    "type": "Public",
    "sports": [
      "Swimming",
      "Gymnastics",
      "Basketball"
    ],
    "website": "https://www.mumbaisportscomplex12.com",
    "logo": "https://placehold.co/100x100/ADD8E6/000000?text=Mumbai+Sports+Complex+12",
    "contact": {
      "number": "+91 7942857469",
      "email": "contact@mumbaisportscomplex12.com",
      "social_media": {}
    }
  },
  {
    "name": "Mumbai Sports Complex 13",
    "location": "Mumbai, Maharashtra",
    "description": "A popular multi-sport complex in Mumbai, Maharashtra with various facilities.",
    "founded": 2004,
    "type": "Public",
    "sports": [
      "Swimming",
      "Volleyball",
      "Yoga"
    ],
    "website": "https://www.mumbaisportscomplex13.com",
    "logo": "https://placehold.co/100x100/ADD8E6/000000?text=Mumbai+Sports+Complex+13",
    "contact": {
      "number": "+91 9091936450",
      "email": "contact@mumbaisportscomplex13.com",
      "social_media": {}
    }
  },
  {
    "name": "Mumbai Sports Complex 14",
    "location": "Mumbai, Maharashtra",
    "description": "A popular multi-sport complex in Mumbai, Maharashtra with various facilities.",
    "founded": 2002,
    "type": "Public",
    "sports": [
      "Swimming",
      "Gymnastics",
      "Volleyball"
    ],
    "website": "https://www.mumbaisportscomplex14.com",
    "logo": "https://placehold.co/100x100/ADD8E6/000000?text=Mumbai+Sports+Complex+14",
    "contact": {
      "number": "+91 7370830919",
      "email": "contact@mumbaisportscomplex14.com",
      "social_media": {}
    }
  },
  {
    "name": "Mumbai Sports Complex 15",
    "location": "Mumbai, Maharashtra",
    "description": "A popular multi-sport complex in Mumbai, Maharashtra with various facilities.",
    "founded": 2017,
    "type": "Public",
    "sports": [
      "Gymnastics",
      "Yoga",
      "Zumba"
    ],
    "website": "https://www.mumbaisportscomplex15.com",
    "logo": "https://placehold.co/100x100/ADD8E6/000000?text=Mumbai+Sports+Complex+15",
    "contact": {
      "number": "+91 8974577881",
      "email": "contact@mumbaisportscomplex15.com",
      "social_media": {}
    }
  },
  {
    "name": "Ahmedabad Sports Academy 1",
    "location": "Ahmedabad, Gujarat",
    "description": "A leading sports academy in Ahmedabad, Gujarat focusing on youth development.",
    "founded": 2006,
    "type": "Academy",
    "sports": [
      "Football",
      "Badminton",
      "Swimming"
    ],
    "website": "https://www.ahmedabadsportsacademy1.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Ahmedabad+Sports+Academy+1",
    "contact": {
      "number": "+91 7041761667",
      "email": "info@ahmedabadsportsacademy1.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadsportsacademy1",
        "instagram": "https://instagram.com/ahmedabadsportsacademy1",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Ahmedabad Sports Academy 2",
    "location": "Ahmedabad, Gujarat",
    "description": "A leading sports academy in Ahmedabad, Gujarat focusing on youth development.",
    "founded": 2010,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Badminton",
      "Swimming"
    ],
    "website": "https://www.ahmedabadsportsacademy2.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Ahmedabad+Sports+Academy+2",
    "contact": {
      "number": "+91 8943924355",
      "email": "info@ahmedabadsportsacademy2.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadsportsacademy2",
        "instagram": "https://instagram.com/ahmedabadsportsacademy2",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Ahmedabad Sports Academy 3",
    "location": "Ahmedabad, Gujarat",
    "description": "A leading sports academy in Ahmedabad, Gujarat focusing on youth development.",
    "founded": 2011,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Tennis",
      "Swimming"
    ],
    "website": "https://www.ahmedabadsportsacademy3.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Ahmedabad+Sports+Academy+3",
    "contact": {
      "number": "+91 7234674751",
      "email": "info@ahmedabadsportsacademy3.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadsportsacademy3",
        "instagram": "https://instagram.com/ahmedabadsportsacademy3",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Ahmedabad Sports Academy 4",
    "location": "Ahmedabad, Gujarat",
    "description": "A leading sports academy in Ahmedabad, Gujarat focusing on youth development.",
    "founded": 2018,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Tennis"
    ],
    "website": "https://www.ahmedabadsportsacademy4.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Ahmedabad+Sports+Academy+4",
    "contact": {
      "number": "+91 9361730768",
      "email": "info@ahmedabadsportsacademy4.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadsportsacademy4",
        "instagram": "https://instagram.com/ahmedabadsportsacademy4",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Ahmedabad Sports Academy 5",
    "location": "Ahmedabad, Gujarat",
    "description": "A leading sports academy in Ahmedabad, Gujarat focusing on youth development.",
    "founded": 2017,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Badminton",
      "Swimming"
    ],
    "website": "https://www.ahmedabadsportsacademy5.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Ahmedabad+Sports+Academy+5",
    "contact": {
      "number": "+91 9779377478",
      "email": "info@ahmedabadsportsacademy5.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadsportsacademy5",
        "instagram": "https://instagram.com/ahmedabadsportsacademy5",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Ahmedabad Sports Academy 6",
    "location": "Ahmedabad, Gujarat",
    "description": "A leading sports academy in Ahmedabad, Gujarat focusing on youth development.",
    "founded": 2002,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Badminton",
      "Athletics"
    ],
    "website": "https://www.ahmedabadsportsacademy6.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Ahmedabad+Sports+Academy+6",
    "contact": {
      "number": "+91 7380112106",
      "email": "info@ahmedabadsportsacademy6.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadsportsacademy6",
        "instagram": "https://instagram.com/ahmedabadsportsacademy6",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Ahmedabad Sports Academy 7",
    "location": "Ahmedabad, Gujarat",
    "description": "A leading sports academy in Ahmedabad, Gujarat focusing on youth development.",
    "founded": 2011,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Badminton",
      "Swimming"
    ],
    "website": "https://www.ahmedabadsportsacademy7.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Ahmedabad+Sports+Academy+7",
    "contact": {
      "number": "+91 9276223507",
      "email": "info@ahmedabadsportsacademy7.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadsportsacademy7",
        "instagram": "https://instagram.com/ahmedabadsportsacademy7",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Ahmedabad Sports Academy 8",
    "location": "Ahmedabad, Gujarat",
    "description": "A leading sports academy in Ahmedabad, Gujarat focusing on youth development.",
    "founded": 2004,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Badminton",
      "Swimming"
    ],
    "website": "https://www.ahmedabadsportsacademy8.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Ahmedabad+Sports+Academy+8",
    "contact": {
      "number": "+91 8272849032",
      "email": "info@ahmedabadsportsacademy8.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadsportsacademy8",
        "instagram": "https://instagram.com/ahmedabadsportsacademy8",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Ahmedabad Sports Academy 9",
    "location": "Ahmedabad, Gujarat",
    "description": "A leading sports academy in Ahmedabad, Gujarat focusing on youth development.",
    "founded": 2011,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Badminton"
    ],
    "website": "https://www.ahmedabadsportsacademy9.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Ahmedabad+Sports+Academy+9",
    "contact": {
      "number": "+91 9924510793",
      "email": "info@ahmedabadsportsacademy9.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadsportsacademy9",
        "instagram": "https://instagram.com/ahmedabadsportsacademy9",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Ahmedabad Sports Academy 10",
    "location": "Ahmedabad, Gujarat",
    "description": "A leading sports academy in Ahmedabad, Gujarat focusing on youth development.",
    "founded": 2009,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Badminton",
      "Swimming"
    ],
    "website": "https://www.ahmedabadsportsacademy10.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Ahmedabad+Sports+Academy+10",
    "contact": {
      "number": "+91 8769363063",
      "email": "info@ahmedabadsportsacademy10.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadsportsacademy10",
        "instagram": "https://instagram.com/ahmedabadsportsacademy10",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Ahmedabad Sports Academy 11",
    "location": "Ahmedabad, Gujarat",
    "description": "A leading sports academy in Ahmedabad, Gujarat focusing on youth development.",
    "founded": 2005,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Swimming"
    ],
    "website": "https://www.ahmedabadsportsacademy11.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Ahmedabad+Sports+Academy+11",
    "contact": {
      "number": "+91 9172276993",
      "email": "info@ahmedabadsportsacademy11.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadsportsacademy11",
        "instagram": "https://instagram.com/ahmedabadsportsacademy11",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Ahmedabad Sports Academy 12",
    "location": "Ahmedabad, Gujarat",
    "description": "A leading sports academy in Ahmedabad, Gujarat focusing on youth development.",
    "founded": 2002,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Badminton",
      "Swimming"
    ],
    "website": "https://www.ahmedabadsportsacademy12.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Ahmedabad+Sports+Academy+12",
    "contact": {
      "number": "+91 7606704047",
      "email": "info@ahmedabadsportsacademy12.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadsportsacademy12",
        "instagram": "https://instagram.com/ahmedabadsportsacademy12",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Ahmedabad Sports Academy 13",
    "location": "Ahmedabad, Gujarat",
    "description": "A leading sports academy in Ahmedabad, Gujarat focusing on youth development.",
    "founded": 2005,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Badminton",
      "Swimming"
    ],
    "website": "https://www.ahmedabadsportsacademy13.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Ahmedabad+Sports+Academy+13",
    "contact": {
      "number": "+91 8213893386",
      "email": "info@ahmedabadsportsacademy13.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadsportsacademy13",
        "instagram": "https://instagram.com/ahmedabadsportsacademy13",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Ahmedabad Sports Academy 14",
    "location": "Ahmedabad, Gujarat",
    "description": "A leading sports academy in Ahmedabad, Gujarat focusing on youth development.",
    "founded": 2009,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Badminton",
      "Swimming"
    ],
    "website": "https://www.ahmedabadsportsacademy14.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Ahmedabad+Sports+Academy+14",
    "contact": {
      "number": "+91 9771694263",
      "email": "info@ahmedabadsportsacademy14.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadsportsacademy14",
        "instagram": "https://instagram.com/ahmedabadsportsacademy14",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Ahmedabad Sports Academy 15",
    "location": "Ahmedabad, Gujarat",
    "description": "A leading sports academy in Ahmedabad, Gujarat focusing on youth development.",
    "founded": 2002,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Badminton",
      "Swimming"
    ],
    "website": "https://www.ahmedabadsportsacademy15.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Ahmedabad+Sports+Academy+15",
    "contact": {
      "number": "+91 7480838334",
      "email": "info@ahmedabadsportsacademy15.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadsportsacademy15",
        "instagram": "https://instagram.com/ahmedabadsportsacademy15",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Ahmedabad Sports Academy 16",
    "location": "Ahmedabad, Gujarat",
    "description": "A leading sports academy in Ahmedabad, Gujarat focusing on youth development.",
    "founded": 2011,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Badminton",
      "Swimming"
    ],
    "website": "https://www.ahmedabadsportsacademy16.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Ahmedabad+Sports+Academy+16",
    "contact": {
      "number": "+91 7942152865",
      "email": "info@ahmedabadsportsacademy16.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadsportsacademy16",
        "instagram": "https://instagram.com/ahmedabadsportsacademy16",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Ahmedabad Sports Academy 17",
    "location": "Ahmedabad, Gujarat",
    "description": "A leading sports academy in Ahmedabad, Gujarat focusing on youth development.",
    "founded": 2012,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Badminton",
      "Swimming"
    ],
    "website": "https://www.ahmedabadsportsacademy17.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Ahmedabad+Sports+Academy+17",
    "contact": {
      "number": "+91 7041926673",
      "email": "info@ahmedabadsportsacademy17.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadsportsacademy17",
        "instagram": "https://instagram.com/ahmedabadsportsacademy17",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Ahmedabad Sports Academy 18",
    "location": "Ahmedabad, Gujarat",
    "description": "A leading sports academy in Ahmedabad, Gujarat focusing on youth development.",
    "founded": 2004,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Badminton",
      "Swimming"
    ],
    "website": "https://www.ahmedabadsportsacademy18.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Ahmedabad+Sports+Academy+18",
    "contact": {
      "number": "+91 7941761400",
      "email": "info@ahmedabadsportsacademy18.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadsportsacademy18",
        "instagram": "https://instagram.com/ahmedabadsportsacademy18",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Ahmedabad Sports Academy 19",
    "location": "Ahmedabad, Gujarat",
    "description": "A leading sports academy in Ahmedabad, Gujarat focusing on youth development.",
    "founded": 2004,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Badminton",
      "Swimming"
    ],
    "website": "https://www.ahmedabadsportsacademy19.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Ahmedabad+Sports+Academy+19",
    "contact": {
      "number": "+91 9360565297",
      "email": "info@ahmedabadsportsacademy19.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadsportsacademy19",
        "instagram": "https://instagram.com/ahmedabadsportsacademy19",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Ahmedabad Sports Academy 20",
    "location": "Ahmedabad, Gujarat",
    "description": "A leading sports academy in Ahmedabad, Gujarat focusing on youth development.",
    "founded": 2004,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Badminton",
      "Swimming"
    ],
    "website": "https://www.ahmedabadsportsacademy20.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Ahmedabad+Sports+Academy+20",
    "contact": {
      "number": "+91 9361730768",
      "email": "info@ahmedabadsportsacademy20.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadsportsacademy20",
        "instagram": "https://instagram.com/ahmedabadsportsacademy20",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Ahmedabad Sports Academy 21",
    "location": "Ahmedabad, Gujarat",
    "description": "A leading sports academy in Ahmedabad, Gujarat focusing on youth development.",
    "founded": 2004,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Badminton",
      "Swimming"
    ],
    "website": "https://www.ahmedabadsportsacademy21.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Ahmedabad+Sports+Academy+21",
    "contact": {
      "number": "+91 9361730768",
      "email": "info@ahmedabadsportsacademy21.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadsportsacademy21",
        "instagram": "https://instagram.com/ahmedabadsportsacademy21",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Ahmedabad Sports Academy 22",
    "location": "Ahmedabad, Gujarat",
    "description": "A leading sports academy in Ahmedabad, Gujarat focusing on youth development.",
    "founded": 2004,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Badminton",
      "Swimming"
    ],
    "website": "https://www.ahmedabadsportsacademy22.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Ahmedabad+Sports+Academy+22",
    "contact": {
      "number": "+91 9361730768",
      "email": "info@ahmedabadsportsacademy22.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadsportsacademy22",
        "instagram": "https://instagram.com/ahmedabadsportsacademy22",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Ahmedabad Sports Academy 23",
    "location": "Ahmedabad, Gujarat",
    "description": "A leading sports academy in Ahmedabad, Gujarat focusing on youth development.",
    "founded": 2004,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Badminton",
      "Swimming"
    ],
    "website": "https://www.ahmedabadsportsacademy23.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Ahmedabad+Sports+Academy+23",
    "contact": {
      "number": "+91 9361730768",
      "email": "info@ahmedabadsportsacademy23.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadsportsacademy23",
        "instagram": "https://instagram.com/ahmedabadsportsacademy23",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Ahmedabad Sports Academy 24",
    "location": "Ahmedabad, Gujarat",
    "description": "A leading sports academy in Ahmedabad, Gujarat focusing on youth development.",
    "founded": 2004,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Badminton",
      "Swimming"
    ],
    "website": "https://www.ahmedabadsportsacademy24.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Ahmedabad+Sports+Academy+24",
    "contact": {
      "number": "+91 9361730768",
      "email": "info@ahmedabadsportsacademy24.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadsportsacademy24",
        "instagram": "https://instagram.com/ahmedabadsportsacademy24",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Ahmedabad Sports Academy 25",
    "location": "Ahmedabad, Gujarat",
    "description": "A leading sports academy in Ahmedabad, Gujarat focusing on youth development.",
    "founded": 2004,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Badminton",
      "Swimming"
    ],
    "website": "https://www.ahmedabadsportsacademy25.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Ahmedabad+Sports+Academy+25",
    "contact": {
      "number": "+91 9361730768",
      "email": "info@ahmedabadsportsacademy25.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadsportsacademy25",
        "instagram": "https://instagram.com/ahmedabadsportsacademy25",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Ahmedabad Sports Academy 26",
    "location": "Ahmedabad, Gujarat",
    "description": "A leading sports academy in Ahmedabad, Gujarat focusing on youth development.",
    "founded": 2004,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Badminton",
      "Swimming"
    ],
    "website": "https://www.ahmedabadsportsacademy26.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Ahmedabad+Sports+Academy+26",
    "contact": {
      "number": "+91 9361730768",
      "email": "info@ahmedabadsportsacademy26.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadsportsacademy26",
        "instagram": "https://instagram.com/ahmedabadsportsacademy26",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Ahmedabad Sports Academy 27",
    "location": "Ahmedabad, Gujarat",
    "description": "A leading sports academy in Ahmedabad, Gujarat focusing on youth development.",
    "founded": 2004,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Badminton",
      "Swimming"
    ],
    "website": "https://www.ahmedabadsportsacademy27.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Ahmedabad+Sports+Academy+27",
    "contact": {
      "number": "+91 9361730768",
      "email": "info@ahmedabadsportsacademy27.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadsportsacademy27",
        "instagram": "https://instagram.com/ahmedabadsportsacademy27",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Ahmedabad Sports Academy 28",
    "location": "Ahmedabad, Gujarat",
    "description": "A leading sports academy in Ahmedabad, Gujarat focusing on youth development.",
    "founded": 2004,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Badminton",
      "Swimming"
    ],
    "website": "https://www.ahmedabadsportsacademy28.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Ahmedabad+Sports+Academy+28",
    "contact": {
      "number": "+91 9361730768",
      "email": "info@ahmedabadsportsacademy28.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadsportsacademy28",
        "instagram": "https://instagram.com/ahmedabadsportsacademy28",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Ahmedabad Sports Academy 29",
    "location": "Ahmedabad, Gujarat",
    "description": "A leading sports academy in Ahmedabad, Gujarat focusing on youth development.",
    "founded": 2004,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Badminton",
      "Swimming"
    ],
    "website": "https://www.ahmedabadsportsacademy29.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Ahmedabad+Sports+Academy+29",
    "contact": {
      "number": "+91 9361730768",
      "email": "info@ahmedabadsportsacademy29.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadsportsacademy29",
        "instagram": "https://instagram.com/ahmedabadsportsacademy29",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Ahmedabad Sports Academy 30",
    "location": "Ahmedabad, Gujarat",
    "description": "A leading sports academy in Ahmedabad, Gujarat focusing on youth development.",
    "founded": 2004,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Badminton",
      "Swimming"
    ],
    "website": "https://www.ahmedabadsportsacademy30.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Ahmedabad+Sports+Academy+30",
    "contact": {
      "number": "+91 9361730768",
      "email": "info@ahmedabadsportsacademy30.com",
      "social_media": {
        "facebook": "https://facebook.com/ahmedabadsportsacademy30",
        "instagram": "https://instagram.com/ahmedabadsportsacademy30",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Ahmedabad Sports Complex 1",
    "location": "Ahmedabad, Gujarat",
    "description": "A popular multi-sport complex in Ahmedabad, Gujarat with various facilities.",
    "founded": 2008,
    "type": "Public",
    "sports": [
      "Swimming",
      "Gymnastics",
      "Yoga"
    ],
    "website": "https://www.ahmedabadsportscomplex1.com",
    "logo": "https://placehold.co/100x100/ADD8E6/000000?text=Ahmedabad+Sports+Complex+1",
    "contact": {
      "number": "+91 7941761400",
      "email": "contact@ahmedabadsportscomplex1.com",
      "social_media": {}
    }
  },
  {
    "name": "Ahmedabad Sports Complex 2",
    "location": "Ahmedabad, Gujarat",
    "description": "A popular multi-sport complex in Ahmedabad, Gujarat with various facilities.",
    "founded": 2005,
    "type": "Public",
    "sports": [
      "Swimming",
      "Gymnastics",
      "Volleyball"
    ],
    "website": "https://www.ahmedabadsportscomplex2.com",
    "logo": "https://placehold.co/100x100/ADD8E6/000000?text=Ahmedabad+Sports+Complex+2",
    "contact": {
      "number": "+91 9360565297",
      "email": "contact@ahmedabadsportscomplex2.com",
      "social_media": {}
    }
  },
  {
    "name": "Ahmedabad Sports Complex 3",
    "location": "Ahmedabad, Gujarat",
    "description": "A popular multi-sport complex in Ahmedabad, Gujarat with various facilities.",
    "founded": 2002,
    "type": "Public",
    "sports": [
      "Swimming",
      "Gymnastics",
      "Basketball"
    ],
    "website": "https://www.ahmedabadsportscomplex3.com",
    "logo": "https://placehold.co/100x100/ADD8E6/000000?text=Ahmedabad+Sports+Complex+3",
    "contact": {
      "number": "+91 9361730768",
      "email": "contact@ahmedabadsportscomplex3.com",
      "social_media": {}
    }
  },
  {
    "name": "Ahmedabad Sports Complex 4",
    "location": "Ahmedabad, Gujarat",
    "description": "A popular multi-sport complex in Ahmedabad, Gujarat with various facilities.",
    "founded": 2004,
    "type": "Public",
    "sports": [
      "Swimming",
      "Gymnastics",
      "Volleyball"
    ],
    "website": "https://www.ahmedabadsportscomplex4.com",
    "logo": "https://placehold.co/100x100/ADD8E6/000000?text=Ahmedabad+Sports+Complex+4",
    "contact": {
      "number": "+91 9361730768",
      "email": "contact@ahmedabadsportscomplex4.com",
      "social_media": {}
    }
  },
  {
    "name": "Ahmedabad Sports Complex 5",
    "location": "Ahmedabad, Gujarat",
    "description": "A popular multi-sport complex in Ahmedabad, Gujarat with various facilities.",
    "founded": 2004,
    "type": "Public",
    "sports": [
      "Swimming",
      "Gymnastics",
      "Basketball"
    ],
    "website": "https://www.ahmedabadsportscomplex5.com",
    "logo": "https://placehold.co/100x100/ADD8E6/000000?text=Ahmedabad+Sports+Complex+5",
    "contact": {
      "number": "+91 9361730768",
      "email": "contact@ahmedabadsportscomplex5.com",
      "social_media": {}
    }
  },
  {
    "name": "Pune Sports Academy 1",
    "location": "Pune, Maharashtra",
    "description": "A leading sports academy in Pune, Maharashtra focusing on youth development.",
    "founded": 2017,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Badminton",
      "Swimming"
    ],
    "website": "https://www.punesportsacademy1.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Pune+Sports+Academy+1",
    "contact": {
      "number": "+91 7167664673",
      "email": "info@punesportsacademy1.com",
      "social_media": {
        "facebook": "https://facebook.com/punesportsacademy1",
        "instagram": "https://instagram.com/punesportsacademy1",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Pune Sports Academy 2",
    "location": "Pune, Maharashtra",
    "description": "A leading sports academy in Pune, Maharashtra focusing on youth development.",
    "founded": 2009,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Badminton",
      "Athletics"
    ],
    "website": "https://www.punesportsacademy2.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Pune+Sports+Academy+2",
    "contact": {
      "number": "+91 9794026362",
      "email": "info@punesportsacademy2.com",
      "social_media": {
        "facebook": "https://facebook.com/punesportsacademy2",
        "instagram": "https://instagram.com/punesportsacademy2",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Pune Sports Academy 3",
    "location": "Pune, Maharashtra",
    "description": "A leading sports academy in Pune, Maharashtra focusing on youth development.",
    "founded": 1999,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Swimming"
    ],
    "website": "https://www.punesportsacademy3.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Pune+Sports+Academy+3",
    "contact": {
      "number": "+91 7575306915",
      "email": "info@punesportsacademy3.com",
      "social_media": {
        "facebook": "https://facebook.com/punesportsacademy3",
        "instagram": "https://instagram.com/punesportsacademy3",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Pune Sports Academy 4",
    "location": "Pune, Maharashtra",
    "description": "A leading sports academy in Pune, Maharashtra focusing on youth development.",
    "founded": 2011,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Basketball",
      "Squash"
    ],
    "website": "https://www.punesportsacademy4.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Pune+Sports+Academy+4",
    "contact": {
      "number": "+91 9329712615",
      "email": "info@punesportsacademy4.com",
      "social_media": {
        "facebook": "https://facebook.com/punesportsacademy4",
        "instagram": "https://instagram.com/punesportsacademy4",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Pune Sports Academy 5",
    "location": "Pune, Maharashtra",
    "description": "A leading sports academy in Pune, Maharashtra focusing on youth development.",
    "founded": 2008,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Badminton",
      "Swimming"
    ],
    "website": "https://www.punesportsacademy5.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Pune+Sports+Academy+5",
    "contact": {
      "number": "+91 8023151740",
      "email": "info@punesportsacademy5.com",
      "social_media": {
        "facebook": "https://facebook.com/punesportsacademy5",
        "instagram": "https://instagram.com/punesportsacademy5",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Pune Sports Academy 6",
    "location": "Pune, Maharashtra",
    "description": "A leading sports academy in Pune, Maharashtra focusing on youth development.",
    "founded": 2012,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Badminton",
      "Swimming"
    ],
    "website": "https://www.punesportsacademy6.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Pune+Sports+Academy+6",
    "contact": {
      "number": "+91 9360341763",
      "email": "info@punesportsacademy6.com",
      "social_media": {
        "facebook": "https://facebook.com/punesportsacademy6",
        "instagram": "https://instagram.com/punesportsacademy6",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Pune Sports Academy 7",
    "location": "Pune, Maharashtra",
    "description": "A leading sports academy in Pune, Maharashtra focusing on youth development.",
    "founded": 2017,
    "type": "Academy",
    "sports": [
      "Football",
      "Swimming",
      "Athletics"
    ],
    "website": "https://www.punesportsacademy7.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Pune+Sports+Academy+7",
    "contact": {
      "number": "+91 7480521633",
      "email": "info@punesportsacademy7.com",
      "social_media": {
        "facebook": "https://facebook.com/punesportsacademy7",
        "instagram": "https://instagram.com/punesportsacademy7",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Pune Sports Academy 8",
    "location": "Pune, Maharashtra",
    "description": "A leading sports academy in Pune, Maharashtra focusing on youth development.",
    "founded": 2011,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Athletics",
      "Basketball",
      "Table Tennis"
    ],
    "website": "https://www.punesportsacademy8.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Pune+Sports+Academy+8",
    "contact": {
      "number": "+91 7990520626",
      "email": "info@punesportsacademy8.com",
      "social_media": {
        "facebook": "https://facebook.com/punesportsacademy8",
        "instagram": "https://instagram.com/punesportsacademy8",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Pune Sports Academy 9",
    "location": "Pune, Maharashtra",
    "description": "A leading sports academy in Pune, Maharashtra focusing on youth development.",
    "founded": 2003,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Badminton",
      "Swimming"
    ],
    "website": "https://www.punesportsacademy9.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Pune+Sports+Academy+9",
    "contact": {
      "number": "+91 7991963242",
      "email": "info@punesportsacademy9.com",
      "social_media": {
        "facebook": "https://facebook.com/punesportsacademy9",
        "instagram": "https://instagram.com/punesportsacademy9",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Pune Sports Academy 10",
    "location": "Pune, Maharashtra",
    "description": "A leading sports academy in Pune, Maharashtra focusing on youth development.",
    "founded": 2009,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Badminton",
      "Basketball",
      "Squash"
    ],
    "website": "https://www.punesportsacademy10.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Pune+Sports+Academy+10",
    "contact": {
      "number": "+91 8016489360",
      "email": "info@punesportsacademy10.com",
      "social_media": {
        "facebook": "https://facebook.com/punesportsacademy10",
        "instagram": "https://instagram.com/punesportsacademy10",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Pune Sports Academy 11",
    "location": "Pune, Maharashtra",
    "description": "A leading sports academy in Pune, Maharashtra focusing on youth development.",
    "founded": 2006,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Badminton",
      "Swimming"
    ],
    "website": "https://www.punesportsacademy11.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Pune+Sports+Academy+11",
    "contact": {
      "number": "+91 7954546401",
      "email": "info@punesportsacademy11.com",
      "social_media": {
        "facebook": "https://facebook.com/punesportsacademy11",
        "instagram": "https://instagram.com/punesportsacademy11",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Pune Sports Academy 12",
    "location": "Pune, Maharashtra",
    "description": "A leading sports academy in Pune, Maharashtra focusing on youth development.",
    "founded": 2017,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Badminton",
      "Swimming"
    ],
    "website": "https://www.punesportsacademy12.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Pune+Sports+Academy+12",
    "contact": {
      "number": "+91 7167664673",
      "email": "info@punesportsacademy12.com",
      "social_media": {
        "facebook": "https://facebook.com/punesportsacademy12",
        "instagram": "https://instagram.com/punesportsacademy12",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Pune Sports Academy 13",
    "location": "Pune, Maharashtra",
    "description": "A leading sports academy in Pune, Maharashtra focusing on youth development.",
    "founded": 2009,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Badminton",
      "Athletics"
    ],
    "website": "https://www.punesportsacademy13.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Pune+Sports+Academy+13",
    "contact": {
      "number": "+91 9794026362",
      "email": "info@punesportsacademy13.com",
      "social_media": {
        "facebook": "https://facebook.com/punesportsacademy13",
        "instagram": "https://instagram.com/punesportsacademy13",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Pune Sports Academy 14",
    "location": "Pune, Maharashtra",
    "description": "A leading sports academy in Pune, Maharashtra focusing on youth development.",
    "founded": 1999,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Swimming"
    ],
    "website": "https://www.punesportsacademy14.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Pune+Sports+Academy+14",
    "contact": {
      "number": "+91 7575306915",
      "email": "info@punesportsacademy14.com",
      "social_media": {
        "facebook": "https://facebook.com/punesportsacademy14",
        "instagram": "https://instagram.com/punesportsacademy14",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Pune Sports Academy 15",
    "location": "Pune, Maharashtra",
    "description": "A leading sports academy in Pune, Maharashtra focusing on youth development.",
    "founded": 2011,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Basketball",
      "Squash"
    ],
    "website": "https://www.punesportsacademy15.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Pune+Sports+Academy+15",
    "contact": {
      "number": "+91 9329712615",
      "email": "info@punesportsacademy15.com",
      "social_media": {
        "facebook": "https://facebook.com/punesportsacademy15",
        "instagram": "https://instagram.com/punesportsacademy15",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Pune Sports Academy 16",
    "location": "Pune, Maharashtra",
    "description": "A leading sports academy in Pune, Maharashtra focusing on youth development.",
    "founded": 2008,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Badminton",
      "Swimming"
    ],
    "website": "https://www.punesportsacademy16.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Pune+Sports+Academy+16",
    "contact": {
      "number": "+91 8023151740",
      "email": "info@punesportsacademy16.com",
      "social_media": {
        "facebook": "https://facebook.com/punesportsacademy16",
        "instagram": "https://instagram.com/punesportsacademy16",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Pune Sports Academy 17",
    "location": "Pune, Maharashtra",
    "description": "A leading sports academy in Pune, Maharashtra focusing on youth development.",
    "founded": 2012,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Badminton",
      "Swimming"
    ],
    "website": "https://www.punesportsacademy17.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Pune+Sports+Academy+17",
    "contact": {
      "number": "+91 9360341763",
      "email": "info@punesportsacademy17.com",
      "social_media": {
        "facebook": "https://facebook.com/punesportsacademy17",
        "instagram": "https://instagram.com/punesportsacademy17",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Pune Sports Academy 18",
    "location": "Pune, Maharashtra",
    "description": "A leading sports academy in Pune, Maharashtra focusing on youth development.",
    "founded": 2017,
    "type": "Academy",
    "sports": [
      "Football",
      "Swimming",
      "Athletics"
    ],
    "website": "https://www.punesportsacademy18.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Pune+Sports+Academy+18",
    "contact": {
      "number": "+91 7480521633",
      "email": "info@punesportsacademy18.com",
      "social_media": {
        "facebook": "https://facebook.com/punesportsacademy18",
        "instagram": "https://instagram.com/punesportsacademy18",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Pune Sports Academy 19",
    "location": "Pune, Maharashtra",
    "description": "A leading sports academy in Pune, Maharashtra focusing on youth development.",
    "founded": 2011,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Athletics",
      "Basketball",
      "Table Tennis"
    ],
    "website": "https://www.punesportsacademy19.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Pune+Sports+Academy+19",
    "contact": {
      "number": "+91 7990520626",
      "email": "info@punesportsacademy19.com",
      "social_media": {
        "facebook": "https://facebook.com/punesportsacademy19",
        "instagram": "https://instagram.com/punesportsacademy19",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Pune Sports Academy 20",
    "location": "Pune, Maharashtra",
    "description": "A leading sports academy in Pune, Maharashtra focusing on youth development.",
    "founded": 2003,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Badminton",
      "Swimming"
    ],
    "website": "https://www.punesportsacademy20.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Pune+Sports+Academy+20",
    "contact": {
      "number": "+91 7991963242",
      "email": "info@punesportsacademy20.com",
      "social_media": {
        "facebook": "https://facebook.com/punesportsacademy20",
        "instagram": "https://instagram.com/punesportsacademy20",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Pune Sports Academy 21",
    "location": "Pune, Maharashtra",
    "description": "A leading sports academy in Pune, Maharashtra focusing on youth development.",
    "founded": 2009,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Badminton",
      "Basketball",
      "Squash"
    ],
    "website": "https://www.punesportsacademy21.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Pune+Sports+Academy+21",
    "contact": {
      "number": "+91 8016489360",
      "email": "info@punesportsacademy21.com",
      "social_media": {
        "facebook": "https://facebook.com/punesportsacademy21",
        "instagram": "https://instagram.com/punesportsacademy21",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Pune Sports Academy 22",
    "location": "Pune, Maharashtra",
    "description": "A leading sports academy in Pune, Maharashtra focusing on youth development.",
    "founded": 2006,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Badminton",
      "Swimming"
    ],
    "website": "https://www.punesportsacademy22.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Pune+Sports+Academy+22",
    "contact": {
      "number": "+91 7954546401",
      "email": "info@punesportsacademy22.com",
      "social_media": {
        "facebook": "https://facebook.com/punesportsacademy22",
        "instagram": "https://instagram.com/punesportsacademy22",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Pune Sports Academy 23",
    "location": "Pune, Maharashtra",
    "description": "A leading sports academy in Pune, Maharashtra focusing on youth development.",
    "founded": 2017,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Badminton",
      "Swimming"
    ],
    "website": "https://www.punesportsacademy23.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Pune+Sports+Academy+23",
    "contact": {
      "number": "+91 7167664673",
      "email": "info@punesportsacademy23.com",
      "social_media": {
        "facebook": "https://facebook.com/punesportsacademy23",
        "instagram": "https://instagram.com/punesportsacademy23",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Pune Sports Academy 24",
    "location": "Pune, Maharashtra",
    "description": "A leading sports academy in Pune, Maharashtra focusing on youth development.",
    "founded": 2009,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Badminton",
      "Athletics"
    ],
    "website": "https://www.punesportsacademy24.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Pune+Sports+Academy+24",
    "contact": {
      "number": "+91 9794026362",
      "email": "info@punesportsacademy24.com",
      "social_media": {
        "facebook": "https://facebook.com/punesportsacademy24",
        "instagram": "https://instagram.com/punesportsacademy24",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Pune Sports Academy 25",
    "location": "Pune, Maharashtra",
    "description": "A leading sports academy in Pune, Maharashtra focusing on youth development.",
    "founded": 1999,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Swimming"
    ],
    "website": "https://www.punesportsacademy25.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Pune+Sports+Academy+25",
    "contact": {
      "number": "+91 7575306915",
      "email": "info@punesportsacademy25.com",
      "social_media": {
        "facebook": "https://facebook.com/punesportsacademy25",
        "instagram": "https://instagram.com/punesportsacademy25",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Pune Sports Academy 26",
    "location": "Pune, Maharashtra",
    "description": "A leading sports academy in Pune, Maharashtra focusing on youth development.",
    "founded": 2011,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Basketball",
      "Squash"
    ],
    "website": "https://www.punesportsacademy26.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Pune+Sports+Academy+26",
    "contact": {
      "number": "+91 9329712615",
      "email": "info@punesportsacademy26.com",
      "social_media": {
        "facebook": "https://facebook.com/punesportsacademy26",
        "instagram": "https://instagram.com/punesportsacademy26",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Pune Sports Academy 27",
    "location": "Pune, Maharashtra",
    "description": "A leading sports academy in Pune, Maharashtra focusing on youth development.",
    "founded": 2008,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Badminton",
      "Swimming"
    ],
    "website": "https://www.punesportsacademy27.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Pune+Sports+Academy+27",
    "contact": {
      "number": "+91 8023151740",
      "email": "info@punesportsacademy27.com",
      "social_media": {
        "facebook": "https://facebook.com/punesportsacademy27",
        "instagram": "https://instagram.com/punesportsacademy27",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Pune Sports Academy 28",
    "location": "Pune, Maharashtra",
    "description": "A leading sports academy in Pune, Maharashtra focusing on youth development.",
    "founded": 2012,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Badminton",
      "Swimming"
    ],
    "website": "https://www.punesportsacademy28.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Pune+Sports+Academy+28",
    "contact": {
      "number": "+91 9360341763",
      "email": "info@punesportsacademy28.com",
      "social_media": {
        "facebook": "https://facebook.com/punesportsacademy28",
        "instagram": "https://instagram.com/punesportsacademy28",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Pune Sports Academy 29",
    "location": "Pune, Maharashtra",
    "description": "A leading sports academy in Pune, Maharashtra focusing on youth development.",
    "founded": 2017,
    "type": "Academy",
    "sports": [
      "Football",
      "Swimming",
      "Athletics"
    ],
    "website": "https://www.punesportsacademy29.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Pune+Sports+Academy+29",
    "contact": {
      "number": "+91 7480521633",
      "email": "info@punesportsacademy29.com",
      "social_media": {
        "facebook": "https://facebook.com/punesportsacademy29",
        "instagram": "https://instagram.com/punesportsacademy29",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Pune Sports Academy 30",
    "location": "Pune, Maharashtra",
    "description": "A leading sports academy in Pune, Maharashtra focusing on youth development.",
    "founded": 2011,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Athletics",
      "Basketball",
      "Table Tennis"
    ],
    "website": "https://www.punesportsacademy30.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Pune+Sports+Academy+30",
    "contact": {
      "number": "+91 7990520626",
      "email": "info@punesportsacademy30.com",
      "social_media": {
        "facebook": "https://facebook.com/punesportsacademy30",
        "instagram": "https://instagram.com/punesportsacademy30",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Pune Sports Complex 1",
    "location": "Pune, Maharashtra",
    "description": "A popular multi-sport complex in Pune, Maharashtra with various facilities.",
    "founded": 2006,
    "type": "Public",
    "sports": [
      "Swimming",
      "Basketball"
    ],
    "website": "https://www.punesportscomplex1.com",
    "logo": "https://placehold.co/100x100/ADD8E6/000000?text=Pune+Sports+Complex+1",
    "contact": {
      "number": "+91 7378377017",
      "email": "contact@punesportscomplex1.com",
      "social_media": {}
    }
  },
  {
    "name": "Pune Sports Complex 2",
    "location": "Pune, Maharashtra",
    "description": "A popular multi-sport complex in Pune, Maharashtra with various facilities.",
    "founded": 2005,
    "type": "Public",
    "sports": [
      "Basketball",
      "Volleyball",
      "Yoga"
    ],
    "website": "https://www.punesportscomplex2.com",
    "logo": "https://placehold.co/100x100/ADD8E6/000000?text=Pune+Sports+Complex+2",
    "contact": {
      "number": "+91 8593412701",
      "email": "contact@punesportscomplex2.com",
      "social_media": {}
    }
  },
  {
    "name": "Pune Sports Complex 3",
    "location": "Pune, Maharashtra",
    "description": "A popular multi-sport complex in Pune, Maharashtra with various facilities.",
    "founded": 2007,
    "type": "Public",
    "sports": [
      "Swimming",
      "Gymnastics",
      "Zumba"
    ],
    "website": "https://www.punesportscomplex3.com",
    "logo": "https://placehold.co/100x100/ADD8E6/000000?text=Pune+Sports+Complex+3",
    "contact": {
      "number": "+91 9170068469",
      "email": "contact@punesportscomplex3.com",
      "social_media": {}
    }
  },
  {
    "name": "Pune Sports Complex 4",
    "location": "Pune, Maharashtra",
    "description": "A popular multi-sport complex in Pune, Maharashtra with various facilities.",
    "founded": 2009,
    "type": "Public",
    "sports": [
      "Swimming",
      "Gymnastics",
      "Basketball"
    ],
    "website": "https://www.punesportscomplex4.com",
    "logo": "https://placehold.co/100x100/ADD8E6/000000?text=Pune+Sports+Complex+4",
    "contact": {
      "number": "+91 8459438902",
      "email": "contact@punesportscomplex4.com",
      "social_media": {}
    }
  },
  {
    "name": "Pune Sports Complex 5",
    "location": "Pune, Maharashtra",
    "description": "A popular multi-sport complex in Pune, Maharashtra with various facilities.",
    "founded": 2011,
    "type": "Public",
    "sports": [
      "Swimming",
      "Basketball",
      "Volleyball"
    ],
    "website": "https://www.punesportscomplex5.com",
    "logo": "https://placehold.co/100x100/ADD8E6/000000?text=Pune+Sports+Complex+5",
    "contact": {
      "number": "+91 7624022409",
      "email": "contact@punesportscomplex5.com",
      "social_media": {}
    }
  },
  {
    "name": "Nagpur Sports Academy 1",
    "location": "Nagpur, Maharashtra",
    "description": "A leading sports academy in Nagpur, Maharashtra focusing on youth development.",
    "founded": 2009,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Badminton",
      "Swimming"
    ],
    "website": "https://www.nagpursportsacademy1.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Nagpur+Sports+Academy+1",
    "contact": {
      "number": "+91 9928507204",
      "email": "info@nagpursportsacademy1.com",
      "social_media": {
        "facebook": "https://facebook.com/nagpursportsacademy1",
        "instagram": "https://instagram.com/nagpursportsacademy1",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Nagpur Sports Academy 2",
    "location": "Nagpur, Maharashtra",
    "description": "A leading sports academy in Nagpur, Maharashtra focusing on youth development.",
    "founded": 1993,
    "type": "Academy",
    "sports": [
      "Football",
      "Badminton",
      "Basketball"
    ],
    "website": "https://www.nagpursportsacademy2.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Nagpur+Sports+Academy+2",
    "contact": {
      "number": "+91 9662887610",
      "email": "info@nagpursportsacademy2.com",
      "social_media": {
        "facebook": "https://facebook.com/nagpursportsacademy2",
        "instagram": "https://instagram.com/nagpursportsacademy2",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Nagpur Sports Academy 3",
    "location": "Nagpur, Maharashtra",
    "description": "A leading sports academy in Nagpur, Maharashtra focusing on youth development.",
    "founded": 2005,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Badminton",
      "Swimming"
    ],
    "website": "https://www.nagpursportsacademy3.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Nagpur+Sports+Academy+3",
    "contact": {
      "number": "+91 7606775585",
      "email": "info@nagpursportsacademy3.com",
      "social_media": {
        "facebook": "https://facebook.com/nagpursportsacademy3",
        "instagram": "https://instagram.com/nagpursportsacademy3",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Nagpur Sports Academy 4",
    "location": "Nagpur, Maharashtra",
    "description": "A leading sports academy in Nagpur, Maharashtra focusing on youth development.",
    "founded": 2012,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Badminton",
      "Swimming",
      "Basketball"
    ],
    "website": "https://www.nagpursportsacademy4.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Nagpur+Sports+Academy+4",
    "contact": {
      "number": "+91 9369904977",
      "email": "info@nagpursportsacademy4.com",
      "social_media": {
        "facebook": "https://facebook.com/nagpursportsacademy4",
        "instagram": "https://instagram.com/nagpursportsacademy4",
        "linkedin": "",
        "youtube": ""
      }
    }
  },
  {
    "name": "Nagpur Sports Academy 5",
    "location": "Nagpur, Maharashtra",
    "description": "A leading sports academy in Nagpur, Maharashtra focusing on youth development.",
    "founded": 2015,
    "type": "Academy",
    "sports": [
      "Cricket",
      "Football",
      "Badminton"
    ],
    "website": "https://www.nagpursportsacademy5.com",
    "logo": "https://placehold.co/100x100/000000/FFFFFF?text=Nagpur+Sports+Academy+5",
    "contact": {
      "number": "+91 9823456789",
      "email": "info@nagpursportsacademy5.com",
      "social_media": {
        "facebook": "https://facebook.com/nagpursportsacademy5",
        "instagram": "https://instagram.com/nagpursportsacademy5",
        "linkedin": "",
        "youtube": ""
      }
    }
  }
]

// 📌 Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected for match seeding"))
.catch(err => { console.error("❌ DB connection error:", err); process.exit(1); });

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    await OtherClub.insertMany(sampleClubs);

    console.log('✅ Database seeded with OtherClub data.');
    process.exit();
  } catch (err) {
    console.error('❌ Error seeding database:', err);
    process.exit(1);
  }
};

seedDB();
