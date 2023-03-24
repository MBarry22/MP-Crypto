import React from "react";
import "../styles/Profile.css";

function Profile() {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1 className="profile-title">Profile</h1>
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
        </div>
      </div>
    </div>
  );
}

export default Profile;
