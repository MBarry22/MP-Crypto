import React, { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import "../styles/Profile.css";

function Profile() {
  const [feedback, setFeedback] = useState("");
  const history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    history.push("/");
  };

  const handleEditProfile = () => {
    history.push("/edit-profile");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User feedback:", feedback);
    // You can send the feedback to a backend server for storage and analysis
    alert("Thank you for your feedback!");
    setFeedback("");
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
      </div>
      <div className="profile-body">
        <img
          className="profile-image"
          src={localStorage.getItem("photoUrl")}
          alt="profile"
        />
        <div className="profile-details">

          <h2 className="profile-name">{localStorage.getItem("name")}</h2>
          <p className="profile-email">{localStorage.getItem("email")}</p>
          <div className="social-media-links">
            <a href="https://www.facebook.com/"><FaFacebook /></a>
            <a href="https://twitter.com/"><FaTwitter /></a>
            <a href="https://www.instagram.com/"><FaInstagram /></a>
          </div>
          <button onClick={handleEditProfile}>Edit Profile</button>
          <button onClick={handleLogout}>Log Out</button>
          <div className="feedback-form">
            <h3>Feedback</h3>
            <form onSubmit={handleSubmit}>
              <textarea
                value={feedback}
                onChange={handleFeedbackChange}
                placeholder="Enter your feedback here..."
              />
              <button type="submit">Submit Feedback</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
