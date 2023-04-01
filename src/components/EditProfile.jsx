import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../styles/EditProfile.css";

function EditProfile() {
  const [name, setName] = useState(localStorage.getItem("name"));
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [photoUrl, setPhotoUrl] = useState(
    localStorage.getItem("photoUrl") || ""
  );
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("photoUrl", photoUrl);
    history.push("/profile");
  };

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-header">
        <h1 className="edit-profile-title">Edit Profile</h1>
      </div>
      <div className="edit-profile-body">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="photoUrl">Profile Photo URL:</label>
          <input
            type="text"
            id="photoUrl"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
