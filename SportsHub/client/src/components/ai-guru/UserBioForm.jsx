import React from 'react';

function UserBioForm({
  userName, setUserName, userAge, setUserAge, userSex, setUserSex,
  userHeight, setUserHeight, userWeight, setWeight, preferredSport, setPreferredSport,
  userLanguage, setUserLanguage, otherBioDetails, setOtherBioDetails
}) {
  return (
    <div className="bio-section">
      <h3 className="text-xl font-semibold mb-4 text-orange-400">Your Details (for personalized coaching)</h3>
      <div className="input-group">
        <label htmlFor="userName">Name:</label>
        <input type="text" id="userName" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Your Name" />
      </div>
      <div className="input-group">
        <label htmlFor="userAge">Age:</label>
        <input type="number" id="userAge" value={userAge} onChange={(e) => setUserAge(e.target.value)} placeholder="Your Age" />
      </div>
      <div className="input-group">
        <label htmlFor="userSex">Sex:</label>
        <select id="userSex" value={userSex} onChange={(e) => setUserSex(e.target.value)}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="input-group">
        <label htmlFor="userHeight">Height (cm):</label>
        <input type="number" id="userHeight" value={userHeight} onChange={(e) => setUserHeight(e.target.value)} placeholder="e.g., 175" />
      </div>
      <div className="input-group">
        <label htmlFor="userWeight">Weight (kg):</label>
        <input type="number" id="userWeight" value={userWeight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g., 70" />
      </div>
      <div className="input-group">
        <label htmlFor="preferredSport">Preferred Sport:</label>
        <input type="text" id="preferredSport" value={preferredSport} onChange={(e) => setPreferredSport(e.target.value)} placeholder="e.g., Cricket, Football" />
      </div>
      <div className="input-group">
        <label htmlFor="userLanguage">Preferred Language for AI Guru:</label>
        <select id="userLanguage" value={userLanguage} onChange={(e) => setUserLanguage(e.target.value)}>
          <option value="en-IN">English (India)</option>
          <option value="hi-IN">Hindi</option>
          <option value="ta-IN">Tamil</option>
          <option value="te-IN">Telugu</option>
          <option value="kn-IN">Kannada</option>
          <option value="ml-IN">Malayalam</option>
          <option value="bn-IN">Bengali</option>
          <option value="mr-IN">Marathi</option>
          <option value="gu-IN">Gujarati</option>
          <option value="en-US">English (US)</option>
        </select>
      </div>
      <div className="input-group">
        <label htmlFor="otherBioDetails">Other Relevant Details:</label>
        <textarea id="otherBioDetails" rows="2" value={otherBioDetails} onChange={(e) => setOtherBioDetails(e.target.value)} placeholder="Any other info that helps AI Guru understand you better." />
      </div>
    </div>
  );
}

export default UserBioForm;